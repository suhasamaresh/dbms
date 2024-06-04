"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs); 
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
    <div className="bg-black min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-green-500 text-center text-3xl font-bold mb-8 font-mono">
          Explore some of the blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 6).map((blog, index) => (
            <Link href={`/blogs/${blog.id}`} key={index}>
              <div className="bg-gray-800 rounded-lg overflow-hidden h-full border border-gray-700 hover:border-blue-800 card">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-white text-xl font-bold mb-2 font-mono">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-2 font-mono truncate">
                      Date: {blog.createdAt}
                    </p>
                    <p className="text-gray-300 text-sm mb-2 font-mono truncate">
                      Content: {blog.content || ' '}
                    </p>
                    <p className="text-gray-300 text-sm mb-2 font-mono truncate">
                      Author: {blog.author}
                    </p>
                  </div>
                  <div className="text-blue-500 font-semibold font-mono hover:text-blue-700">
                    Read More..
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
