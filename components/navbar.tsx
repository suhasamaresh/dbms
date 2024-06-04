"use client";
import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 fixed top-0 w-full transition-transform translate-y-0" style={{ zIndex: 50 }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 w-auto" src="/dbmslogo.jpg" alt="Logo" />
            <div className="hidden md:block">
              <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Explore</a>
              <a href="/blogs" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Blogs</a>
              <a href="/events" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Events</a>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {session ? (
              <a href="/dashboard" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            ) : (
              <button onClick={() => signIn()} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-2000 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Explore</a>
          <a href="/blogs" className="text-white block px-3 py-2 rounded-md text-base font-medium">Blogs</a>
          <a href="/events" className="text-white block px-3 py-2 rounded-md text-base font-medium">Events</a>
          <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Discuss</a>
          {session && <a href="/dashboard" className="text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
