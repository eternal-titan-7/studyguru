import React, { useCallback, useEffect, useRef, useState } from "react";
import "./chats.css";
import SVGS from "./svgs";
import Loader from "./loader";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../db";

function Chats({ uid }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("chats");
  const [chatUri, setChatUri] = useState("");
  const [chatCard, setChatCard] = useState("");
  const [chatMode, setChatMode] = useState("");
  const [messageCard, setMessageCard] = useState("");
  const [chatTitle, setChatTitle] = useState("");
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState("");

  function changeMessage(e) {
    e.preventDefault();
    setMessage(e.target.value);
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  const deleteMessage = useCallback(
    (message) => async () => {
      const chatRef = doc(db, "chats", chatMode);
      await updateDoc(chatRef, {
        messages: arrayRemove(message),
      });
    },
    [chatMode]
  );

  useEffect(() => {
    async function fetchData() {
      onSnapshot(doc(db, "users", uid), async (docSnap) => {
        const chats = docSnap.data().chats;
        if (!chats) {
          setLoading(false);
          return;
        }
        var card = [];
        for (let i = 0; i < chats.length; i++) {
          const docSnap = await getDoc(doc(db, "chats", chats[i]));
          const data = docSnap.data();
          const docSnap1 = await getDoc(
            doc(
              db,
              "users",
              data.users[0] === uid ? data.users[1] : data.users[0]
            )
          );
          const data1 = docSnap1.data();
          card.push(
            <div className="chat-card" key={chats[i]}>
              <img
                className="chat-card-dp"
                src={data1.dp}
                alt="Chat profile pic"
              />
              <div className="chat-card-details">
                <span className="chat-card-name">
                  {data1.name}
                </span>
                <span className="chat-card-email">{data1.email}</span>
              </div>
              <button className="chat-card-open" onClick={viewChat(chats[i])}>
                <SVGS svgName="open" Class="open-icon"></SVGS>
              </button>
            </div>
          );
        }
        setChatCard(card);
        setLoading(false);
      });
    }
    if (content === "chats") {
      fetchData();
    }
  });

  useEffect(() => {
    if (content === "messages") {
      onSnapshot(doc(db, "chats", chatMode), async (docSnap) => {
        const data = docSnap.data();
        const docSnap1 = await getDoc(
          doc(
            db,
            "users",
            data.users[0] === uid ? data.users[1] : data.users[0]
          )
        );
        const data1 = docSnap1.data();
        setChatTitle(
          <div className="profile">
            <img className="profile-icon" src={data1.dp} alt="Profile pic" />
            <div className="profile-detail">
              <span className="profile-name">
                {data1.name}
              </span>
              <span className="profile-email">{data1.email}</span>
            </div>
          </div>
        );
        const cards = data.messages.reverse().map((message) => (
          <div
            className={"message-card " + (message.id === uid && "me")}
            key={message.time}
          >
            {message.id === uid && <div className="row" style={{justifyContent: "space-between"}}>
              <div className="messager">You</div>
              <button
                className="delete-btn"
                onClick={deleteMessage(message)}
              >
                <SVGS svgName="delete" Class="delete-icon smaller"></SVGS>
              </button>
            </div>
            }
            <div className="message-card-message">{message.text}</div>
            <div className="message-card-footer">
              <span className="message-card-time">
                {message.time.toDate().toLocaleString("IN")}
              </span>
            </div>
          </div>
        ));
        setMessageCard(cards);
        setLoading(false);
      });
    }
  }, [chatMode, content, uid, deleteMessage]);

  function newChat(e) {
    setChatUri(e.target.value);
  }

  const checkIfDocExists = async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  async function createNewChat() {
    if (chatUri.trim() !== "") {
      setLoading(true);
      const chatRef = collection(db, "users");
      const q = query(chatRef, where("email", "==", chatUri));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("User not found");
        setLoading(false);
      } else {
        if (uid !== querySnapshot.docs[0].id) {
          setLoading(true);
          if (
            (await checkIfDocExists("chats", uid + querySnapshot.docs[0].id)) ||
            (await checkIfDocExists("chats", querySnapshot.docs[0].id + uid))
          ) {
            alert("Chat already exists");
            setLoading(false);
          } else {
            const docRef = doc(db, "chats", uid + querySnapshot.docs[0].id);
            await setDoc(docRef, {
              users: [uid, querySnapshot.docs[0].id],
              messages: [],
            });
            await updateDoc(doc(db, "users", uid), {
              chats: arrayUnion(docRef.id),
            });
            await updateDoc(doc(db, "users", querySnapshot.docs[0].id), {
              chats: arrayUnion(docRef.id),
            });
            setChatUri("");
          }
        } else {
          alert("You cannot chat with yourself");
        }
      }
    } else {
      alert("Email cannot be empty");
    }
  }

  function viewChat(chat_id) {
    return () => {
      setLoading(true);
      setContent("messages");
      setChatMode(chat_id);
    };
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (message.trim() !== "") {
      const post = {
        text: message.trim(),
        time: new Date(),
        id: uid,
      };
      const docRef = doc(db, "chats", chatMode);
      await updateDoc(docRef, { messages: arrayUnion(post) });
      setMessage("");
    } else {
      alert("Text cannot be empty");
    }
  }

  function back() {
    setLoading(true);
    setContent("chats");
    setChatMode("");
    setMessageCard("");
  }

  return (
    <>
      <div className="chats">
        <div className="chat-header">
          {content === "messages" && (
            <button className="backButton" onClick={back}>
              <SVGS svgName="back" Class="backIcon"></SVGS>
            </button>
          )}
          {content === "chats" ? (
            <span className="chat-title">Chats</span>
          ) : (
            chatTitle
          )}
          {content === "chats" && (
            <>
              <input
                className="new-chat"
                placeholder="Email"
                value={chatUri}
                onChange={newChat}
              ></input>
              <button className="chat-button" onClick={createNewChat}>
                <SVGS svgName="newchat" Class="new-chat-icon"></SVGS>
              </button>
            </>
          )}
        </div>
        {content === "chats" && <div className="chat-list">{chatCard}</div>}

        {content === "messages" && (
          <div className="chat-list1">{messageCard}</div>
        )}
        {content === "messages" && (
          <form className="chat-form" onSubmit={sendMessage}>
            <textarea
              ref={textAreaRef}
              className="field2"
              maxLength="2000"
              placeholder="Enter your message here..."
              value={message}
              onChange={changeMessage}
            ></textarea>
            <button className="sendButton" type="submit">
              <SVGS svgName="send" Class="sendIcon"></SVGS>
            </button>
          </form>
        )}
      </div>
      {loading && <Loader></Loader>}
    </>
  );
}

export default Chats;
