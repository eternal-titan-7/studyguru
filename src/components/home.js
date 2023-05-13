import React, { useCallback, useEffect, useRef, useState } from "react";
import "./home.css";
import welcome from "./welcome.png";
import SVGS from "./svgs";
import Loader from "./loader";
import db from "../db";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import CoursePage from "./coursePage";
import Chats from "./chats";
import Material from "./material";
import { getAuth, signOut } from "firebase/auth";
import Assign from "./assignment";
import Grades from "./Grades";
import AboutUs from "./AboutUs";

function HomePage({ uid }) {
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [userData, setUserData] = useState({
    courses: [],
    dp: "",
    email: "",
    fname: "",
    lname: "",
    role: "",
  });
  const [grades, setGrades] = useState();
  const [profile, setProfile] = useState("");
  const [view, setView] = useState("home");
  const [content, setContent] = useState("home");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseCard, setCourseCard] = useState([]);
  const [course, setCourse] = useState("");
  const [charCount, setCharCount] = useState("");
  const textAreaRef = useRef(null);
  const sidebarRef = useRef(null);

  function openSidebar() {
    const sidebar = sidebarRef.current;
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
    } else {
      sidebar.style.display = "none";
    }
  }

  function dashView() {
    setView("home");
    setContent("home");
  }

  async function courseView() {
    setView("courses");
    setContent("courses");
    if (course.length > 0) {
      viewCourse(course)();
    } else {
      setLoading(true);
    }
  }

  function assignView() {
    setView("assignments");
    setContent("assignments");
  }

  function chatView() {
    setView("chats");
    setContent("chats");
  }

  function resView() {
    setView("materials");
    setContent("materials");
  }

  function gradeView() {
    setView("grades");
    setContent("grades");
  }

  function addCourse() {
    generateCode();
    setContent("addCourse");
  }

  function handleCcode(e) {
    setCourseCode(e.target.value);
  }

  function handleCname(e) {
    setCourseName(e.target.value);
  }

  function handleCdesc(e) {
    setCourseDesc(e.target.value);
    setCharCount(`${e.target.value.length}/${e.target.maxLength}`);
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  async function back() {
    setCourse("");
    setContent("courses");
  }

  function generateCode() {
    var result = "";
    if (userData.role === "Teacher") {
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 7; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
    }
    setCourseCode(result);
  }

  function viewCourse(courseCode) {
    return () => {
      setCourse(courseCode);
      setContent("viewCourse");
    };
  }

  const deleteCourse = useCallback((courseCode) => {
    return async () => {
      setLoading(true);
      const docRef = doc(db, "courses", courseCode);
      await deleteDoc(docRef);
    };
  }, []);

  async function handleJoinCourse(e) {
    e.preventDefault();
    setLoading(true);
    if (courseCode.trim().length === 7) {
      await updateDoc(doc(db, "users", uid), {
        courses: arrayUnion(courseCode.trim()),
      });
      await updateDoc(doc(db, "courses", courseCode.trim()), {
        students: arrayUnion(uid),
      });
      await courseView();
    } else {
      alert("Invalid Course Code!");
    }
  }

  async function handleAddCourse(e) {
    e.preventDefault();
    setLoading(true);
    if (courseName.trim().length > 7 && courseDesc.trim().length > 7) {
      await setDoc(doc(db, "courses", courseCode), {
        name: courseName,
        teacher: uid,
        description: courseDesc,
        posts: [],
        materials: [],
      });
      await updateDoc(doc(db, "users", uid), {
        courses: arrayUnion(courseCode),
      });
      await courseView();
    } else {
      alert("Course name or description too short!");
    }
  }

  const signout = useCallback(async () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        alert(error);
      });
  }, [auth]);

  const getData = useCallback(async () => {
    setProfile(
      <div className="app-profile">
        <img className="profile-icon" src={userData.dp} alt="Profile pic" />
        <div className="profile-detail">
          <span className="profile-name">
            {userData.fname} {userData.lname}
          </span>
          <span className="profile-email">{userData.email}</span>
        </div>
        <button className="signout" onClick={signout}>
          <SVGS svgName="signout" Class="signout-icon"></SVGS>
        </button>
      </div>
    );
    if (!userData.courses || content !== "courses") {
      setLoading(false);
      return;
    }
    var card = [];
    for (var i = 0; i < userData.courses.length; i++) {
      const docRef = doc(db, "courses", userData.courses[i]);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const docRef1 = doc(db, "users", data.teacher);
        const docSnap1 = await getDoc(docRef1);
        const data1 = docSnap1.data();

        card.push(
          <article className="course-card" key={userData.courses[i]}>
            <h2 className="course-name">{data.name}</h2>
            <p className="course-code">Course Code: {userData.courses[i]}</p>
            <p className="course-teacher">
              By {data1.fname} {data1.lname}
            </p>
            <textarea
              disabled
              className="course-description"
              value={data.description}
            ></textarea>
            <div className="course-btns">
              {userData.role === "Teacher" && (
                <button
                  className="delete-btn"
                  onClick={deleteCourse(userData.courses[i])}
                >
                  <SVGS svgName="delete" Class="delete-icon"></SVGS>
                </button>
              )}
              <button
                className="course-btn"
                onClick={viewCourse(userData.courses[i])}
              >
                <span>View Course</span>
                <SVGS svgName="open" Class="open"></SVGS>
              </button>
            </div>
          </article>
        );
      } else {
        await updateDoc(doc(db, "users", uid), {
          courses: arrayRemove(userData.courses[i]),
        });
      }
    }
    setCourseCard(card);
    setLoading(false);
  }, [userData, uid, deleteCourse, signout, content]);

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setUserData(doc.data());
      setGrades(doc.data().grades);
      getData();
    });
    return () => unsubscribe();
  }, [uid, getData, userData]);

  return (
    <>
      <div className="app-container">
        <div className="app-header">
          <div className="app-header-logo">
            <SVGS svgName="logo" Class="app-icon"></SVGS>
            <p className="app-name">StudyGuru</p>
          </div>
          <button className="app-menu" onClick={openSidebar}>
            <SVGS svgName="menu" Class="menu-icon"></SVGS>
          </button>
          {window.innerWidth >= 768 && profile}
        </div>
        <div className="app-body">
          <aside className="app-sidebar" style={{ display: window.innerWidth < 768 ? "none" : "flex" }} ref={sidebarRef}>
            <div
              className={"app-sidebar-item " + (view === "home" && "active")}
              onClick={dashView}
            >
              <SVGS svgName="dashboard" Class="sidebar-icon"></SVGS>
              <span className="sidebar-text">Home</span>
            </div>
            <div
              className={"app-sidebar-item " + (view === "chats" && "active")}
              onClick={chatView}
            >
              <SVGS svgName="chats" Class="sidebar-icon"></SVGS>
              <span className="sidebar-text">Chats</span>
            </div>
            <div
              className={"app-sidebar-item " + (view === "courses" && "active")}
              onClick={courseView}
            >
              <SVGS svgName="courses" Class="sidebar-icon"></SVGS>
              <span className="sidebar-text">My Courses</span>
            </div>
            {["viewCourse", "grades", "assignments", "materials"].includes(
              content
            ) && (
                <>
                  {userData.role === "Student" && (
                    <div
                      className={
                        "app-sidebar-item " + (view === "grades" && "active")
                      }
                      onClick={gradeView}
                    >
                      <SVGS svgName="grades" Class="sidebar-icon"></SVGS>
                      <span className="sidebar-text">My Grades</span>
                    </div>
                  )}
                  <div
                    className={
                      "app-sidebar-item " + (view === "assignments" && "active")
                    }
                    onClick={assignView}
                  >
                    <SVGS svgName="homework" Class="sidebar-icon"></SVGS>
                    <span className="sidebar-text">Assignments/Tests</span>
                  </div>
                  <div
                    className={
                      "app-sidebar-item " + (view === "materials" && "active")
                    }
                    onClick={resView}
                  >
                    <SVGS svgName="materials" Class="sidebar-icon"></SVGS>
                    <span className="sidebar-text">Study Materials</span>
                  </div>
                </>
              )}
            {window.innerWidth < 768 && profile}
          </aside>
          <div className="app-content">
            {content === "home" && (
              <>
                <div className="glass-card" style={{ alignSelf: "center" }}>
                  <img src={welcome} alt="welcome" className="welcome-image" />
                  <span className="welcome-text">
                    Welcome! {userData.fname} {userData.lname} :)
                  </span>
                </div>
                <AboutUs></AboutUs>
              </>
            )}
            {content === "courses" && (
              <>
                <div onClick={addCourse}>
                  <SVGS svgName="add" Class="add-icon"></SVGS>
                </div>
                {courseCard}
              </>
            )}
            {content === "addCourse" &&
              (userData.role === "Teacher" ? (
                <form onSubmit={handleAddCourse} className="container1">
                  <p className="course-code">Course Code: {courseCode}</p>
                  <input
                    className="field3"
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={handleCname}
                  />
                  <div style={{ display: "contents" }}>
                    <textarea
                      maxLength={1000}
                      className="field3"
                      type="text"
                      placeholder="Course description maximum 200 characters"
                      value={courseDesc}
                      onChange={handleCdesc}
                      ref={textAreaRef}
                    ></textarea>
                    <label className="charCount">{charCount}</label>
                  </div>
                  <button className="button" type="submit">
                    Add Course
                  </button>
                </form>
              ) : (
                <form onSubmit={handleJoinCourse} className="container1">
                  <input
                    className="field3"
                    type="text"
                    placeholder="Course Code"
                    value={courseCode}
                    onChange={handleCcode}
                  />
                  <button className="button" type="submit">
                    Join Course
                  </button>
                </form>
              ))}
            {content === "viewCourse" && (
              <CoursePage
                role={userData.role}
                courseCode={course}
                backFunc={back}
              ></CoursePage>
            )}
            {content === "chats" && <Chats uid={uid}></Chats>}
            {content === "materials" && (
              <Material role={userData.role} courseCode={course}></Material>
            )}
            {content === "assignments" && (
              <Assign
                role={userData.role}
                uid={uid}
                courseCode={course}
              ></Assign>
            )}
            {content === "grades" && (
              <Grades grades={grades} courseCode={course}></Grades>
            )}
          </div>
        </div>
      </div>
      {loading && <Loader></Loader>}
    </>
  );
}

export default HomePage;
