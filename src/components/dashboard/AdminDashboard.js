import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";
import "../../style/admind.css";
import axios from 'axios';
import TutorPage from '../LatestTutor';


const AdminDashboard = () => {
  const baseURL = process.env.REACT_APP_SERVER;
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tutor,setTutor] = useState({});
  const [tuitionCenter,setTutionCenter] = useState({});
  const [students,setStudents] = useState({});


  const fecthInfo = async ()=>{
    try {
      const req1 = await axios.get(`${baseURL}/api/admin/users/Students`);

      const req2 = await axios.get(`${baseURL}/api/admin/users/Tutors`);

      const req3 = await axios.get(`${baseURL}/api/admin/users/TuitionCenter`);

      setStudents(req1.data.Success);
      setTutor(req2.data.Success);
      setTutionCenter(req3.Success);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
    fecthInfo();
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userNotExist());
    toast.success("User logout successfully");
    navigate("/");
  };
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <div className='tutor-list'>
          <TutorPage/>
      </div>
      <button onClick={handleLogout} className="logout">
            LOGOUT
          </button>
    </div>
  );
};

export default AdminDashboard;
