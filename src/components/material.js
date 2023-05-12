import React, { useEffect, useRef, useState } from "react";
import "./material.css";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../db";
import SVGS from "./svgs";
import Loader from "./loader";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";
import { useCallback } from "react";

function Material({ role, courseCode }) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Study Materials");
  const [content, setContent] = useState("materials");
  const [currentFile, setCurrentFile] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
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
              <button
                className="file-download"
                onClick={downloadFile(file.name)}
              >
                <SVGS svgName="download" Class="download-icon"></SVGS>
              </button>
            </div>
            <textarea
              disabled
              className="field3"
              value={file.caption}
              ref={textAreaRef}
            />
          </article>
        ));
        setFileCard(fileCard);
        setLoading(false);
      });
    }
    fetchData(courseCode);
  }, [role, courseCode, downloadFile]);

  const decorateFileSize = (fileSize) => {
    if (fileSize < 1024) {
      return `${fileSize} B`;
    } else if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(2)} KB`;
    } else if (fileSize < 1024 * 1024 * 1024) {
      return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  });

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    if (currentFile) {
      if (currentFile.size <= 100 * 1024 * 1024) {
        setUploading(true);
        setUploaded(0);
        const storageRef = ref(
          storage,
          `materials/${courseCode}/${currentFile.name}`
        );
        try {
          await (async () => {
            try {
              await getMetadata(storageRef);
              alert("A file with the same name already exists.");
              setUploading(false);
              setContent("materials");
              return;
            } catch (error) {}
          })();
        } catch (error) {}

        const uploadTask = uploadBytesResumable(storageRef, currentFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploaded(
              decorateFileSize(snapshot.bytesTransferred) +
                " / " +
                decorateFileSize(snapshot.totalBytes) +
                " => " +
                progress.toFixed(2)
            );
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
                {uploading && <p>Upload Progress: {uploaded}%</p>}
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
