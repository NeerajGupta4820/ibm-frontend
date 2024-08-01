import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
import { useCreateTutorProfileMutation } from "../redux/api/tutorApi";
import axios from "axios";
import Spinner from "./Spinner";

const SignupTutor = () => {
  const navigate=useNavigate();
  const [createTutorProfile, { isLoading }] = useCreateTutorProfileMutation();
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    bio: "",
    subjects: [],
    availability: "",
    fees: {}
  });

  const handleUpload = async (file) => {
    const cname = process.env.REACT_APP_CLOUDNAME;
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const fData = new FormData();
    fData.append('file', file);
    fData.append('upload_preset', 'IBM_Project');

    setUpload(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cname}/image/upload`,
        fData
      );
      setFormData((prevState) => ({
        ...prevState,
        photo: response.data.secure_url
      }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error('Failed to upload image.');
    } finally {
      setUpload(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files[0]) {
      handleUpload(files[0]);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData((prevState) => ({ ...prevState, subjects: newSubjects }));
  };

  const handleFeeChange = (subject, value) => {
    const newFees = { ...formData.fees, [subject]: value };
    setFormData((prevState) => ({ ...prevState, fees: newFees }));
  };

  const handleAddSubject = () => {
    setFormData((prevState) => ({ ...prevState, subjects: [...prevState.subjects, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const defaultPhotoUrl = `${process.env.REACT_APP_DEFAULT_PHOTO}`;
    
    // Ensure all subjects have corresponding fees
    const subjectsWithFees = formData.subjects.every(subject => formData.fees[subject]);

    if (!subjectsWithFees) {
      toast.error("Please provide fees for all subjects.");
      return;
    }

    try {
      const tutorFormData = new FormData();
      for (const key in formData) {
        if (key === "subjects" || key === "fees") {
          tutorFormData.append(key, JSON.stringify(formData[key]));
        } else {
          tutorFormData.append(key, formData[key] || (key === "photo" && defaultPhotoUrl));
        }
      }
      const response = await createTutorProfile(tutorFormData).unwrap();
      if (response.success) {
        toast.success(response.message || "Tutor registered successfully");
        navigate("/login")
      } else {
        toast.error(response.message || "Failed to register");
      }
    } catch (err) {
      console.error("Failed to register tutor:", err);
      const errorMessage = err?.data?.message || "Failed to register tutor";
      toast.error(errorMessage);
    }
  };

  return (
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
        {upload && <Spinner />}
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
        <label>Subjects and Fees</label>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="subject-fee-pair">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Fee"
              value={formData.fees[subject] || ""}
              onChange={(e) => handleFeeChange(subject, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
          Add Subject
        </button>
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
      <button type="submit" disabled={isLoading || upload}>
        {isLoading || upload ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupTutor;
