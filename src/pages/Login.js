import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/userApi'; 
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/userReducer'; 
import {toast} from "react-hot-toast"
import {Link} from "react-router-dom"
import '../style/login.css'; 
import img from "../assets/login/img.webp"

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user)); 
        dispatch(userExist({ user: response.user, token: response.token }));
        toast.success("Logged In");
        navigate('/');
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  return (
    <div className="login-page">
    <div className="main-container">
      <div className="login-container">
      <div className="login-image">
        <img src={img} alt="login " />
      </div>
      <div className='login-content'>
        <h1>Login</h1>
      {error && toast.error("Error Occured")}
      {isSuccess && <p className="success">Login successful!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
