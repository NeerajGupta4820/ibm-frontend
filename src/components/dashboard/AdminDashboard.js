import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";
import "../../style/admind.css";


const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      {console.log(user)}
      <div></div>
      <button onClick={handleLogout} className="logout">
            LOGOUT
          </button>
    </div>
  );
};

export default AdminDashboard;
