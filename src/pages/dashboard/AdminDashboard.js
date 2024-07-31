import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../../components/dashboard/UserProfile";
import "../../style/dashboard/admindashboard.css";
import AllUserList from "../../components/dashboard/AllUserList";
import { userNotExist } from "../../redux/reducers/userReducer";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CiSliderVertical } from "react-icons/ci";
import AllTutorList from "../../components/dashboard/AllTutorList";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import AllTutionCenterList from "../../components/dashboard/AllTutionCenterList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenu, setMobileMenu] = useState(false);
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
          <li>
            <button onClick={() => setActiveComponent("profile")}>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("all-users")}>
              All Users
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("all-tutors")}>
              All Tutors
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("all-tuition-centers")}>
              All Tuition Centers
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="logout">
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
      <div className="tempo"><button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? <FaTimes /> : <CiSliderVertical />}
      </button></div>
      {mobileMenu && (
        <>
          <div className="ioverlay" onClick={() => setMobileMenu(false)}></div>
          <div className="imobile-menu">
            <Link
              onClick={() => {
                setMobileMenu(false);
                setActiveComponent("profile");
              }}
            >
              Profile
            </Link>
            <Link
              onClick={() => {
                setMobileMenu(false);
                setActiveComponent("all-users");
              }}
            >
              All Users
            </Link>
            <Link
              onClick={() => {
                setMobileMenu(false);
                setActiveComponent("all-tutors");
              }}
            >
              All Tutors
            </Link>
            <Link
              onClick={() => {
                setMobileMenu(false);
                setActiveComponent("all-tuition-centers");
              }}
            >
              Tuition Centers
            </Link>
            <Link
              onClick={() => {
                setMobileMenu(false);
                handleLogout();
              }}
            >
              Logout
            </Link>
          </div>
        </>
      )}
      <div className="admin-dashboard-right">
        {activeComponent === "profile" && <UserProfile />}
        {activeComponent === "all-users" && (
          <div>
            <AllUserList />
          </div>
        )}
        {activeComponent === "all-tutors" && (
          <div>
            <AllTutorList />
          </div>
        )}
        {activeComponent === "all-tuition-centers" && (
          <div><AllTutionCenterList/></div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
