import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Papers from './pages/Papers';
import Downloads from './pages/Downloads';
import SummaryPRO from './pages/SummaryPRO';
import Logout from './pages/Logout';
import LoginPage from './components/LoginPage';
import About from './components/About';
import Disclaimer from './components/Disclaimer';
import LecHomePage from './pages/LecHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/summary" element={<SummaryPRO />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lec-home" element={<LecHomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </Router>
  );
}

export default App;
