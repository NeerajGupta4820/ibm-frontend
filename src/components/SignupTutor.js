import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useCreateTutorProfileMutation } from "../redux/api/tutorApi";

const SignupTutor = () => {
  const [createTutorProfile, { isLoading, isError, isSuccess, error }] = useCreateTutorProfileMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    bio: "",
    subjects: "",
    availability: "",
    fees: ""
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
      const tutorFormData = new FormData();
      for (const key in formData) {
        tutorFormData.append(key, formData[key]);
      }
      const response = await createTutorProfile(tutorFormData).unwrap();
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      console.log('Response:', response);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to register tutor");
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupTutor;