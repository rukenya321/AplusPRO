import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [staffStudentId, setStaffStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [schoolCategory, setSchoolCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
      <div className="w-1/2 bg-navy-900 flex flex-col justify-between p-8">
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
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full px-8">
          <h2 className="text-4xl font-bold mb-8 text-navy-900">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={staffStudentId}
                onChange={(e) => setStaffStudentId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Staff/Student ID"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Password"
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
