import React, { useState } from 'react';

const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 mx-auto text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const FileUpload = ({ darkMode = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      // Simulating upload process
      setTimeout(() => setIsUploading(false), 3000);
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';

  return (
    <div
      className={`p-6 ${bgColor} ${textColor} min-h-screen flex items-center justify-center`}
    >
      <div className="w-full max-w-md">
        <div
          className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center`}
        >
          <CloudIcon />
          <h2 className="mt-2 text-lg font-semibold">
            Click to upload or drag & drop file(s)
          </h2>
          <p className="mt-1 text-sm">Max. file size 25 MB</p>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            Select File
          </label>
        </div>

        {fileName && (
          <div className="mt-4">
            <div className="bg-blue-500 rounded-full h-4 relative overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-1000 ease-out"
                style={{ width: isUploading ? '100%' : '0%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">{fileName}</span>
              <span className="text-sm">
                {isUploading ? 'UPLOADING' : 'UPLOADED'}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
