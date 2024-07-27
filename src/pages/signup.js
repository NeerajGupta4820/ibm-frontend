// Signup.jsx
import React, { useState } from "react";
import SignupStudent from "../components/SignupStudent";
import SignupTutor from "../components/SignupTutor";
import SignupTuitionCenter from "../components/SignupTuitionCente";
import img from "../assets/signup/img.webp"
import "../style/signup.css"; 

const Signup = () => {
  const [type, setType] = useState("Student");

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="main-signup">
      <div className="signup">
      <div className="signup-img">
      <img src={img} alt="login " />
      </div>
      <div className="signup-content">
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="signupType">Select Signup Type</label>
          <select id="signupType" value={type} onChange={handleSelectChange}>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
            <option value="TuitionCenter">Tuition Center</option>
          </select>
        </div>
        {type === "Student" && <SignupStudent />}
        {type === "Tutor" && <SignupTutor />}
        {type === "TuitionCenter" && <SignupTuitionCenter />}
      </div>
      </div>
    </div>
  );
};

export default Signup;
