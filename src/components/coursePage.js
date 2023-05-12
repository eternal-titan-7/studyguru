import React, { useRef, useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "../db";
import SVGS from "./svgs";
import Loader from "./loader";

function CoursePage({ role, courseCode, backFunc }) {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState("");
  const [courseData, setCourseData] = useState("");
  const [teacherData, setTeacherData] = useState("");
  const [message, setMessage] = useState("");
  const textAreaRef = useRef(null);
  const [postCard, setPostCard] = useState("");
  const [content, setContent] = useState("Messages");
  const [studentCard, setStudentCard] = useState("");
  const [charCount, setCharCount] = useState("");

  const studentList = useCallback(() => {
    setLoading(true);
    setContent(content === "Students" ? "Messages" : "Students");
  }, [content]);

  const getData = useCallback(async () => {
    setHeader(
      <div className="course-header">
        <button className="backButton" onClick={backFunc}>
          <SVGS svgName="back" Class="backIcon"></SVGS>
        </button>
        <span className="courseTitle">{courseData.name}</span>
        <div className="profile">
          <img
            className="profile-icon"
            src={teacherData.dp}
            alt="Profile pic"
          />
          <div className="profile-detail">
            <span className="profile-name">
              {teacherData.fname} {teacherData.lname}
            </span>
            <span className="profile-email">{teacherData.email}</span>
          </div>
        </div>
        <div className="students" onClick={studentList}>
          <SVGS svgName="people" Class="people-icon"></SVGS>
          <span>{content === "Students" ? "Messages" : "Students"}</span>
        </div>
      </div>
    );
    if (courseData) {
      const postCard = courseData.posts.map((post) => (
        <div className="post-card" key={post.time}>
          <div className="post-message">{post.message}</div>
          <div className="post-footer">
            <span className="post-time">
              {post.time.toDate().toLocaleString("IN")}
            </span>
          </div>
        </div>
      ));
      setPostCard(postCard);
      if (content === "Students") {
        const studentData = [];
        for (const suid of courseData.students) {
          const docSnap = await getDoc(doc(db, "users", suid));
          const data = docSnap.data();
          studentData.push({
            uid: suid,
            dp: data.dp,
            name: data.fname + " " + data.lname,
            email: data.email,
          });
        }
        const studentCard = studentData.map((student) => (
          <div className="chat-card" key={student.uid}>
            <img className="chat-card-dp" src={student.dp} alt="Profile pic" />
            <div className="chat-card-details">
              <span className="chat-card-name">{student.name}</span>
              <span className="chat-card-email">{student.email}</span>
            </div>
          </div>
        ));
        setStudentCard(studentCard);
      }
    }
    setLoading(false);
  }, [courseData, teacherData, backFunc, content, studentList]);

  useEffect(() => {
    async function fetchData(courseCode) {
      const docRef = doc(db, "courses", courseCode);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const docRef1 = doc(db, "users", data.teacher);
        const docSnap1 = await getDoc(docRef1);
        const data1 = docSnap1.data();
        setCourseData(data);
        setTeacherData(data1);
        getData();
      }
    }
    fetchData(courseCode);
  }, [courseCode, getData]);

  function changePost(e) {
    e.preventDefault();
    setMessage(e.target.value);
    setCharCount(`${e.target.value.length}/${e.target.maxLength}`);
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  async function sendPost(e) {
    e.preventDefault();
    if (message.trim() !== "") {
      const post = {
        message: message.trim(),
        time: new Date(),
      };
      const docRef = doc(db, "courses", courseCode);
      await updateDoc(docRef, { posts: arrayUnion(post) });
      setMessage("");
    } else {
      alert("Text cannot be empty");
    }
  }

  return (
    <>
      <div className="course-page">
        {header}
        {role === "Teacher" && content === "Messages" && (
          <form className="post-form" onSubmit={sendPost}>
            <button className="postButton" type="submit">
              <SVGS svgName="send" Class="sendIcon"></SVGS>
            </button>
            <div style={{ display: "contents" }}>
              <textarea
                ref={textAreaRef}
                className="field2"
                maxLength="2000"
                placeholder="Enter your message here..."
                value={message}
                onChange={changePost}
              ></textarea>
              <label className="charCount">{charCount}</label>
            </div>
          </form>
        )}
        {content === "Messages" && <div className="messages">{postCard}</div>}
        {content === "Students" && (
          <div className="studentsList">{studentCard}</div>
        )}
      </div>
      {loading && <Loader></Loader>}
    </>
  );
}

export default CoursePage;
