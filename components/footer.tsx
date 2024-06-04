"use client"
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/newsletter', { email });
      if (response.status === 200 || response.status === 201) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      setError('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 md:py-16 lg:pl-24 lg:pr-24 pl-4 pr-4 font-mono">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-green-500">About Us</h3>
          <p>
            We are a team dedicated to providing the best blogging and events experience.
          </p>
          <a href="#" className="text-green-500 hover:text-green-400">
            Learn More
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-green-500">Newsletter</h3>
          <p>Subscribe to our newsletter for updates and exclusive content.</p>
          {subscribed ? (
            <p className="text-green-500">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your valid email"
                  className={`flex-1 bg-gray-800 border-none rounded-l-md px-4 py-2 focus:outline-none ${emailError ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-green-500 hover:bg-green-400 text-white rounded-r-md px-4 py-2" type="submit">
                  Subscribe
                </button>
              </div>
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </form>
          )}
        </div>

        <div className="space-y-4 lg:pl-24 pl-2">
          <h3 className="text-lg font-bold text-green-500">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-green-500 hover:text-green-400 text-2xl"><FaFacebookF /></a>
            <a href="#" className="text-green-500 hover:text-green-400 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-green-500 hover:text-green-400 text-2xl"><FaInstagram /></a>
            <a href="#" className="text-green-500 hover:text-green-400 text-2xl"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 md:mt-12 text-center">
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-green-500 hover:text-green-400">Explore</a>
          <a href="/" className="text-green-500 hover:text-green-400">Home</a>
          <a href="/blogs" className="text-green-500 hover:text-green-400">Blogs</a>
          <a href="/events" className="text-green-500 hover:text-green-400">Events</a>
          <a href="/" className="text-green-500 hover:text-green-400">About</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">GitHub</a>
        </div>
        <p>&copy; 2024 Blogging and Events. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
