"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BlogPageServer, Likeincrement } from "@/lib/BlogPage";
import { motion, useScroll } from "framer-motion";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const BlogPage = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop(); // Extracting the slug from the last segment of the pathname

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the blog data from the server and update the reads count
    const fetchBlogData = async () => {
      console.log("Fetching blog data...");
      const blogData = await BlogPageServer({ id: slug });
      console.log("Blog data fetched:", blogData);
      setBlog(blogData);
      setIsLoading(false);
    };
    fetchBlogData();
  }, [slug]);

  const handleLike = async () => {
    try {
      await Likeincrement({ id: slug });
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error incrementing likes:", error);
    }
  };

  const handleDislike = () => {
    // Increment dislikes count and update in the state
    setDislikes((prevDislikes) => prevDislikes + 1);
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-black text-white p-8 md:p-12 lg:p-16 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="lds-ring">
            <div className="border-white"></div>
            <div className="border-white"></div>
            <div className="border-white"></div>
            <div className="border-white"></div>
          </div>
        </div>
      ) : (
        <div className="pt-14 min-h-screen pl-0 pr-0 xl:pl-32 xl:pr-32 ">
          <h1 className="text-4xl font-bold mb-4 font-mono">{blog.title}</h1>
          <div className="flex items-center mb-4">
            <p className="mr-4 font-mono text-xl">
              <span className="font-semibold">Author: </span>
              <span className="text-gray-200">{blog.author}</span>
            </p>
            <p className="font-mono text-xl">
              <span className="font-semibold">Created Date: </span>
              <span className="text-gray-200">
                {formatDate(blog.createdAt)}
              </span>
            </p>
          </div>
          {blog.image && (
            <img src={blog.image} alt="Blog Image" className="mb-4 w-[500px] rounded-xl" />
          )}
          <div className="prose prose-invert max-w-none">
            <p className="mb-8 font-mono text-gray-200">{blog.content}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl cursor-pointer" onClick={handleLike}>
                👍
              </span>
              <span className="text-lg ml-2">{likes}</span>
            </div>
            <div className="flex items-center">
              <span
                className="text-3xl cursor-pointer"
                onClick={handleDislike}
              >
                👎
              </span>
              <span className="text-lg ml-2">{dislikes}</span>
            </div>
          </div>
        </div>
      )}
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

export default BlogPage;
