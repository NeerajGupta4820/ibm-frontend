import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/profile.css";
import { toast } from "react-hot-toast";
import { userNotExist } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../redux/api/userApi";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [updatePassword, { isLoadinf, isError, isSuccess, error }] =
    useUpdatePasswordMutation();
  const [changing, setChanging] = useState(false);
  const [formData, setFormData] = useState({
    email: `${user.user.email}`,
    newpassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userNotExist());
    toast.success("User logout successfully");
    navigate("/");
  };
  const handle = () => {
    setChanging(true);
  };
  const handleSubmit = async () => {
    try {
      if (formData.newpassword.length < 8) {
        toast.warning("Password must be at least 8 characters");
        return;
      }
      
      // Log formData to verify email
      console.log("FormData:", formData);
      
      // Create FormData
      const userFormData = new FormData();
      for (const key in formData) {
        userFormData.append(key, formData[key]);
      }
      
      // Log FormData key-value pairs to verify contents
      for (let [key, value] of userFormData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // Update Password API Call
      const response = await updatePassword(userFormData).unwrap();
  
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (user.user === null || user.user == undefined) {
      navigate("/");
    }
  }, []);
  return (
    user.user && (
      <div className="container">
        <div className="profile-container">
          <div>{user && user.user.name}</div>
          <div>{user && user.user.email}</div>

          <button onClick={handle} className="pass">
            ChangePassword
          </button>
        </div>
        <div>
          <button onClick={handleLogout} className="logout">
            LOGOUT
          </button>
        </div>
        {changing && (
          <div className="doing">
            <input
              className="field"
              placeholder="New Password"
              value={formData.newpassword}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  newpassword: e.target.value,
                }))
              }
            />

            <div className="semi">
              <button onClick={handleSubmit} className="done">
                Confirm
              </button>
              <button onClick={() => setChanging(false)} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
