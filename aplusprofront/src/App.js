import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Papers from './pages/Papers';
import NewPaper from './pages/NewPaper';
import RecentUploads from './pages/RecentUploads';
import Downloads from './pages/Downloads';
import SummaryPRO from './pages/SummaryPRO';
import Logout from './pages/Logout';
import LoginPage from './components/LoginPage';
import About from './components/About';
import Disclaimer from './components/Disclaimer';
import LecHomePage from './pages/LecHomePage';
import AdminHomePage from './pages/AdminHomePage';

function App() {
  return (
    <Router basename="/AplusPRO">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/newpaper" element={<NewPaper />} />
        <Route path="/recentuploads" element={<RecentUploads />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/summary" element={<SummaryPRO />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/lec-home" element={<LecHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </Router>
  );
}

export default App;
