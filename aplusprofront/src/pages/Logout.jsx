import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session or token
    localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
