"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Vortex } from "@/components/vortex";

export default function VortexDemo() {
  const [eventType, setEventType] = useState("All");
  const [sortType, setSortType] = useState("Latest");
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(6);

  // Function to fetch events from the API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events");
        if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          console.error("Invalid events data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  // Function to handle event type dropdown change
  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  // Function to handle sorting dropdown change
  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  // Function to handle "See more" button click
  const handleSeeMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6);
  };

  return (
    <div className="w-full mx-auto min-h-screen overflow-hidden bg-black text-white mt-16">
      <Vortex
        backgroundColor="black"
        className="flex flex-col shrink items-center justify-center"
      >
        <div className="w-full mx-auto h-[21rem] mt-16 overflow-hidden">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Heading */}
            <h2 className="text-[#C0C0C0] text-2xl md:text-6xl font-mono text-center pt-10">
              Events and Webinars
            </h2>
            <p className="text-white text-sm md:text-xl max-w-xl mt-6 text-center font-mono">
              Connect with experts, both online and in-person, and gain valuable
              insights.
            </p>
            {/* View Events Button */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
              <button
                type="submit"
                className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
              >
                <span className="flex items-center space-x-5 ">
                  <span className="text-gray-100 font-semibold font-mono">
                    View Events
                  </span>
                </span>
              </button>
            </div>
            {/* Event Filters */}
          </div>
        </div>
        {/* Event Cards */}
        <div className="flex items-center justify-center space-x-6">
          {/* Event Type Dropdown */}
          <select
            className="bg-black text-white px-3 py-2 rounded-md"
            value={eventType}
            onChange={handleEventTypeChange}
          >
            <option value="All">All</option>
            <option value="In-person">In-person</option>
            <option value="Online Webinar">Online Webinar</option>
          </select>
          {/* Sorting Dropdown */}
          <select
            className="bg-black text-white px-3 py-2 rounded-md"
            value={sortType}
            onChange={handleSortTypeChange}
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {events
            .filter((event) => eventType === "All" || event.type === eventType)
            .sort((a, b) =>
              sortType === "Latest"
                ? new Date(b.deadline) - new Date(a.deadline)
                : new Date(a.deadline) - new Date(b.deadline)
            )
            .slice(0, visibleEvents)
            .map((event) => (
              <div key={event.id} className="bg-white rounded-md p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  Deadline: {event.Deadline}
                </p>
                <p className="text-sm text-gray-600">
                  Description: {event.description}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {event.location}
                </p>
              </div>
            ))}
        </div>
        {/* See More Button */}
        {visibleEvents < events.length && (
          <button
            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            onClick={handleSeeMore}
          >
            See More
          </button>
        )}
      </Vortex>
    </div>
  );
}
