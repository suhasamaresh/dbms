"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  description: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events.slice(0, 6)); // Limit to the first 6 events
        } else {
          console.error("Data is not in the expected format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black px-6 py-6 text-gray-300 font-mono">
      <div className="md:flex md:px-20 items-center">
        <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
          <h1 className="text-xl font-bold mb-4 text-green-500">Some of the Recent Events</h1>
          <p>This section can contain additional text or information related to the recent events.<br />
          It takes up half of the screen width.<br />
          Here, you can add more details, summaries, or descriptions about the events listed on the right.</p>
          <Link href={"/events"}>
            <div className="relative group mt-7 w-[159px]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#08f] to-[#4DFFF9] blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
              <button
                type="submit"
                className="relative px-2 py-2 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
              >
                <span className="flex items-center space-x-5">
                  <span className="text-gray-100 pr-10 pl-10  font-mono">Explore</span>
                </span>
              </button>
            </div>
          </Link>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:pl-8">
          {events.map(event => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="text-center border border-gray-700 hover:border-blue-800 card rounded-lg">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
                  <h2 className="text-lg font-semibold text-green-500">{event.title}</h2>
                  <p className="mt-2">{event.description.length > 50 ? `${event.description.slice(0, 50)}...` : event.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
