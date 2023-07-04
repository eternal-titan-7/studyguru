import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../db';

function Requests({ courseCode, courseData, joinCourse }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchData() {
            var cards = [];
            for (const uid of courseData.joinRequests) {
                const docSnap = await getDoc(doc(db, "users", uid));
                const data = docSnap.data();
                cards.push(<div className="chat-card" key={uid}>
                    <img className="chat-card-dp" src={data.dp} alt="Profile pic" />
                    <div className="chat-card-details">
                        <span className="chat-card-name">{data.name}</span>
                        <span className="chat-card-email">{data.email}</span>
                    </div>
                    <button
                        className="course-btn"
                        onClick={() => joinCourse(courseCode, uid)}
                    >
                        <span>Accept &#9989;</span>
                    </button>
                </div>);
            }
            setRequests(cards);
        }
        if (courseData.joinRequests) {
            fetchData();
        }
    }, [courseData.joinRequests, courseCode, joinCourse]);

    return (
        <div className='course-page'>
            <div className="course-header">
                <span className='about-us-title'>Join Requests</span>
                <span className="courseTitle">{courseData.name}</span>
            </div>
            <div className='studentList'>
                {requests}
            </div>
        </div>
    );
}

export default Requests;