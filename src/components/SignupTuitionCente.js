import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useCreateTuitionCenterProfileMutation } from "../redux/api/tuitioncenterApi";

const SignupTuitionCenter = () => {
  const [createTuitionCenterProfile, { isLoading, isError, error }] = useCreateTuitionCenterProfileMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: `${process.env.REACT_APP_DEFAULT_PHOTO}`,
    location: "",
    courses: "",
    fees: "",
    description: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tuitionCenterFormData = new FormData();
      for (const key in formData) {
        tuitionCenterFormData.append(key, formData[key]);
      }
      
      // Make API request
      const response = await createTuitionCenterProfile(tuitionCenterFormData).unwrap();
      
      // Log the successful response
      console.log('Response:', response);

      // Show success message
      toast.success(response.message || "Tuition Center registered successfully");
    } catch (err) {
      console.error("Failed to register tuition center:", err);
      
      // Extract and show error message
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
          required
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default SignupTuitionCenter;