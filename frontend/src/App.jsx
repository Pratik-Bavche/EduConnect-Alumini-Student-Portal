import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentProfile from './pages/StudentProfile';
import StaffProfile from './pages/StaffProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
