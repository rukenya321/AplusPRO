import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const LoginPage = () => {
  const [staffStudentId, setStaffStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: staffStudentId,
          password: password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        const jsonData = JSON.parse(data);
        console.log('Login success:', jsonData);

        // ✅ Save login info in localStorage
        localStorage.setItem('userID', staffStudentId); // Save user_id
        localStorage.setItem('role', jsonData.role); // Save role

        if (jsonData.role === 'student') {
          // ✅ Additionally store courseCode if student
          localStorage.setItem('courseCode', jsonData.course);
        }

        // Redirect based on backend role
        if (jsonData.role === 'admin') {
          navigate('/admin-home');
        } else if (jsonData.role === 'lecturer') {
          navigate('/lec-home');
        } else if (jsonData.role === 'student') {
          navigate('/home');
        } else {
          console.error('Unknown role:', jsonData.role);
        }
      } else {
        setErrorMsg(data);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with logo */}
      <div className="w-1/2 bg-navy-custom flex flex-col justify-between p-8">
        <div className="flex-grow flex items-center justify-center">
          <img src={logo} alt="A+PRO Logo" className="w-60 h-auto" />
        </div>
        <div className="text-white space-x-4 mt-6 flex justify-center">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/disclaimer" className="hover:underline">
            Disclaimer
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

            {errorMsg && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}

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
