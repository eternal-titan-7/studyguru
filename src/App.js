import { useEffect, useState } from "react";
import LoginPage from "./components/auth";
import {
  connectAuthEmulator,
  getAuth,
  // connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import Loader from "./components/loader";
import HomePage from "./components/home";
function App() {
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
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
        setLoading(true);
        setPage("home");
        setUid(user.uid);
      } else {
        // setPage("auth");
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {page === "home" && <HomePage uid={uid} setPage={setPage} setLoading={setLoading} />}
      {page === "auth" && <LoginPage loader={setLoading} setPage={setPage} />}
      {loading && <Loader />}
    </>
  );
}

export default App;
