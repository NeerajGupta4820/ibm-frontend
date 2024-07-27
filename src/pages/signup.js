// Signup.jsx
import React, { useState } from "react";
import SignupStudent from "../components/SignupStudent";
import SignupTutor from "../components/SignupTutor";
import SignupTuitionCenter from "../components/SignupTuitionCente";
import '../style/signup.css';  // Import the updated CSS file

const Signup = () => {
  const [type, setType] = useState("Student");

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="signup">
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
  );
};

export default Signup;
