import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/userApi'; 
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/userReducer'; 
import '../style/login.css'; 

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
      // Check if response and data are defined
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Store token in localStorage
        dispatch(userExist({ user: response.user, token: response.token }));
        navigate('/');
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error.message || 'An error occurred'}</p>}
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
  );
};

export default LoginPage;
