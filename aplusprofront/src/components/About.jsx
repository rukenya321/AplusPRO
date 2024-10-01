import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-3xl bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-[#011345]">About A+PRO</h1>
        <p className="text-gray-700 leading-7 mb-4">
          A+PRO is a comprehensive exam storage system designed for university
          students and lecturers. It allows students to access past exam papers,
          and lecturers can upload their exam content in an efficient manner.
          The platform is built to streamline the management and access of
          academic resources, helping both students and educators by providing
          quick access to relevant information.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-[#011345]">
          Key Features
        </h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>
            Easy access to past exam papers categorized by course and semester.
          </li>
          <li>Upload functionality for lecturers to contribute new papers.</li>
          <li>Responsive design for both desktop and mobile platforms.</li>
          <li>Secure login system for students and administrators.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2 text-[#011345]">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-7 mb-4">
          Our mission is to provide a reliable and user-friendly platform for
          managing and accessing academic resources, helping students excel in
          their studies and lecturers manage content efficiently.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
