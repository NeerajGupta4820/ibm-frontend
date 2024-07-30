import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRegisterMutation } from "../redux/api/userApi";
import axios from "axios";

const SignupStudent = () => {
  const [registerUser, { isLoading, isError, isSuccess, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    profileInfo: ""
  });

  const handleUpload = async (file) => {
    const cname = process.env.REACT_APP_CLOUDNAME;
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const fData = new FormData();
    fData.append('file', file);
    fData.append('upload_preset', 'IBM_Project');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxt2i61hy/image/upload`,
        fData
      );
      console.log(response);
      setFormData((prevState) => ({
        ...prevState,
        photo: response.data.secure_url
      }));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error("Error uploading image", error);
      alert('Failed to upload image.');
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
      const userFormData = new FormData();
      for (const key in formData) {
        userFormData.append(key, formData[key] || (key === "photo" && defaultPhotoUrl));
      }

      const response = await registerUser(userFormData).unwrap();
      if (response.success) {
        toast.success(response.message || "Student registered successfully");
      } else {
        toast.error(response.message || "Failed to register");
      }
    } catch (err) {
      console.error("Failed to register student:", err);
      toast.error("Failed to register");
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
      </div>
      <div className="form-group">
        <label htmlFor="profileInfo">Profile Info</label>
        <textarea
          id="profileInfo"
          name="profileInfo"
          value={formData.profileInfo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupStudent;
