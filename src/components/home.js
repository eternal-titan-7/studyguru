import React, { useCallback, useEffect, useRef, useState } from "react";
import "./home.css";
import welcome from "./welcome.png";
import SVGS from "./svgs";
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
import AllCourses from "./allCourses";
import Requests from "./requests";

function HomePage({ uid, setPage, setLoading }) {
  const auth = getAuth();
  const [userData, setUserData] = useState({
    courses: [],
    dp: "",
    email: "",
    name: "",
    role: "",
  });
  const [grades, setGrades] = useState();
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("home");
  const [content, setContent] = useState("home");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseCard, setCourseCard] = useState([]);
  const [course, setCourse] = useState("");
  const [charCount, setCharCount] = useState("");
  const [requests, setRequests] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef(null);

  function openSidebar() {
    setIsOpen(!isOpen);
  }

  function homeView() {
    setView("home");
    setContent("home");
  }

  const requestView = useCallback((courseCode, data) => {
    return () => {
      setCourseCode(courseCode);
      setRequests(data);
      setContent("requests");
    };
  }, []);

  const courseView = useCallback(async () => {
    if (!uid) {
      alert("You are not Signed In!");
      return;
    }
    setView("courses");
    setContent("courses");
    if (course.length > 0) {
      viewCourse(course)();
    } else {
      setLoading(true);
    }
  }, [course, setLoading, uid]);

  function assignView() {
    setView("assignments");
    setContent("assignments");
  }

  function chatView() {
    if (!uid) {
      alert("You are not Signed In!");
      return;
    }
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
  }, [setLoading]);

  const leaveCourse = useCallback((courseCode, suid) => {
    return async () => {
      setLoading(true);
      await updateDoc(doc(db, "users", suid), {
        courses: arrayRemove(courseCode),
      });
      await updateDoc(doc(db, "courses", courseCode), {
        students: arrayRemove(suid),
      });
      await courseView();
    };
  }, [courseView, setLoading]);

  const isJoined = (courseCode) => {
    return userData.courses.includes(courseCode);
  };

  async function handleJoinCourse(courseCode, suid = uid) {
    setLoading(true);
    if (courseCode.trim().length === 7) {
      await updateDoc(doc(db, "users", suid), {
        courses: arrayUnion(courseCode.trim()),
      });
      await updateDoc(doc(db, "courses", courseCode.trim()), {
        students: arrayUnion(suid),
      });
      await updateDoc(doc(db, "courses", courseCode.trim()), {
        joinRequests: arrayRemove(suid),
      });
      await courseView();
    } else {
      alert("Invalid Course Code!");
    }
  }

  async function joinRequest(courseCode) {
    setLoading(true);
    if (courseCode.trim().length === 7) {
      await updateDoc(doc(db, "courses", courseCode.trim()), {
        joinRequests: arrayUnion(uid),
      });
      alert("Requested to join course!");
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
      .then(() => {
        homeView();
      })
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
            {userData.name}
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
              By {data1.name}
            </p>
            <textarea
              disabled
              className="course-description"
              value={data.description}
            ></textarea>
            <div className="course-btns">
              {userData.role === "Teacher" ? (
                <><button
                  className="delete-btn"
                  onClick={deleteCourse(userData.courses[i])}
                >
                  <SVGS svgName="delete" Class="delete-icon"></SVGS>
                </button><button
                  className="course-btn"
                  title="Join Requests"
                  onClick={requestView(userData.courses[i], data)}
                >
                    <SVGS svgName="request" Class="open"></SVGS>
                  </button></>
              ) : <button
                className="delete-btn"
                onClick={leaveCourse(userData.courses[i], uid)}
              >
                <SVGS svgName="remove" Class="delete-icon"></SVGS>
              </button>}
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
  }, [userData, uid, deleteCourse, signout, content, setLoading, requestView, leaveCourse]);

  const authPage = useCallback(() => {
    setPage("auth");
  }, [setPage]);

  useEffect(() => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        setUserData(doc.data());
        setGrades(doc.data().grades);
        getData();
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
      setProfile(<button className="button" onClick={authPage}>login / sign up</button>);
    }
  }, [uid, getData, userData, authPage, setLoading]);

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
          <aside className="app-sidebar" style={{ left: window.innerWidth < 768 && !isOpen ? -300 : 0 }}>
            <div
              className={"app-sidebar-item " + (view === "home" && "active")}
              onClick={homeView}
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
            {course.length > 0 && (
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
                    Welcome! {uid ? userData.name : "Dear Unknown User"} :)
                  </span>
                </div>
                <AboutUs></AboutUs>
              </>
            )}
            {content === "courses" && (
              <>
                <div className="course-row">
                  <div onClick={addCourse}>
                    <SVGS svgName="add" Class="add-icon"></SVGS>
                  </div>
                  {courseCard}
                </div>
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
                <AllCourses joinRequest={joinRequest} joinCourse={handleJoinCourse} isJoined={isJoined}></AllCourses>
              ))}
            {content === "viewCourse" && (
              <CoursePage
                role={userData.role}
                courseCode={course}
                leaveCourse={leaveCourse}
                backFunc={back}
              ></CoursePage>
            )}
            {content === "requests" && <Requests courseCode={courseCode} courseData={requests} joinCourse={handleJoinCourse}></Requests>}
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
    </>
  );
}

export default HomePage;
