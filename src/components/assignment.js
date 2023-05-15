import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./loader";
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../db";
import "./assignment.css";
import SVGS from "./svgs";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";
import Progress from "./progress";

function Assignment({ role, uid, courseCode }) {
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState("");
  const [content, setContent] = useState("assignments");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [remark, setRemark] = useState("");
  const [grade, setGrade] = useState(0);
  const [maxGrade, setMaxGrade] = useState(100);
  const [uploading, setUploading] = useState(false);
  const [progressStatus, setProgressStatus] = useState([]);
  const [startDatetime, setStartDatetime] = useState("");
  const [dueDatetime, setDueDatetime] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  const [assignmentsCard, setAssignmentsCard] = useState("");
  const [submittedCard, setSubmittedCard] = useState([]);
  const [assignment, setAssignment] = useState("");
  const [Suid, setSuid] = useState("");
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const textAreaRef = useRef(null);
  const textAreaRef1 = useRef(null);
  const storage = getStorage(getApp());

  const downloadFile = useCallback(
    (fileName) => {
      return () => {
        const storageRef = ref(
          storage,
          `assignments/${courseCode}/${fileName}`
        );
        const downloadTask = getDownloadURL(storageRef);
        downloadTask.then((url) => {
          window.open(url, "_blank");
        });
      };
    },
    [courseCode, storage]
  );

  useEffect(() => {
    async function fetchData(courseCode) {
      const docSnap = await getDoc(doc(db, "courses", courseCode));
      const data = docSnap.data();
      setCourseName(data.name);
      if (data.assignments) {
        var card = [];
        for (const assignment of data.assignments) {
          const assignmentDocSnap = await getDoc(
            doc(db, "assignments", assignment)
          );
          const assignmentData = assignmentDocSnap.data();
          if (
            assignmentData &&
            (assignmentData.start.toDate() <= new Date() || role === "Teacher")
          ) {
            var submitted = (
              <div
                className="submit-button"
                onClick={handleAddFile1(assignment)}
              >
                <SVGS svgName="add" Class="add-icon1"></SVGS>
                <span>Submit Assignment</span>
                <input
                  type="file"
                  onChange={fileChange1}
                  ref={fileInputRef1}
                  style={{ display: "none" }}
                ></input>
              </div>
            );
            var Status = lateornot(assignmentData.due.toDate(), new Date());
            var submission = null;
            for (const sub of assignmentData.submitted) {
              if (sub.suid === uid) {
                submitted = (
                  <div className="green-button">&#9989; Submitted</div>
                );
                Status = lateornot(
                  assignmentData.due.toDate(),
                  sub.time.toDate()
                );
                submission = (
                  <div>
                    <span className="assignment-title">Submitted:</span>
                    <div
                      className="assignment-download"
                      onClick={downloadFile(sub.file)}
                    >
                      <SVGS svgName="download" Class="download-icon" />
                      <span>{sub.file}</span>
                    </div>
                  </div>
                );
              }
            }
            card.push(
              <article className="assignment-card" key={assignment}>
                <div className="assignment-header">
                  <div className="assignment-title">{assignmentData.title}</div>
                  {Status}
                  {role === "Teacher" && (
                    <button
                      className="delete-btn"
                      onClick={deleteAssignment(assignment)}
                    >
                      <SVGS svgName="delete" Class="delete-icon"></SVGS>
                    </button>
                  )}
                </div>
                <div className="assignment-caption">
                  {assignmentData.caption}
                </div>
                {assignmentData.file && (
                  <div
                    className="assignment-download"
                    onClick={downloadFile(assignmentData.file)}
                  >
                    <SVGS svgName="download" Class="download-icon" />
                    <span>{assignmentData.file}</span>
                  </div>
                )}
                {role === "Student" && submission}
                <div className="assignment-footer">
                  <span className="assignment-due">
                    Due: {assignmentData.due.toDate().toLocaleString("IN")}
                  </span>
                  {role === "Student" ? (
                    submitted
                  ) : (
                    <div
                      className="submissions-button"
                      onClick={listSubmissions(assignment)}
                    >
                      <SVGS svgName="people" Class="people-icon"></SVGS>
                      <span>Submissions</span>
                    </div>
                  )}
                </div>
              </article>
            );
          }
        }
        setAssignmentsCard(card);
      }
      setLoading(false);
    }
    if (content === "assignments") {
      fetchData(courseCode);
    }
  });

  useEffect(() => {
    async function fetchSubmitted() {
      const docSnap = await getDoc(doc(db, "assignments", assignment));
      const data = docSnap.data();
      if (data.submitted) {
        var card = [];
        for (const submission of data.submitted) {
          const studentDocSnap = await getDoc(
            doc(db, "users", submission.suid)
          );
          const studentData = studentDocSnap.data();
          var graded = (
            <div
              className="submit-button"
              onClick={awardGrades(submission.suid)}
            >
              <SVGS svgName="add" Class="add-icon1"></SVGS>
              <span>Award Grades</span>
            </div>
          );
          if (studentData.grades) {
            for (const grade of studentData.grades) {
              if (grade.assignment === assignment) {
                graded = (
                  <div className="green-button">
                    &#9989; Graded: {grade.grade}
                  </div>
                );
              }
            }
          }
          card.push(
            <article className="assignment-card" key={submission.suid}>
              <div className="submissions-header">
                <div className="profile">
                  <img
                    className="profile-icon"
                    src={studentData.dp}
                    alt="Profile pic"
                  />
                  <div className="profile-detail">
                    <span className="profile-name">
                      {studentData.name}
                    </span>
                    <span className="profile-email">{studentData.email}</span>
                  </div>
                </div>
                <div
                  className="assignment-download"
                  onClick={downloadFile(submission.file)}
                >
                  <SVGS svgName="download" Class="download-icon" />
                  <span>{submission.file}</span>
                </div>
              </div>
              <div className="submissions-footer">
                <div>
                  <span className="submission-time">
                    Submitted: {submission.time.toDate().toLocaleString("IN")}
                  </span>
                  {lateornot(data.due.toDate(), submission.time.toDate())}
                </div>
                {graded}
              </div>
            </article>
          );
        }
        setSubmittedCard(card);
      }
      setLoading(false);
    }
    if (content === "submissions") {
      fetchSubmitted();
    }
  });

  const lateornot = (due, time) => {
    if (due <= time) {
      return <span className="redLabel">Late</span>;
    } else {
      return <span className="greenLabel">Not Late</span>;
    }
  };

  const newAssignment = () => {
    setContent("new-assignment");
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (title.trim().length < 7) {
      alert("Title too short!");
    } else if (
      !dueDatetime ||
      Timestamp.fromDate(new Date(dueDatetime)) <=
      Timestamp.fromDate(new Date())
    ) {
      alert("Invalid Due date and time!");
    } else {
      if (selectedFile) {
        setUploading(true);
        const storageRef = ref(
          storage,
          `assignments/${courseCode}/${selectedFile.name}`
        );
        try {
          await getMetadata(storageRef);
          setContent("assignments");
          setUploading(false);
          setProgressStatus([]);
          setSelectedFile(null);
          setTitle("");
          setCaption("");
          setDueDatetime("");
          return;
        } catch (e) { }
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgressStatus([snapshot.bytesTransferred, snapshot.totalBytes]);
          },
          (error) => {
            console.log(error);
          },
          () => {
            const assignment = {
              title: title.trim(),
              caption: caption.trim(),
              start: new Date(startDatetime),
              due: new Date(dueDatetime),
              file: selectedFile.name,
              submitted: [],
            };
            addDoc(collection(db, "assignments"), assignment)
              .then((docRef) => {
                updateDoc(doc(db, "courses", courseCode), {
                  assignments: arrayUnion(docRef.id),
                });
                setContent("assignments");
                setUploading(false);
                setProgressStatus([]);
                setSelectedFile(null);
                setTitle("");
                setCaption("");
                setDueDatetime("");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        );
      } else {
        const assignment = {
          title: title.trim(),
          caption: caption.trim(),
          start: startDatetime ? new Date(startDatetime) : new Date(),
          due: new Date(dueDatetime),
          file: "",
          submitted: [],
        };
        addDoc(collection(db, "assignments"), assignment)
          .then((docRef) => {
            updateDoc(doc(db, "courses", courseCode), {
              assignments: arrayUnion(docRef.id),
            });
            setContent("assignments");
            setUploading(false);
            setProgressStatus([]);
            setSelectedFile(null);
            setTitle("");
            setCaption("");
            setDueDatetime("");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (selectedFile1) {
      setUploading(true);
      const storageRef = ref(
        storage,
        `assignments/${courseCode}/${selectedFile1.name}`
      );
      try {
        await getMetadata(storageRef);
        alert("File already exists!");
        setContent("assignments");
        setUploading(false);
        setProgressStatus([]);
        setSelectedFile1(null);
        setAssignment("");
        return;
      } catch (e) { }
      const uploadTask = uploadBytesResumable(storageRef, selectedFile1);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgressStatus([snapshot.bytesTransferred, snapshot.totalBytes]);
        },
        (error) => {
          console.log(error);
        },
        () => {
          const assignmentRef = doc(db, "assignments", assignment);
          updateDoc(assignmentRef, {
            submitted: arrayUnion({
              suid: uid,
              file: selectedFile1.name,
              time: new Date(),
            }),
          });
          setContent("assignments");
          setUploading(false);
          setProgressStatus([]); setSelectedFile1(null);
          setAssignment("");
        }
      );
    }
  };

  const deleteAssignment = useCallback(
    (id) => {
      return async () => {
        setLoading(true);
        const assignmentRef = doc(db, "assignments", id);
        await deleteDoc(assignmentRef);
        const courseRef = doc(db, "courses", courseCode);
        await updateDoc(courseRef, {
          assignments: arrayRemove(id),
        });
      };
    },
    [courseCode]
  );

  const handleAwardGrades = async (e) => {
    e.preventDefault();
    setLoading(true);
    const studentRef = doc(db, "users", Suid);
    updateDoc(studentRef, {
      grades: arrayUnion({
        course: courseCode,
        assignment: assignment,
        remark: remark,
        maxGrade: parseFloat(maxGrade),
        grade: parseFloat(grade),
      }),
    });
    setContent("submissions");
    setGrade("");
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleRemark = (e) => {
    setRemark(e.target.value);
    textAreaRef1.current.style.height = "auto";
    textAreaRef1.current.style.height = `${textAreaRef1.current.scrollHeight}px`;
  };

  const handleStartDatetime = (e) => {
    setStartDatetime(e.target.value);
  };

  const handleDueDatetime = (e) => {
    setDueDatetime(e.target.value);
  };

  const handleAddFile = (e) => {
    fileInputRef.current.click();
  };

  const handleAddFile1 = (assignmentId) => {
    return () => {
      setAssignment(assignmentId);
      fileInputRef1.current.click();
    };
  };

  const listSubmissions = (assignmentId) => {
    return () => {
      setAssignment(assignmentId);
      setContent("submissions");
      setLoading(true);
    };
  };

  const fileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const fileChange1 = (e) => {
    setSelectedFile1(e.target.files[0]);
    setContent("submit");
  };

  const handleGrade = (e) => {
    setGrade(e.target.value);
  };

  const handleMaxGrade = (e) => {
    setMaxGrade(e.target.value);
  };

  const awardGrades = (suid) => {
    return () => {
      setSuid(suid);
      setContent("grades");
    };
  };

  return (
    <div className="assignments">
      <div className="assignments-header">
        <span className="assignments-title">{courseName}</span>
        {role === "Teacher" && (
          <button className="newAssignment" onClick={newAssignment}>
            <SVGS svgName="newWork" Class="newWork-icon"></SVGS>
            <span>New Assignment</span>
          </button>
        )}
      </div>
      <div className="assignments-body">
        {content === "new-assignment" && (
          <div className="upload-form">
            <form onSubmit={handleAddAssignment} className="container1">
              <input
                className="field3"
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitle}
              ></input>
              <input
                type="file"
                onChange={fileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              ></input>
              <div className="field3">
                <div onClick={handleAddFile}>
                  <SVGS svgName="add" Class="addfile"></SVGS>
                </div>
                <label className="fileName">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </label>
              </div>
              <textarea
                maxLength={500}
                className="field3"
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={handleCaption}
                ref={textAreaRef}
              />
              <label className="row">
                Start:
                <input
                  className="field3"
                  type="datetime-local"
                  value={startDatetime}
                  onChange={handleStartDatetime}
                ></input>
              </label>
              <label className="row">
                Due:
                <input
                  className="field3"
                  type="datetime-local"
                  value={dueDatetime}
                  onChange={handleDueDatetime}
                ></input>
              </label>
              {uploading && <Progress args={progressStatus}></Progress>}
              <button className="button" type="submit">
                post
              </button>
            </form>
          </div>
        )}
        {content === "submit" && (
          <form onSubmit={handleSubmitAssignment} className="container1">
            <label className="fileName field3">
              {selectedFile1 ? selectedFile1.name : "No file selected"}
            </label>
            {uploading && <Progress args={progressStatus}></Progress>}
            <button className="button" type="submit">
              Submit Assignment
            </button>
          </form>
        )}
        {content === "grades" && (
          <form className="container1" onSubmit={handleAwardGrades}>
            <div className="row">
              <label>Grade:</label>
              <input
                className="field3"
                type="number"
                step={0.01}
                min={0}
                max={maxGrade}
                value={grade}
                onChange={handleGrade}
              ></input>
              <input
                className="field3"
                type="number"
                value={maxGrade}
                onChange={handleMaxGrade}
              ></input>
            </div>
            <textarea
              maxLength={100}
              className="field3"
              type="text"
              placeholder="Remarks"
              value={remark}
              onChange={handleRemark}
              ref={textAreaRef1}
            />
            <button className="button" type="submit">
              Award
            </button>
          </form>
        )}
        {content === "assignments" && assignmentsCard}
        {content === "submissions" && submittedCard}
      </div>
      {loading && <Loader></Loader>}
    </div>
  );
}

export default Assignment;
