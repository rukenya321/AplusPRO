import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoHomeOutline } from 'react-icons/io5';
import { GiPapers } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; // Adjust based on the exact path of the SVG

const LecHomePage = () => {
  const menus = [
    { name: 'Home', link: '/', icon: IoHomeOutline },
    { name: 'Recent Uploads', link: '/uploads', icon: GiPapers },
    { name: 'Upload a new paper', link: '/newpaper', icon: GoDownload },
    { name: 'SummaryPRO', link: '/summary', icon: BsFileEarmarkText },
    { name: 'Logout', link: '/logout', icon: CiLogout },
  ];

  const [open, setOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <section className="flex gap-6">
      {/* Sidebar */}
      <div
        className={`bg-[#011345] min-h-screen ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4 flex flex-col justify-between`}
      >
        {/* Menu Toggle Button */}
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center mt-4 mb-4">
          <img src={logo} alt="Logo" className="w-16 h-auto" />{' '}
          {/* Increased logo size */}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus.slice(0, -1).map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
              >
                <div>{React.createElement(menu.icon, { size: '20' })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && 'hidden'
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout Link - Pushed to Bottom */}
        <div className="mt-auto mb-4">
          <Link
            to={menus[menus.length - 1]?.link}
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md"
          >
            <div>
              {React.createElement(menus[menus.length - 1]?.icon, {
                size: '20',
              })}
            </div>
            <h2
              className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
            >
              {menus[menus.length - 1]?.name}
            </h2>
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menus[menus.length - 1]?.name}
            </h2>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-1/2">
            <AiOutlineSearch className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Search for Exams..."
              className="ml-4 outline-none w-full"
            />
            <div className="relative">
              <AiOutlineFilter
                className="text-gray-400 text-2xl cursor-pointer ml-4"
                onClick={toggleFilters}
              />
              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg py-2 w-40 z-10">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Year
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Semester
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Course
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Unit
                  </div>
                </div>
              )}
            </div>
          </div>
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

export default LecHomePage;
