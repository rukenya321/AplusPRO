import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#011345] p-4">
      <div className="max-w-4xl bg-[#011345] text-center p-8 rounded-md">
        {/* Disclaimer Title */}
        <h1 className="text-white text-4xl font-bold mb-8">DISCLAIMER !</h1>

        {/* Disclaimer Text */}
        <p className="text-white text-lg mb-6 leading-relaxed">
          A+PRO contains final exams from the past 10 years which have not been
          designated as being "exempt from publication". The publication of
          exams at Africa International University is governed by the Senate
          Policy on Confidential Exams.
        </p>

        <p className="text-white text-lg leading-relaxed">
          The exam papers available in A+PRO are provided to current members of
          the AIU community and are intended to be used by students for study
          purposes. Any other non-authorized use of these exams is not
          permitted.
        </p>
      </div>

      {/* Optional: Background Image or Icon */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20">
        <svg
          className="w-64 h-64 text-[#011345]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* A simple prohibition sign */}
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      </div>
    </div>
  );
};

export default DisclaimerPage;
