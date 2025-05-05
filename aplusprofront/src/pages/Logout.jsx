import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage items (user_id, role, authToken)
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    localStorage.removeItem('authToken'); // If used

    // Optional: Clear everything in localStorage
    // localStorage.clear();

    // Redirect to login page
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
