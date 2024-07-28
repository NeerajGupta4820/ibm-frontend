import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from "./components/Footer";
import Signup from './pages/signup';
import { userExist } from './redux/reducers/userReducer';
import UserProfile from './components/profile/UserProfile';
import TuitionCenterProfile from './components/profile/TuitionCenterProfile';
import TutorProfile from './components/profile/TutorProfile';
import AdminDashboard from './components/profile/AdminDashboard';
import Payments from './pages/Payments';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(userExist({ user, token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header/>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/tutor-profile" element={<TutorProfile />} />
          <Route path="/tuition-center-profile" element={<TuitionCenterProfile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path='/payments' element={<Payments/>}/>
        </Routes>
      </div>   
      <Footer/>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
