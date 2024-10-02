import React from 'react';

const DisclaimerPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-[#011345] bg-cover bg-center text-white text-center px-8"
      style={{
        backgroundImage: `url('/disclaimer.png')`, // The image path in public folder
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-[#011345]/80 p-8 rounded-md max-w-4xl">
        {/* Disclaimer Title */}
        <h1 className="text-4xl font-bold mb-8">DISCLAIMER !</h1>

        {/* Disclaimer Text */}
        <p className="text-lg mb-6 leading-relaxed">
          A+PRO contains final exams from the past 10 years which have not been
          designated as being "exempt from publication". The publication of
          exams at Africa International University is governed by the Senate
          Policy on Confidential Exams.
        </p>

        <p className="text-lg leading-relaxed">
          The exam papers available in A+PRO are provided to current members of
          the AIU community and are intended to be used by students for study
          purposes. Any other non-authorized use of these exams is not
          permitted.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
