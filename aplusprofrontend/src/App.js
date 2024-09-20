import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import AdminDashboard from './pages/AdminDashboard'; // Example: Import AdminDashboard
import StaffDashboard from './pages/StaffDashboard'; // Example: Import StaffDashboard
import StudentDashboard from './pages/StudentDashboard'; // Example: Import StudentDashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/" element={<LoginPage />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;
