"use client"
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeout: NodeJS.Timeout | null = null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#222222] fixed top-0 w-full mb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left part of the navbar */}
          <div className="flex-shrink-0 flex items-center">
            {/* Logo */}
            <img className="h-8 w-auto" src="/next.svg" alt="Logo" />
            {/* Navigation links */}
            <div className="hidden md:block">
              <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Explore</a>
              <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Problems</a>
              <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Discuss</a>
            </div>
          </div>
          {/* Right part of the navbar */}
          <div className="hidden md:block">
            <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
          </div>
          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button type="button" onClick={toggleMenu} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* Icon for mobile menu */}
              <svg className={`${isOpen? 'hidden': 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile navigation links */}
          <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Explore</a>
          <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">POTD</a>
          <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Contest</a>
          <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Discuss</a>
          <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
