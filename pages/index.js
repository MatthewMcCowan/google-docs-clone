import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

// Modal Step 1: Piece of state of modal open or closed
//Modal Step 2: Another piece of state for the input inside the modal
//Modal Step 3: Create the function for modal when pressing enter

export default function Home() {
  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  if (!session) return <Login />;
  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = () => {
    //No input close out
    if (!input) return;

    //now import db and firebase to access firebase database and modify it
    //creates a new database called userDocs
    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //Close Modal and Empty Modal Value
    setInput("");
    setShowModal(false);
  };

  //Modal Step 4: Create JSX here or in another file for modal
  const modal = (
    // create the parent modal
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      {/* Inside Modal create the modal body and the footer */}
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none w-full"
          placeholder="Enter name of document"
          type="text"
          onKeyDown={(e) => e.key === "Enter" && createDocument}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
      </Head>
      <Header />
      {modal}
      <main className="bg-[#f8f9fa] ">
        <section className="max-w-3xl mx-auto pb-10">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-lg text-gray-700">Start a new Document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div className="">
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 "
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </section>
        <section className="bg-white px-10 md:px-0">
          <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
            <div className="flex items-center justify-between pb-5">
              <h2 className="font-medium flex-grow">My Documents</h2>
              <p className="mr-12">Date Created </p>
              <Icon name="folder" size="3xl" color="gray" />
            </div>
            {snapshot?.docs.map((doc) => (
              <DocumentRow
                key={doc.id}
                id={doc.id}
                fileName={doc.data().fileName}
                date={doc.data().timestamp}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
