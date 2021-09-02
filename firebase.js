import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCANbe5nIWd1wjyB7ELoAZqWEnNQp-qZkI",
  authDomain: "docs-clone-58ae7.firebaseapp.com",
  projectId: "docs-clone-58ae7",
  storageBucket: "docs-clone-58ae7.appspot.com",
  messagingSenderId: "782130761314",
  appId: "1:782130761314:web:3b9162f2a4294334658b3b",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export { db };
