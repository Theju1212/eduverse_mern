// ✅ src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OtpFormRegistrationpage from './pages/Otpformpage';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpFormRegistrationpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Protected Routes */}
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
