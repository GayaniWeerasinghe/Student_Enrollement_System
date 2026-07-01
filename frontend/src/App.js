import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AllStudents from './components/AllStudents';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AllCourses from './components/AllCourses';
import Enrollment from './components/Enrollment';
import AllBatches from './components/AllBatches';

function Layout() {

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      {!isLoginPage && !isRegisterPage && <Navbar />}
      {!isLoginPage && !isRegisterPage && <Sidebar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/batches" element={<AllBatches />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/enrollment" element={<Enrollment />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;