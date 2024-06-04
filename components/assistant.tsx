"use client";
import React, { useState } from 'react';
import { MdOutlineMail } from 'react-icons/md'; // Import the MdOutlineMail icon component
import { AiOutlineClose } from 'react-icons/ai'; // Import the AiOutlineClose icon component

const Page = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="flex flex-col bg-gray-100 relative"> {/* Add relative position here */}
      {showChat ? (
        <div className="flex justify-end">
          <button
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center z-50" // Add z-index
            onClick={toggleChat}
          >
            <AiOutlineClose className="w-6 h-6" /> {/* Use the AiOutlineClose icon */}
          </button>
        </div>
      ) : (
        <button
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center z-50" // Add z-index
          onClick={toggleChat}
        >
          <MdOutlineMail className="w-6 h-6" /> {/* Use the MdOutlineMail icon */}
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-16 right-8 w-80 bg-white rounded-lg shadow-md mb-10 z-50"> {/* Add z-index */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>
          <div className="p-4 h-48 overflow-y-auto">
            <p>Hello! How can I assist you today?</p>
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none"
            />
            <button className="bg-blue-500 text-white rounded-md px-2 py-2 ml-2">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
