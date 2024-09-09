import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend
    // For now, we'll just do some basic validation
    if (!regNumber || !password) {
      setError('Please fill in all fields');
    } else {
      // Determine user type based on reg number
      let userType = 'student';
      if (regNumber.toLowerCase().includes('lec')) {
        userType = 'lecturer';
      } else if (regNumber.toLowerCase().includes('admin')) {
        userType = 'admin';
      }
      console.log(`Logging in as ${userType} with reg number: ${regNumber}`);
      // Here you would handle the login logic
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to A+PRO</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="regNumber">
                Registration Number
              </label>
              <input
                type="text"
                placeholder="Enter your registration number"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="regNumber"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Continue
              </button>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
