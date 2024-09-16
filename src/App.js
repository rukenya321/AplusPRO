import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [staffStudentId, setStaffStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [schoolCategory, setSchoolCategory] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend for authentication
    console.log('Login attempted with:', {
      staffStudentId,
      password,
      schoolCategory,
    });
    // For now, we'll just navigate to a hypothetical home page
    navigate('/home');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with logo */}
      <div className="w-1/2 bg-navy-blue flex flex-col justify-between p-8">
        <div className="text-white text-6xl font-bold">A+</div>
        <div className="text-white space-x-4">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Disclaimer
          </a>
          <a href="#" className="hover:underline">
            FAQ
          </a>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-8">
          <h2 className="text-3xl font-bold mb-6">Log In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Staff/Student ID"
                value={staffStudentId}
                onChange={(e) => setStaffStudentId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <select
                value={schoolCategory}
                onChange={(e) => setSchoolCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md appearance-none"
                required
              >
                <option value="">School Category</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
