"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Event {
  Online: any;
  id: string;
  title: string;
  date: string;
  description: string;
  attendees: number;
  sponsors: number;
  author: string;
  isOnline: boolean;
}

interface TrendingEvent {
  id: string;
  title: string;
  thumbnail: string;
  attendees: number;
  sponsors: number;
  isOnline: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  thumbnail: string;
  image: string; // New property for the image
}

interface Challenge {
  id: string;
  title: string;
  thumbnail: string;
  image: string; // New property for the image
}

const FeedPage = () => {
  const [activeTab, setActiveTab] = useState<"personalized" | "features">(
    "personalized"
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [data, setData] = useState<any[]>([]); // Changed data to blogs
  const [visibleEvents, setVisibleEvents] = useState<number>(6); // New state for visible events

  const handleShowMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6); // Increment visible events count by 6
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setData(data);
        setEvents(data.events || []); // Check if data.events exists, otherwise initialize as empty array
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const trendingEvents: TrendingEvent[] = [
    {
      id: "1",
      title: "The Future of Web Development",
      thumbnail: "https://example.com/trending-event-1.jpg",
      attendees: 2345,
      sponsors: 10,
      isOnline: true,
    },
    {
      id: "2",
      title: "Mastering Serverless Architecture",
      thumbnail: "https://example.com/trending-event-2.jpg",
      attendees: 1678,
      sponsors: 8,
      isOnline: false,
    },
    {
      id: "3",
      title: "Exploring the Potential of Blockchain",
      thumbnail: "https://example.com/trending-event-3.jpg",
      attendees: 987,
      sponsors: 5,
      isOnline: true,
    },
  ];

  const bookmarks: Bookmark[] = [
    {
      id: "1",
      title: "Building Scalable Web Applications",
      thumbnail: "/next.svg",
      image: "https://example.com/bookmark-image-1.jpg",
    },
    {
      id: "2",
      title: "Optimizing Website Performance",
      thumbnail: "https://example.com/bookmark-2.jpg",
      image: "https://example.com/bookmark-image-2.jpg",
    },
  ];

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Hacktoberfest 2023",
      thumbnail: "https://example.com/challenge-1.jpg",
      image: "https://example.com/challenge-image-1.jpg",
    },
    {
      id: "2",
      title: "Weekly Coding Challenge",
      thumbnail: "https://example.com/challenge-2.jpg",
      image: "https://example.com/challenge-image-2.jpg",
    },
  ];
  

  return (
    <div className="bg-black min-h-screen text-white pl-4 pr-4 md:pl-32 md:pr-32 font-mono">
      <div className="bg-gray-800 shadow-md py-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-center space-x-8">
          <button
            className={`font-medium flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors ${
              activeTab === "personalized" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("personalized")}
          >
            <img
              src="/personalized.svg"
              alt="Personalized"
              className="mr-2 w-6 h-6"
            />
            <span className="font-mono">Personalized</span>
          </button>
          <button
            className={`font-medium flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors ${
              activeTab === "features" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("features")}
          >
            <img
              src="/features.svg"
              alt="Features"
              className="mr-2 w-6 h-6"
            />
            <span className="font-mono">Features</span>
          </button>
        </div>
      </div>
      <div className="container py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(events) &&
            events.slice(0, visibleEvents).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="event-link overflow-hidden">
                  <div className="bg-gray-800 mt-4 shadow-md rounded-lg mb-4 flex border border-gray-700 hover:border-blue-800 card">
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg md:text-xl font-medium font-mono">
                          {event.title}
                        </h3>
                        <div className="flex items-center">
                          <div
                            className={`bg-${
                              event.Online ? "green" : "blue"
                            }-500 rounded-full w-3 h-3 mr-2`}
                            title={event.Online ? "Online" : "Offline"}
                          ></div>
                          <span className="text-gray-400 text-sm font-mono">
                            {event.Online ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-2 md:mb-4 font-mono">
                        {event.description &&
                        event.description.length > 150
                          ? event.description.slice(0, 150) + "..."
                          : event.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm font-mono">
                          <span className="mr-2">{event.attendees} attendees</span>
                          <span>{event.sponsors} sponsors</span>
                        </div>
                        <div className="text-gray-400 text-sm font-mono">
                          {event.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {events.length > visibleEvents && (
          <button onClick={handleShowMore} className="bg-gray-800 text-white font-mono py-2 px-4 mt-4 rounded-md hover:bg-gray-700">
            Show More
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-700 flex flex-col">
            <h3 className="text-lg font-medium mb-4 font-mono">Featured Events</h3>
            {data.featuredEvents &&
              data.featuredEvents.map((event) => (
                <div key={event.id} className="flex items-center mb-2">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4"
                    style={{ backgroundImage: `url(${event.thumbnail})` }}
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">
                      {event.title}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-700 flex flex-col">
            <h3 className="text-lg font-medium mb-4 font-mono">Trending Events</h3>
            {trendingEvents.map((event) => (
              <div key={event.id} className="flex items-center mb-2">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4"
                  style={{ backgroundImage: `url(${event.thumbnail})` }}
                />
                <div className="flex-1">
                  <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">
                    {event.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-700 flex flex-col">
            <h3 className="text-lg font-medium mb-4 font-mono">Challenges</h3>
            {challenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center mb-2">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4"
                  style={{ backgroundImage: `url(${challenge.thumbnail})` }}
                />
                <div className="flex-1">
                  <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">
                    {challenge.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
