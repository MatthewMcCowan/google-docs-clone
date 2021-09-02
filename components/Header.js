import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession, getSession } from "next-auth/client";

const Header = () => {
  const [session] = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center p-4 shadow-lg">
      <Button
        color="blue"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-2xl text-[color:var(--color-text)]">Docs</h1>
      <div className="flex flex-grow items-center bg-gray-100 px-5 py-2 mx-5 md:mx-20 text-gray-600 rounded-lg focus-within:shadow-md">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="search"
          className="outline-none px-5 text-base flex-grow bg-transparent"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="ml-5 h-20 w-20 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        onClick={signOut}
        loading="lazy"
        src={session?.user.image}
        alt=""
        className="h-12 w-12 rounded-full cursor-pointer "
      />
      {/* <div className="rounded-full border-2 border-gray-700 p-1 flex items-center hover:border-blue-500 hover:bg-blue-100 cursor-pointer hover:scale-105 ease-in-out duration-300 ">
        <div className="relative h-12 w-12 translate-x-1">
          <Image
            src="/../public/avatar.svg"
            layout="fill"
            objectFit="contain"
            className=""
          />
        </div>
      </div> */}
    </header>
  );
};

export default Header;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
