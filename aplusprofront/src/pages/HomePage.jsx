import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoHomeOutline } from 'react-icons/io5';
import { GiPapers } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';

const HomePage = () => {
  const menus = [
    { name: 'Home', link: '/', icon: IoHomeOutline },
    { name: 'Papers', link: '/', icon: GiPapers },
    { name: 'Downloads', link: '/', icon: GoDownload },
    { name: 'SummaryPRO', link: '/', icon: BsFileEarmarkText },
    { name: 'Logout', link: '/', icon: CiLogout },
  ];
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      {/* Sidebar */}
      <div
        className={`bg-[#011345] min-h-screen ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <img
            src="/path-to-your-logo.svg" // Replace with your logo path
            alt="Logo"
            className="w-20 h-auto mb-8"
          />
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-1/2">
            <AiOutlineSearch className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Search for Exams..."
              className="ml-4 outline-none w-full"
            />
          </div>
          <AiOutlineSetting className="text-3xl text-gray-500" />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-200 rounded-lg shadow-md h-40 flex items-center justify-center">
            <p className="text-gray-400">Content #1</p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-md h-40 flex items-center justify-center">
            <p className="text-gray-400">Content #2</p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-md h-40 flex items-center justify-center">
            <p className="text-gray-400">Content #3</p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-md h-40 flex items-center justify-center">
            <p className="text-gray-400">Content #4</p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HomePage;
