import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/auth";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import Loader from "./components/loader";
import HomePage from "./components/home";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const auth = getAuth();
  if (window.location.hostname === "localhost") {
    try {
      connectAuthEmulator(auth, "http://127.0.0.1:9099", {
        disableWarnings: true,
      });
    } catch (error) {}
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUid(user.uid);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {loggedIn ? <HomePage uid={uid} /> : <LoginPage loader={setLoading} />}
      {loading && <Loader />}
    </>
  );
}

export default App;
