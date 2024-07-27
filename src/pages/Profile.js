import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/profile.css";
import { toast } from "react-hot-toast";
import { userNotExist } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [changing, setChanging] = useState(false);
  const [pass,setPass] = useState("");
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
  const handleSubmit = ()=>{
    try {
        if(pass.length < 8){
            toast.warning("Password must be at least 8 characters");
            return ;
        }

        
    } catch (error) {
        
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
            <input className="field" placeholder="New Password" value={pass} onChange={(e)=>setPass(e.target.value)}></input>

            <div className="semi">
              <button onClick={handleSubmit} className="done">
                Confirm
              </button>
              <button onClick={()=>setChanging(false)} className="cancel">
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