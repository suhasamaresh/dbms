"use client";
import React, { useState } from 'react';
import axios from 'axios';

const BlogCreation = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    author: '',
    published: false,
    authorId: '',
    likes: 0,
    reads: 0,
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: { target: { files: any[]; }; }) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/blogs', formData);
      console.log('Blog created:', response.data);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-32 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Ardiansyah Putra
        </div>
      </a>
      <div className="relative mt-16 w-full max-w-2xl sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-8">
            <h3 className="text-2xl font-semibold leading-6 tracking-tighter">Create a New Blog</h3>
            <p className="mt-2 text-sm font-medium text-white/50">
              Fill in the details to publish a new blog post.
            </p>
          </div>
          <div className="p-8 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Title
                      </label>
                      <div className="absolute right-4 translate-y-3 text-green-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Blog Title"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
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
                        Content
                      </label>
                    </div>
                    <div className="flex items-center">
                      <textarea
                        name="content"
                        placeholder="Blog Content"
                        className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Author
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    className="outline-none focus:outline focus:outline-sky-300"
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                  />
                  <span className="text-sm">Publish</span>
                </label>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Image
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="image"
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload((e as any).target.files)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-4">
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-12 px-6 py-2"
                  type="submit"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreation;