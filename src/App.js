import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from "./components/Footer";
// import Signup from './pages/signup';
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header/>
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />
      </Routes>
      </div>   
      <Footer/>
    </Router>
  );
}

export default App;
