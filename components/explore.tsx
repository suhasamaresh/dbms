"use client";
import React, { useState } from 'react';

const Explore = () => {
  const [currentEvent, setCurrentEvent] = useState(0);

  const events = [
    {
      id: 1,
      title: 'Event 1',
      description: 'Description of Event 1',
      date: '2024-05-01',
      location: 'Location 1',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Event 2',
      description: 'Description of Event 2',
      date: '2024-05-10',
      location: 'Location 2',
      imageUrl: 'https://example.com/image2.jpg',
    },
    {
      id: 3,
      title: 'Event 3',
      description: 'Description of Event 3',
      date: '2024-05-15',
      location: 'Location 3',
      imageUrl: 'https://example.com/image3.jpg',
    },
    {
      id: 4,
      title: 'Event 4',
      description: 'Description of Event 4',
      date: '2024-05-20',
      location: 'Location 4',
      imageUrl: 'https://example.com/image4.jpg',
    },
    {
      id: 5,
      title: 'Event 5',
      description: 'Description of Event 5',
      date: '2024-05-25',
      location: 'Location 5',
      imageUrl: 'https://example.com/image5.jpg',
    },
  ];

  const showNextEvent = () => {
    setCurrentEvent((prevEvent) => (prevEvent === events.length - 1 ? 0 : prevEvent + 1));
  };

  const showPrevEvent = () => {
    setCurrentEvent((prevEvent) => (prevEvent === 0 ? events.length - 1 : prevEvent - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h2 className="text-3xl font-bold mb-4 text-white font-mono">Featured Events</h2>
      <div className="max-w-4xl w-full">
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <img src={events[currentEvent].imageUrl} alt={events[currentEvent].title} className="w-full font-mono h-80 object-cover rounded-lg" />
          <div className="p-4">
            <h3 className="text-xl font-semibold font-mono text-white">{events[currentEvent].title}</h3>
            <p className="text-gray-400 font-mono mb-2">{events[currentEvent].description}</p>
            <p className="text-gray-400 font-mono mb-2">Date: {events[currentEvent].date}</p>
            <p className="text-gray-400 font-mono">Location: {events[currentEvent].location}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex  space-x-4">
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={showPrevEvent}
        >
          &#10094;
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={showNextEvent}
        >
           &#10095;
        </button>
      </div>
    </div>
  );
};

export default Explore;