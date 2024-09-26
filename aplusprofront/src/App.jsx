import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import LecturerHomepage from './pages/LecturerHomepage';
import StudentHomepage from './pages/StudentHomepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/lecturer-homepage" element={<LecturerHomepage />} />
        <Route path="/student-homepage" element={<StudentHomepage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
