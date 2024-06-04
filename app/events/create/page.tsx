"use client";
import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";

const EventCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizer: "",
    deadline: "",
    location: "",
    isOnline: false,
    registrationLink: "",
    sponsors: "",
    termsAndConditions: false,
  });

  const convertDateToTimestamp = (date: string | number | Date) => {
    const dateObject = new Date(date);
    const timestamp = Math.floor(dateObject.getTime() / 1000);
    return timestamp;
  };

  const handleDeadlineChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    const timestamp = convertDateToTimestamp(value);
    setFormData({ ...formData, deadline: timestamp.toString() });
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: { target: { name: any; checked: any; }; }) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!formData.termsAndConditions) {
      console.error("Please accept the terms and conditions.");
      return;
    }
    
    try {
      const response = await axios.post("/api/events", formData);
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const eventSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    organizer: z.string().nonempty(),
    deadline: z.number().int().min(0),
    location: z.string().nonempty(),
    registrationLink: z.string().url().optional(),
    sponsors: z.string().nonempty(),
    termsAndConditions: z.boolean(),
  });

  const validate = (data: unknown) => {
    try {
      eventSchema.parse(data);
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-32 sm:justify-center sm:pt-0">
      <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
        Event Creation
      </div>

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
                      required
                    />
                  </div>
                </div>
              </div>

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
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

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
                      required
                    />
                  </div>
                </div>
              </div>

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
                      required
                    />
                  </div>
                </div>
              </div>

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
                      required
                    />
                  </div>
                </div>
              </div>

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

              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Registration Link
                      </label>
                    </div>
                    <input
                      type="text"
                      name="registrationLink"
                      placeholder="Registration Link"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Sponsors
                      </label>
                    </div>
                    <input
                      type="text"
                      name="sponsors"
                      placeholder="Sponsors (comma-separated)"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="termsAndConditions"
                    className="outline-none focus:outline focus:outline-sky-300"
                    onChange={handleCheckboxChange}
                    required
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <a href="/termsandconditions" className="text-blue-500">
                      Terms and Conditions
                    </a>
                  </span>
                </label>
              </div>

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
