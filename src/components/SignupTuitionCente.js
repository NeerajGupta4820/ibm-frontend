import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useCreateTuitionCenterProfileMutation } from "../redux/api/tuitioncenterApi";
import axios from "axios";
import Spinner from "./Spinner";

const SignupTuitionCenter = () => {
  const [createTuitionCenterProfile, { isLoading }] = useCreateTuitionCenterProfileMutation();
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    location: "",
    courses: "",
    fees: "",
    description: "",
    contactNumber: ""
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
      setUpload(true);
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
      const tuitionCenterFormData = new FormData();
      for (const key in formData) {
        tuitionCenterFormData.append(key, formData[key] || (key === "photo" && defaultPhotoUrl));
      }
      console.log(tuitionCenterFormData);
      const response = await createTuitionCenterProfile(tuitionCenterFormData).unwrap();
      if (response.success) {
        toast.success(response.message || "Tuition Center registered successfully");
      } else {
        toast.error(response.message || "Failed to register");
      }
    } catch (err) {
      console.error("Failed to register tuition center:", err);
      const errorMessage = err?.data?.message || "Failed to register tuition center";
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
      <button type="submit" disabled={isLoading || upload}>
        {isLoading || upload ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default SignupTuitionCenter;
