import React, { useEffect, useRef, useState } from "react";
import "./material.css";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import db from "../db";
import SVGS from "./svgs";
import Loader from "./loader";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";
import { useCallback } from "react";
import Progress from "./progress";
import { decorateFileSize } from "./progressUtils";

function Material({ role, courseCode }) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Study Materials");
  const [content, setContent] = useState("materials");
  const [currentFile, setCurrentFile] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progressStatus, setProgressStatus] = useState([]);
  const [fileCard, setFileCard] = useState("");
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const storage = getStorage(getApp());

  const downloadFile = useCallback(
    (fileName) => {
      return () => {
        const storageRef = ref(storage, `materials/${courseCode}/${fileName}`);
        const downloadTask = getDownloadURL(storageRef);
        downloadTask.then((url) => {
          window.open(url, "_blank");
        });
      };
    },
    [courseCode, storage]
  );

  const deleteFile = useCallback(
    (obj) => {
      return async () => {
        setLoading(true);
        const storageRef = ref(storage, `materials/${courseCode}/${obj.name}`);
        deleteObject(storageRef)
          .then(() => {
            const docRef = doc(db, "courses", courseCode);
            updateDoc(docRef, {
              materials: arrayRemove(obj),
            });
          })
          .catch((error) => {
            alert(error);
          });
      };
    },
    [courseCode, storage]
  );

  useEffect(() => {
    async function fetchData(courseCode) {
      const docRef = doc(db, "courses", courseCode);
      onSnapshot(docRef, (docSnap) => {
        const data = docSnap.data();
        setTitle(data.name);
        const fileCard = data.materials.map((file) => (
          <article className="file-card" key={file.time}>
            <div className="file-details">
              <div className="file-name">{file.name}</div>
              <span className="file-size">{decorateFileSize(file.size)}</span>
              <span className="file-time">
                {file.time.toDate().toLocaleString("IN")}
              </span>
              <div className="row">
                {role === "Teacher" && (
                  <button
                    className="delete-btn"
                    onClick={deleteFile(file)}
                  >
                    <SVGS svgName="delete" Class="delete-icon"></SVGS>
                  </button>
                )}
                <button
                  className="file-download"
                  onClick={downloadFile(file.name)}
                >
                  <SVGS svgName="download" Class="download-icon"></SVGS>
                </button>
              </div>
            </div>
            <p className="assignment-caption" style={{ height: "fit-content" }}>
              {file.caption}
            </p>
          </article>
        ));
        setFileCard(fileCard);
        setLoading(false);
      });
    }
    fetchData(courseCode);
  }, [role, courseCode, deleteFile, downloadFile]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    if (currentFile) {
      if (currentFile.size <= 100 * 1024 * 1024) {
        setUploading(true);
        setProgressStatus([]);
        const storageRef = ref(
          storage,
          `materials/${courseCode}/${currentFile.name}`
        );
        try {
          try {
            await getMetadata(storageRef);
            alert("A file with the same name already exists.");
            setUploading(false);
            setContent("materials");
            return;
          } catch (error) { }
        } catch (error) { }

        const uploadTask = uploadBytesResumable(storageRef, currentFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgressStatus([snapshot.bytesTransferred, snapshot.totalBytes]);
          },
          (error) => {
            alert(error);
          },
          async () => {
            const docRef = doc(db, "courses", courseCode);
            await updateDoc(docRef, {
              materials: arrayUnion({
                name: currentFile.name,
                size: currentFile.size,
                caption: caption.trim(),
                time: new Date(),
              }),
            });
            setUploading(false);
            setContent("materials");
          }
        );
      } else {
        alert("File size should be less than 100MB");
      }
    } else {
      alert("Please select a file to upload");
    }
  };

  function uploadForm(e) {
    e.preventDefault();
    setCurrentFile(e.target.files[0]);
    setContent("upload");
  }

  return (
    <>
      <div className="materials">
        <div className="material-header">
          <span className="material-title">{title}</span>
          {role === "Teacher" && (
            <button className="upload" onClick={handleUploadClick}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={uploadForm}
              ></input>
              <SVGS svgName="upload" Class="upload-icon"></SVGS>
            </button>
          )}
        </div>
        <div className="material-body">
          {content === "materials" && fileCard}
          {content === "upload" && (
            <div className="upload-form">
              <form onSubmit={handleUploadFile} className="container1">
                <label className="file-name">
                  {currentFile ? currentFile.name : "No File Selected"}
                </label>
                <textarea
                  maxLength={500}
                  className="field3"
                  type="text"
                  placeholder="Caption"
                  value={caption}
                  onChange={handleCaption}
                  ref={textAreaRef}
                />

                {uploading && <Progress args={progressStatus}></Progress>}
                <button className="button" type="submit">
                  Upload File
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {loading && <Loader></Loader>}
    </>
  );
}

export default Material;
