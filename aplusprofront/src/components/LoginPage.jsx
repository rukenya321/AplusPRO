import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg';

const LoginPage = () => {
  const [staffStudentId, setStaffStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate backend role-based authentication (you'll replace this with an API call)
    if (role === 'admin') {
      console.log('Admin login:', { staffStudentId, password });
      // Redirect to admin homepage (assuming Admin homepage is /admin-dashboard)
      navigate('/admin-dashboard');
    } else if (role === 'staff') {
      console.log('Lecturer login:', { staffStudentId, password });
      // Redirect to lecturer (staff) homepage
      navigate('/lecturer-homepage'); // Change this route as needed
    } else if (role === 'student') {
      console.log('Student login:', { staffStudentId, password });
      // Redirect to student homepage
      navigate('/student-homepage'); // Change this route as needed
    } else {
      console.error('Invalid role selected');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with logo */}
      <div className="w-1/2 bg-navy-custom flex flex-col justify-between p-8">
        <div className="flex-grow flex items-center justify-center">
          <img src={logo} alt="A+PRO Logo" className="w-64 h-auto" />
        </div>
        <div className="text-white space-x-4 mt-6 flex justify-center">
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
              <label htmlFor="role" className="block mb-2">
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="student">Student</option>
                <option value="staff">Lecturer</option>
                <option value="admin">Admin</option>
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