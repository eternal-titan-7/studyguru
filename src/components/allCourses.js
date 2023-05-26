import React, { useEffect, useState } from 'react';
import db from '../db';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import SVGS from './svgs';

function AllCourses({ joinRequest, joinCourse, isJoined }) {
    const [courseCard, setCourseCard] = useState([]);
    const [courseCode, setCourseCode] = useState("");
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "courses"), async (snapshot) => {
            var cards = [];
            snapshot.forEach(async (docc) => {
                const id = docc.id;
                const data = docc.data();
                const docRef1 = doc(db, "users", data.teacher);
                const docSnap1 = await getDoc(docRef1);
                const data1 = docSnap1.data();
                cards.push(
                    <article className="course-card" key={id}>
                        <h2 className="course-name">{data.name}</h2>
                        <p className="course-teacher">
                            By {data1.name}
                        </p>
                        <textarea
                            disabled
                            className="course-description"
                            value={data.description}
                        ></textarea>
                        <div className="course-btns">
                            {isJoined(id) ? <button className="green-button" style={{ fontSize: "16px" }} disabled>Already Joined</button> : <button
                                className="course-btn"
                                onClick={() => joinRequest(id)}
                            >
                                <span>Request Join</span>
                                <SVGS svgName="add" Class="open"></SVGS>
                            </button>}
                        </div>
                    </article>
                );
                setCourseCard(cards);
            });
        });
        return () => unsubscribe();
    }, [isJoined, joinRequest]);

    function handleCcode(e) {
        setCourseCode(e.target.value);
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); joinCourse(courseCode); }} className="container1">
                <input
                    className="field3"
                    type="text"
                    placeholder="Course Code"
                    value={courseCode}
                    onChange={handleCcode}
                />
                <button className="button" type="submit">
                    Join Via Code
                </button>
            </form>
            <div className='row'>
                {courseCard}
            </div></>
    );
}

export default AllCourses;