import "./auth.css";
import { useState } from "react";
import db from "../db";
import { doc, setDoc } from "firebase/firestore";
import profpic from "./profile.jpg";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SVGS from "./svgs";

function LoginPage({ loader, setPage }) {
  const auth = getAuth();
  const [authMode, setAuthMode] = useState("Login");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signIn, signUp, resetPass] = [
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
  ];
  const [pic, setPic] = useState("");

  function modeChange() {
    setAuthMode(authMode === "Login" ? "Sign Up" : "Login");
  }

  function picChange(e) {
    e.preventDefault();
    if (!e.target.files[0]) {
      setPic();
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      const elem = document.createElement("canvas");
      const dim = 100;
      elem.width = dim;
      elem.height = dim;
      const ctx = elem.getContext("2d");
      ctx.drawImage(img, 0, 0, dim, dim);
      ctx.canvas.toBlob(
        (blob) => {
          const file = new File([blob], "image", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPic(reader.result);
          };
        },
        "image/jpeg",
        1
      );
    };
  }

  async function forgotPass(e) {
    loader(true);
    resetPass(auth, email)
      .then(() => {
        loader(false);
        alert("Password reset email sent!");
        setAuthMode("Login");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        loader(false);
        alert(errorMessage);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    loader(true);
    if (authMode === "Login") {
      signIn(auth, email, pass)
        .then((userCredential) => {
          loader(false);
          // alert("Login");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          loader(false);
          alert(errorMessage);
        });
    } else if (authMode === "Sign Up") {
      if ((name.length > 0) & (role.length > 0)) {
        signUp(auth, email, pass)
          .then(async (userCredential) => {
            // const user = userCredential.user;
            await setDoc(doc(db, "users", userCredential.user.uid), {
              dp: pic,
              name: name,
              role: role,
              email: email,
            });
            loader(false);
            // alert("Sign Up");
            modeChange("Login");
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            loader(false);
            alert(errorMessage);
          });
      } else {
        loader(false);
        alert("Please fill necessary fields");
      }
    }
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleRole(e) {
    setRole(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePass(e) {
    setPass(e.target.value);
  }

  return (
    <div className="body-bg">
      <div className="container">
        <div className="header">
          <SVGS svgName="logo" Class="app-icon"></SVGS>
          <h1>StudyGuru</h1>
        </div>
        <p id="heading">{authMode}</p>
        <form onSubmit={handleSubmit}>
          {authMode === "Sign Up" && (
            <>
              <div className="upload-pic">
                <label htmlFor="photo-upload" className="custom-file-upload">
                  <div className="img-wrap img-upload">
                    <img
                      htmlFor="photo-upload"
                      alt="Profile Pic"
                      src={pic ? pic : profpic}
                    />
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={picChange}
                  />
                </label>
              </div>
              <div className="field">
                <SVGS svgName="name" Class="name-icon"></SVGS>
                <input
                  autoComplete="off"
                  placeholder="Full Name"
                  className="input-field"
                  type="text"
                  value={name}
                  onChange={handleName}
                  maxLength={50}
                  required
                />
              </div>
              <div className="radio-field">
                <div className="radio-wrapper">
                  <input
                    className="radio-state"
                    type="radio"
                    id="student"
                    name="role"
                    value="Student"
                    onChange={handleRole}
                  ></input>
                  <label className="radio-label" htmlFor="student">
                    <div className="indicator" id="checked"></div>
                    Student
                  </label>
                </div>
                <div className="radio-wrapper">
                  <input
                    className="radio-state"
                    type="radio"
                    id="teacher"
                    name="role"
                    value="Teacher"
                    onChange={handleRole}
                    required
                  ></input>
                  <label className="radio-label" htmlFor="teacher">
                    <div className="indicator" id="checked"></div>
                    Teacher
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
                fill="#000000"
              ></path>
            </svg>
            <input
              autoComplete="off"
              placeholder="Email"
              className="input-field"
              type="text"
              value={email}
              onChange={handleEmail}
              maxLength={70}
              required
            />
          </div>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                fill="#000000"
              ></path>
            </svg>
            <input
              placeholder="Password"
              className="input-field"
              type="password"
              value={pass}
              onChange={handlePass}
              required
            />
          </div>
          <div className="btn">
            <button className="button" type="submit">
              {authMode}
            </button>
            <button className="button" onClick={modeChange} type="button">
              {authMode === "Login" ? "Sign Up" : "Login"}
            </button>
          </div>
          <div className="btn">
            <button className="button1" onClick={forgotPass} type="button">
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
