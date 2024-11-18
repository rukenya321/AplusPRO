import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoHomeOutline } from 'react-icons/io5';
import { BsFileEarmarkText, BsPeople } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { AiOutlineDatabase, AiOutlineSetting } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import logo from '../logo.png';

const AdminPage = () => {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Home');
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem('authToken'); // Example for clearing token

    // Redirect to the login page
    navigate('/logout');
  };

  const menus = [
    {
      name: 'Home',
      icon: IoHomeOutline,
      subMenus: [{ name: 'SummaryPRO', link: '/summary' }],
    },
    {
      name: 'User Management',
      icon: BsPeople,
      subMenus: [
        { name: 'View Users', link: '/view-users' },
        { name: 'Add User', link: '/add-user' },
        { name: 'Manage Roles', link: '/manage-roles' },
      ],
    },
    {
      name: 'Resource Management',
      icon: BsFileEarmarkText,
      subMenus: [
        { name: 'View Resources', link: '/view-resources' },
        { name: 'Approve Uploads', link: '/approve-uploads' },
        { name: 'Flagged Content', link: '/flagged-content' },
      ],
    },
    {
      name: 'Analytics & Reports',
      icon: AiOutlineDatabase,
      subMenus: [
        { name: 'Usage Analytics', link: '/usage-analytics' },
        { name: 'Upload Statistics', link: '/upload-statistics' },
        { name: 'Download Statistics', link: '/download-statistics' },
      ],
    },
    {
      name: 'System Settings',
      icon: AiOutlineSetting,
      subMenus: [
        { name: 'Permissions & Access', link: '/permissions' },
        { name: 'Customization', link: '/customization' },
        { name: 'Backup & Maintenance', link: '/maintenance' },
      ],
    },
    {
      name: 'Logout',
      icon: CiLogout,
      onClick: handleLogout, // Attach the logout function here
    },
  ];

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    setOpen(true);
  };

  return (
    <section className="flex gap-6">
      {/* Sidebar */}
      <div
        className={`bg-[#011345] min-h-screen ${open ? 'w-60' : 'w-16'} duration-500 text-gray-100 px-4 flex flex-col justify-between`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center mt-4 mb-4">
          <img src={logo} alt="Logo" className="w-16 h-auto" />
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="mt-4 flex flex-col gap-4">
            {menus.map((menu, index) => (
              <div key={index}>
                <div
                  className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md cursor-pointer"
                  onClick={() =>
                    menu.onClick
                      ? menu.onClick()
                      : handleSectionClick(menu.name)
                  }
                >
                  <div>{React.createElement(menu.icon, { size: '20' })}</div>
                  <h2
                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
                  >
                    {menu.name}
                  </h2>
                </div>
                {menu.subMenus && activeSection === menu.name && (
                  <div className="ml-8 mt-2">
                    {menu.subMenus.map((subMenu, i) => (
                      <Link
                        to={subMenu.link}
                        key={i}
                        className="flex items-center text-sm gap-3 p-2 text-gray-300 hover:bg-gray-500 rounded-md"
                      >
                        {subMenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Dashboard Header */}
        <div className="p-4 bg-gradient-to-r from-[#011345] to-indigo-700 text-white rounded-lg shadow mb-10">
          <h1 className="text-2xl font-semibold">Welcome Back, RMJ! 👋</h1>
          <p className="text-sm mt-4">SummaryPRO Subs!</p>
          <div className="flex space-x-4 mt-4">
            <div className="bg-[#2ba207] p-4 rounded-md text-center">
              <p className="text-xs">Active Subscribers</p>
              <h2 className="text-xl font-bold">0</h2>
            </div>
            <div className="bg-gray-600 p-4 rounded-md text-center">
              <p className="text-xs">Pending Proposals</p>
              <h2 className="text-xl font-bold">0</h2>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
            <p className="text-[#011345]">Total Users</p>
            <p className="text-xl font-bold">150</p>
          </div>
          <div className="bg-green-200 p-4 rounded-lg shadow-md text-center">
            <p className="text-[#011345]">Total Resources</p>
            <p className="text-xl font-bold">300</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg shadow-md text-center">
            <p className="text-[#011345]">Recent Activity</p>
            <p className="text-xl font-bold">25</p>
          </div>
          <div className="bg-red-200 p-4 rounded-lg shadow-md text-center">
            <p className="text-[#011345]">Most Accessed Resources</p>
            <p className="text-xl font-bold">50</p>
          </div>
        </div>

        {/* Dynamic Content Based on Selected Section */}
        <section>
          {activeSection === 'Home' && (
            <div>
              <h2 className="text-[#011345] font-semibold mb-4">SummaryPRO</h2>
              <p className="text-[#011345]">
                Welcome to the Admin Dashboard! Here you can view and manage
                various aspects of the system.
              </p>
            </div>
          )}
          {/* Add additional sections as needed */}
        </section>
      </main>
    </section>
  );
};

export default AdminPage;
