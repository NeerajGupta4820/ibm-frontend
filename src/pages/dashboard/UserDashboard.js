import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";
import UserProfile from '../../components/dashboard/UserProfile'; 
import Watchlist from '../../components/dashboard/WatchList'; 
import "../../style/dashboard/userdasboard.css";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState('profile');

  React.useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
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
    <div className="user-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-left">
          <h1>user Dashboard</h1>
          <ul className="dashboard-menu">
            <li><button onClick={() => setActiveComponent('profile')}>Profile</button></li>
            <li><button onClick={() => setActiveComponent('watchlist')}>Watchlist</button></li>
            <li><button onClick={handleLogout} className="logout">LOGOUT</button></li>
          </ul>
        </div>
        <div className="dashboard-right">
          {activeComponent === 'profile' && <UserProfile />}
          {activeComponent === 'watchlist' && <Watchlist />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
