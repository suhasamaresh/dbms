"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EventPageServer } from "@/lib/EventPage";

const SlugPage = () => {
  const pathname = usePathname();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  function convertTimestampToDate(timestampString) {
    const timestamp = parseInt(timestampString, 10);
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const slug = pathname.split("/").pop();
        const eventData = await EventPageServer({ id: slug });
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [pathname]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col pt-16 px-4 md:px-8">
      <div className="p-4 md:p-8">
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          event && (
            <div className="flex flex-col lg:flex-row justify-center">
              <div className="flex-[3_3_0%] md:mr-4 xl:pl-44 lg:pl-32">
                <div className="mb-4">
                  <span className="bg-gray-800 px-2 py-1 rounded-md text-sm">
                    {event.type}
                  </span>
                  <h1 className="text-2xl font-semibold mt-2">{event.title}</h1>
                  <p className="text-gray-400 mt-1">
                    Deadline: {convertTimestampToDate(event.Deadline)}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Description:</h2>
                  <div className="text-gray-400">{event.description}</div>
                </div>
                <div className="relative group">
                  <Link href={event.registrationLink}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r w-[160px] from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
                    <button
                      type="submit"
                      className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
                    >
                      <span className="flex items-center space-x-5">
                        <span className="text-gray-100">Register now</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-[2_2_0%] md:ml-4 mt-4 md:mt-0">
                <h2 className="text-lg font-semibold mb-2">Organizer:</h2>
                <p className="text-gray-400">{event.organizer}</p>
                <h2 className="text-lg font-semibold mb-2 mt-4">Location:</h2>
                <p className="text-gray-400">{event.location}</p>
                <h2 className="text-lg font-semibold mb-2 mt-4">Sponsors:</h2>
                <p className="text-gray-400">{event.sponsors}</p>
                {/* Featured Events Card */}
                <div className="mt-8 bg-gray-800 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-white mb-4">Featured Events</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white">Event 1</h3>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white">Event 2</h3>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white">Event 3</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <style jsx>{`
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 8px solid;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #fff transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SlugPage;
