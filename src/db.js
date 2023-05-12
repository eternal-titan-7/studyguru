import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWkzAhkRe5NtVbXHbaQTO5u1-5zPWKDRo",
  authDomain: "studyguru-7.firebaseapp.com",
  projectId: "studyguru-7",
  storageBucket: "studyguru-7.appspot.com",
  messagingSenderId: "607540387981",
  appId: "1:607540387981:web:821e5064b39907b03a42c4",
  host: "localhost",
  port: 8080,
  ssl: false,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

const storage = getStorage(app);
// if (window.location.hostname === "localhost") {
//   connectStorageEmulator(storage, "localhost", 9199);
// }

export default db;
