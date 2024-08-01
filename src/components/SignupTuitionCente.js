import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
import { useCreateTuitionCenterProfileMutation } from "../redux/api/tuitioncenterApi";
import axios from "axios";
import Spinner from "./Spinner";

const SignupTuitionCenter = () => {
  const navigate=useNavigate();
  const [createTuitionCenterProfile, { isLoading }] = useCreateTuitionCenterProfileMutation();
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    location: "",
    description: "",
    contactNumber: ""
  });

  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState({});
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentFee, setCurrentFee] = useState("");

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

  const handleAddCourse = () => {
    if (currentCourse && currentFee) {
      setCourses([...courses, currentCourse]);
      setFees({ ...fees, [currentCourse]: currentFee });
      setCurrentCourse("");
      setCurrentFee("");
    } else {
      toast.error("Please enter both course name and fee.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Default photo URL
    const defaultPhotoUrl = `${process.env.REACT_APP_DEFAULT_PHOTO}`;
    
    try {
      const tuitionCenterFormData = {
        ...formData,
        photo: formData.photo || defaultPhotoUrl,
        courses: JSON.stringify(courses),
        fees: JSON.stringify(fees)
      };

      const response = await createTuitionCenterProfile(tuitionCenterFormData).unwrap();
      if (response.success) {
        toast.success(response.message || "Tuition Center registered successfully");
        navigate('/login')
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
      <div className="form-group">
        <label htmlFor="courses">Courses</label>
        <input
          type="text"
          id="currentCourse"
          name="currentCourse"
          value={currentCourse}
          onChange={(e) => setCurrentCourse(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fees">Fees</label>
        <input
          type="text"
          id="currentFee"
          name="currentFee"
          value={currentFee}
          onChange={(e) => setCurrentFee(e.target.value)}
        />
        <button type="button" onClick={handleAddCourse}>Add Course</button>
      </div>
      <div className="form-group">
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}: {fees[course]}</li>
          ))}
        </ul>
      </div>
      <button type="submit" disabled={isLoading || upload}>
        {isLoading || upload ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default SignupTuitionCenter;
