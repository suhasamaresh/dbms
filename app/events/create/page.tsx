"use client";
import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const EventCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizer: "",
    deadline: "",
    location: "",
    isOnline: false,
  });

  const convertDateToTimestamp = (date) => {
    // Convert the date string to a Date object
    const dateObject = new Date(date);

    // Check if the conversion was successful
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date:", date);
      return null; // Or handle the error as appropriate
    }

    // Calculate the timestamp
    const timestamp = Math.floor(dateObject.getTime() / 1000);
    console.log("Timestamp:", timestamp);

    // Update the form data
    setFormData({ ...formData, deadline: timestamp.toString() });

    // Return the timestamp
    return timestamp;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeadlineChange = (e) => {
    const { value } = e.target;
    convertDateToTimestamp(value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to create the event
      console.log(formData);
      const response = await axios.post("/api/events", formData);
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-32 sm:justify-center sm:pt-0">
      {/* Header */}
      <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        {/* Header Icon */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {/* SVG Path */}
          </svg>
        </div>
        {/* Header Title */}
        Event Creation
      </div>

      {/* Form */}
      <div className="relative mt-16 w-full max-w-2xl sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-8">
            <h3 className="text-2xl font-semibold leading-6 tracking-tighter">
              Create a New Event
            </h3>
            <p className="mt-2 text-sm font-medium text-white/50">
              Fill in the details to create a new event.
            </p>
          </div>
          <div className="p-8 pt-0">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Title
                      </label>
                    </div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Event Title"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Description
                      </label>
                    </div>
                    <textarea
                      name="description"
                      placeholder="Event Description"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Organizer
                      </label>
                    </div>
                    <input
                      type="text"
                      name="organizer"
                      placeholder="Event Organizer"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Deadline
                      </label>
                    </div>
                    <input
                      type="datetime-local"
                      name="deadline"
                      placeholder="Event Deadline"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleDeadlineChange}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Location
                      </label>
                    </div>
                    <input
                      type="text"
                      name="location"
                      placeholder="Event Location"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Online Checkbox */}
              <div className="mt-6 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isOnline"
                    className="outline-none focus:outline focus:outline-sky-300"
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-sm">Online Event</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex items-center justify-end gap-x-4">
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-12 px-6 py-2"
                  type="submit"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;
