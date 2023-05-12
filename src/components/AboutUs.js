import React from "react";
import "./aboutus.css";

function AboutUs() {
  return (
    <div className="about-us-card">
      <h2 className="about-us-title">About</h2>
      <p className="about-us-text">
        Welcome to this Web Application developed by Bhavesh Soni, a B Tech CSE Student at Amity University Chhattisgarh. 🚀
        <br /><br />
        This application was created as part of a software engineering training project assigned by Professor Dr. Goldi Soni Ma'am. 🎓
        <br /><br />
        Our goal is to provide students and faculty members with a user-friendly and efficient platform to register for and join courses, manage course materials, submit assignments, track grades, and receive course announcements. 💡
        <br /><br />
        Thank you for using our application! We hope you find it helpful in your academic journey. 🙏
        <br /><br />
        For any inquiries or feedback, please feel free to contact me via email at <a href="mailto:bhaweshsoni29@gmail.com">bhaweshsoni29@gmail.com</a>.

      </p>
    </div>
  );
}

export default AboutUs;
