import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RecentUploads = () => {
  // Simulated data
  const papers = [
    {
      name: 'Stride Modelling',
      date: 'February 20, 2024',
      type: 'PDF File',
      size: '32KB',
    },
    {
      name: 'Software Testing',
      date: 'February 13, 2024',
      type: 'PDF File',
      size: '1 MB',
    },
    {
      name: 'Mobile Programming',
      date: 'February 10, 2024',
      type: 'PDF File',
      size: '64KB',
    },
    {
      name: 'OOP I',
      date: 'February 2, 2024',
      type: 'PDF File',
      size: '128 KB',
    },
    {
      name: 'Research Methods',
      date: 'November 11, 2023',
      type: 'PDF File',
      size: '88 KB',
    },
    {
      name: 'Intro to AI',
      date: 'September 5, 2023',
      type: 'PDF File',
      size: '573 KB',
    },
    {
      name: 'Database Systems',
      date: 'March 18, 2023',
      type: 'PDF File',
      size: '455 KB',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back button and title */}
      <div className="flex items-center mb-8">
        <Link to="/recentuploads">
          <button className="flex items-center space-x-2 text-white bg-navy-custom px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            <FaArrowLeft className="text-xl" />
            <span>Recent Uploads</span>
          </button>
        </Link>
      </div>

      {/* Papers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-4 px-6">Name</th>
              <th className="text-left py-4 px-6">Date Modified</th>
              <th className="text-left py-4 px-6">Type</th>
              <th className="text-left py-4 px-6">Size</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-6">{paper.name}</td>
                <td className="py-4 px-6">{paper.date}</td>
                <td className="py-4 px-6">{paper.type}</td>
                <td className="py-4 px-6">{paper.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUploads;
