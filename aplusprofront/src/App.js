import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Papers from './pages/Papers';
import Downloads from './pages/Downloads';
import SummaryPro from './pages/SummaryPro';
import Logout from './pages/Logout';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/summary" element={<SummaryPro />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
