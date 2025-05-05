import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const studentId = localStorage.getItem('userId'); // Retrieve student ID
    fetch(`http://localhost:8080/downloads?student_id=${studentId}`)
      .then((res) => res.json())
      .then((data) => setDownloads(data))
      .catch((err) => console.error('Failed to fetch downloads:', err));
  }, []);

  const toggleSelect = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const downloadFile = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop(); // Use file name from URL
    link.click();
  };

  const downloadSelected = () => {
    const selected = downloads.filter((d) => selectedFiles.includes(d.id));
    selected.forEach((file) => downloadFile(file.file_url));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back button and title */}
      <div className="flex items-center mb-8">
        <Link to="/home">
          <button className="flex items-center space-x-2 text-white bg-navy-custom px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
          </button>
        </Link>
      </div>

      {/* Download Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-4 px-6">Select</th>
              <th className="text-left py-4 px-6">Unit Name</th>
              <th className="text-left py-4 px-6">Downloaded At</th>
              <th className="text-left py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((file) => (
              <tr key={file.id} className="border-t">
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleSelect(file.id)}
                  />
                </td>
                <td className="py-4 px-6">{file.unit_name}</td>
                <td className="py-4 px-6">
                  {new Date(file.downloaded_at).toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => downloadFile(file.file_url)}
                    className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Selected Button */}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <button
            onClick={downloadSelected}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Selected Files
          </button>
        </div>
      )}
    </div>
  );
};

export default Downloads;
