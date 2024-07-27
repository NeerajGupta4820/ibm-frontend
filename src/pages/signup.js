// Signup.jsx
import React, { useState } from "react";
import SignupStudent from "../components/SignupStudent";
import SignupTutor from "../components/SignupTutor";
import SignupTuitionCenter from "../components/SignupTuitionCente.js";

const Signup = () => {
  const [type, setType] = useState("Student");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userFormData = new FormData();
      for (const key in formData) {
        userFormData.append(key, formData[key]);
      }
      if (type === "Tutor") {
        await createTutorProfile(userFormData).unwrap();
        alert("Tutor registered successfully!");
      } else {
        await registerUser(userFormData).unwrap();
        alert("User registered successfully!");
      }
    } catch (err) {
      console.error("Failed to register user:", err);
    }
  };

  return (
    <div className="signup-user">
      <h2>Signup</h2>
      <div className="form-group">
        <select value={type} onChange={handleSelectChange}>
          <option value="Student">Student</option>
          <option value="Tutor">Tutor</option>
          <option value="TuitionCenter">Tuition Center</option>
        </select>
      </div>
      {type === "Student" && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileInfo">Profile Info</label>
            <textarea
              id="profileInfo"
              name="profileInfo"
              value={formData.profileInfo}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Signup"}
          </button>
          {isError && <p className="error">Error: {error.message}</p>}
          {isSuccess && <p className="success">Registration successful!</p>}
        </form>
      )}
      {type === "Tutor" && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subjects">Subjects</label>
            <input
              type="text"
              id="subjects"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fees">Fees</label>
            <input
              type="text"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isTutorLoading}>
            {isTutorLoading ? "Signing up..." : "Signup"}
          </button>
          {isTutorError && <p className="error">Error: {tutorError.message}</p>}
          {isTutorSuccess && <p className="success">Registration successful!</p>}
        </form>
      )}
      {type === "TuitionCenter" && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="courses">Courses</label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fees">Fees</label>
            <input
              type="text"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isTutorLoading}>
            {isTutorLoading ? "Signing up..." : "Signup"}
          </button>
          {isTutorError && <p className="error">Error: {tutorError.message}</p>}
          {isTutorSuccess && <p className="success">Registration successful!</p>}
        </form>
    </div>
  );
};

export default Signup;
