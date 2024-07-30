import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useCreateTutorProfileMutation } from "../redux/api/tutorApi";
import axios from "axios";
import Spinner from "./Spinner";

const SignupTutor = () => {
  const [createTutorProfile, { isLoading }] = useCreateTutorProfileMutation();
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    bio: "",
    subjects: "",
    availability: "",
    fees: ""
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
      console.log(response);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Default photo URL
    const defaultPhotoUrl = `${process.env.REACT_APP_DEFAULT_PHOTO}`;
    
    try {
      const tutorFormData = new FormData();
      for (const key in formData) {
        tutorFormData.append(key, formData[key] || (key === "photo" && defaultPhotoUrl));
      }
      console.log(tutorFormData);
      const response = await createTutorProfile(tutorFormData).unwrap();
      if (response.success) {
        toast.success(response.message || "Tutor registered successfully");
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
      <button type="submit" disabled={isLoading || upload}>
        {isLoading || upload ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupTutor;
