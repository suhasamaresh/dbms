"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, password };
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      router.push("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto bg-black pb-10">
      <div className="container flex flex-col mx-auto  rounded-lg pt-6 my-5 text-white ">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-black rounded-3xl"
                onSubmit={handleSignup}
              >
                <h3 className="mb-3 text-4xl font-extrabold ">Sign Up</h3>
                <p className="mb-4 ">Enter your details below</p>
                <label htmlFor="name" className="mb-2 text-sm text-start">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex items-center w-full input-field bg-transparent placeholder:text-[#808191] border-[#808191] border-2 rounded-2xl p-2  focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="Name"
                />
                <label htmlFor="email" className="mb-2 text-sm text-start mt-2">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex items-center input-field bg-transparent placeholder:text-[#808191] border-[#808191] border-2 rounded-2xl p-2 w-full focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="Email address"
                />
                <label htmlFor="password" className="mb-2 text-sm text-start mt-2">
                  Password*
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex items-center input-field bg-transparent placeholder:text-[#808191] border-[#808191] border-2 rounded-2xl p-2 w-full focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="Password"
                />
                <div className="relative group mt-6 mb-4">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
                  <button className="relative px-7 py-4  pl-32 pr-32 bg-black rounded-2xl leading-none flex items-center divide-x divide-gray-600">
                    Sign Up
                  </button>
                </div>
                <p className="text-sm leading-relaxed">
                  Already have an account?{" "}
                  <a href="/login" className="font-bold">
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
