import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";

const UserDashboard
 = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  const { name, email, photo, role, profileInfo } = user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userNotExist());
    toast.success("User logout successfully");
    navigate("/");
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={photo} alt={name} className="profile-photo" />
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{role}</p>
      </div>
      <div className="user-details">
        <FaUser size={50} />
        <p>Welcome, {name}! You are registered as a {role}.</p>
        <p><strong>Profile Info:</strong> {profileInfo}</p>
        <button onClick={handleLogout} className="logout">
            LOGOUT
          </button>
      </div>
    </div>
  );
};

export default UserDashboard
;
