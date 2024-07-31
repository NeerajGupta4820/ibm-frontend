import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../components/dashboard/UserProfile'; 
import '../../style/dashboard/admindashboard.css';
import AllUserList from '../../components/dashboard/AllUserList';
import { userNotExist } from "../../redux/reducers/userReducer";
import { toast } from "react-hot-toast";
import {  useDispatch } from 'react-redux';
import AllTutorList from '../../components/dashboard/AllTutorList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("profile");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userNotExist());
    toast.success("User logout successfully");
    navigate("/");
  };
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-left">
        <h2>Dashboard</h2>
        <ul className="admin-dashboard-menu">
          <li><button onClick={() => setActiveComponent('profile')}>Profile</button></li>
          <li><button onClick={() => setActiveComponent('all-users')}>All Users</button></li>
          <li><button onClick={() => setActiveComponent('all-tutors')}>All Tutors</button></li>
          <li><button onClick={() => setActiveComponent('all-tuition-centers')}>All Tuition Centers</button></li>
          <li><button onClick={handleLogout} className="logout">LOGOUT</button></li>
        </ul>
      </div>
      <div className="admin-dashboard-right">
        {activeComponent === 'profile' && <UserProfile />}
        {activeComponent === 'all-users' && <div><AllUserList/></div>}
        {activeComponent === 'all-tutors' && <div><AllTutorList/></div>}
        {activeComponent === 'all-tuition-centers' && <div>All Tuition Centers Component</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
