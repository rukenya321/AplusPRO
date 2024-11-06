import React from 'react';

const SummaryPROLaunch = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Main Content Container */}
      <div className="text-center space-y-4">
        {/* LAUNCHING SOON! */}
        <h1 className="text-6xl font-bold text-[#011345] drop-shadow-lg shadow-[#0A2451]">
          LAUNCHING SOON!
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#0A2451] italic">“Read Less, Grasp More”</p>

        {/* With SummaryPRO */}
        <p className="text-lg font-semibold text-[#0A2451]">With</p>

        {/* Button */}
        <button className="bg-[#1481E4] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#126FC1]">
          SummaryPRO
        </button>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-10 left-5 bg-[#071B49] w-48 h-24 rounded-full rotate-45"></div>
      <div className="absolute bottom-10 right-5 bg-[#1481E4] w-48 h-24 rounded-full rotate-45"></div>
    </div>
  );
};

export default SummaryPROLaunch;
