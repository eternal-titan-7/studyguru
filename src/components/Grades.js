import React, { useEffect, useState } from "react";
import "./grades.css";
import { doc, getDoc } from "firebase/firestore";
import db from "../db";

function Grades({ grades, courseCode }) {
  const [gradeCard, setGradeCard] = useState("");
  const [courseName, setCourseName] = useState("");
  const [total, setTotal] = useState(0);
  const [totalMax, setTotalMax] = useState(0);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const courseDoc = await getDoc(doc(db, "courses", courseCode));
      setCourseName(courseDoc.data().name);
      var total = 0;
      var totalMax = 0;
      for (const key in grades) {
        if (Object.hasOwnProperty.call(grades, key)) {
          const dict = grades[key];
          if (dict.course === courseCode) {
            const grade = dict.grade;
            const maxGrade = dict.maxGrade;
            const assignment = (
              await getDoc(doc(db, "assignments", dict.assignment))
            ).data().title;
            const remark = dict.remark;
            total += grade;
            totalMax += maxGrade;
            setGradeCard(
              <div className="grade-card">
                <div className="grade-card-title">{assignment}</div>
                <div className="grade-card-grade">
                  {grade}/{maxGrade}
                </div>
                <div className="grade-card-remark">{remark}</div>
              </div>
            );
          }
        }
      }
      setTotal(total);
      setTotalMax(totalMax);
      setPerc((total / (totalMax / 100)).toFixed(2));
    };
    fetchData();
  });

  return (
    <div className="grades">
      <div className="grade-header">
        <div className="grade-title">{courseName}</div>
      </div>

      <div className="grade-content">
        <div className="grade-total">
          <div className="grade-title">Overall Grade</div>
          <span>Total Grade: {total}/{totalMax}</span>
          <span>Percentage: {perc}%</span>
        </div>
        {gradeCard}
      </div>
    </div>
  );
}

export default Grades;
