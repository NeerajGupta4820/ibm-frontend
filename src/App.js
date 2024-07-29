import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { userExist } from './redux/reducers/userReducer';
/*******************pages*******************************/
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from "./components/Footer";
import Signup from './pages/signup';
import Payments from './pages/Payments';
import TutorList from './pages/list/TutorList';
import TuitionCenterList from './pages/list/TuitionCenterList';
/***********************************components */
import Header from './components/Header';
import UserDashboard from './components/dashboard/UserDashboard';
import TuitionCenterDashboard from './components/dashboard/TuitionCenterDashboard';
import TutorDashboard from './components/dashboard/TutorDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TutorProfile from './components/profile/TutorProfile';
import TuitionCenterProfile from './components/profile/TuitionCenterProfile';

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
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/tuition-center-dashboard" element={<TuitionCenterDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/tuition-center/:id" element={<TuitionCenterProfile />} />
          <Route path="/tuition-center/:id" element={<TuitionCenterProfile />} />
          <Route path="/all-tutors" element={<TutorList />} />
          <Route path="/all-tuition-centers" element={<TuitionCenterList />} />
          <Route path='/payments' element={<Payments/>}/>
        </Routes>
      </div>   
      <Footer/>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
