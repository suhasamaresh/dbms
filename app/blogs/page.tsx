"use client";
import React, { useState } from 'react';

interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  reads: number;
  likes: number;
}

interface TrendingArticle {
  id: string;
  title: string;
  thumbnail: string;
  reads: number;
  image: string; // New property for the image
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
  const [activeTab, setActiveTab] = useState<'personalized' | 'features'>('personalized');

  const blogs: Blog[] = [
    {
      id: '1',
      title: 'How to Become a Successful Software Engineer',
      description: 'Discover the key steps to becoming a successful software engineer and advance your career.',
      author: 'John Doe',
      thumbnail: '/next.svg',
      reads: 1234,
      likes: 456,
    },
    {
      id: '2',
      title: 'Mastering React: A Comprehensive Guide',
      description: 'Learn the fundamentals of React and build powerful web applications.',
      author: 'Jane Smith',
      thumbnail: 'https://example.com/blog-thumbnail-2.jpg',
      reads: 789,
      likes: 123,
    },
    {
      id: '3',
      title: 'Exploring the World of Artificial Intelligence',
      description: 'Dive into the fascinating world of AI and its impact on various industries.',
      author: 'Michael Johnson',
      thumbnail: 'https://example.com/blog-thumbnail-3.jpg',
      reads: 456,
      likes: 789,
    },
  ];

  const trendingArticles: TrendingArticle[] = [
    {
      id: '1',
      title: 'The Future of Web Development',
      thumbnail: 'https://example.com/trending-article-1.jpg',
      reads: 2345,
      image: 'https://example.com/trending-image-1.jpg', // Image from the web
    },
    {
      id: '2',
      title: 'Mastering Serverless Architecture',
      thumbnail: 'https://example.com/trending-article-2.jpg',
      reads: 1678,
      image: 'https://example.com/trending-image-2.jpg', // Image from the web
    },
    {
      id: '3',
      title: 'Exploring the Potential of Blockchain',
      thumbnail: 'https://example.com/trending-article-3.jpg',
      reads: 987,
      image: 'https://example.com/trending-image-3.jpg', // Image from the web
    },
  ];

  const bookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Building Scalable Web Applications',
      thumbnail: '/next.svg',
      image: 'https://example.com/bookmark-image-1.jpg', // Image from the web
    },
    {
      id: '2',
      title: 'Optimizing Website Performance',
      thumbnail: 'https://example.com/bookmark-2.jpg',
      image: 'https://example.com/bookmark-image-2.jpg', // Image from the web
    },
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Hacktoberfest 2023',
      thumbnail: 'https://example.com/challenge-1.jpg',
      image: 'https://example.com/challenge-image-1.jpg', // Image from the web
    },
    {
      id: '2',
      title: 'Weekly Coding Challenge',
      thumbnail: 'https://example.com/challenge-2.jpg',
      image: 'https://example.com/challenge-image-2.jpg', // Image from the web
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pl-32 pr-32 font-mono">
      <div className="bg-gray-800 shadow-md py-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-center space-x-8">
          <button
            className={`font-medium flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'personalized' ? 'text-blue-500' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('personalized')}
          >
            <img src="/personalized.svg" alt="Personalized" className="mr-2 w-6 h-6" />
            <span className="font-mono">Personalized</span>
          </button>
          <button
            className={`font-medium flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'features' ? 'text-blue-500' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('features')}
          >
            <img src="/features.svg" alt="Features" className="mr-2 w-6 h-6" />
            <span className="font-mono">Features</span>
          </button>
        </div>
      </div>
      <div className="container py-8 flex">
        <div className="flex-3 pr-8 ">
          <div className="flex space-x-10">
            <button className="font-mono bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">Personalised</button>
            <button className="font-mono bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">Featured</button>
          </div>
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-gray-800 mt-4 shadow-md rounded-lg mb-4 flex border border-gray-700">
              <div className="w-32 mt-3 h-32 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: `url(${blog.thumbnail})` }} />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-medium mb-2 font-mono">{blog.title}</h3>
                <p className="text-gray-400 mb-4 font-mono">{blog.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-sm font-mono">
                    <span className="mr-2">{blog.reads} reads</span>
                    <span>{blog.likes} likes</span>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">{blog.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-2 ml-8 pl-8 border-gray-700">
          <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Trending Articles</h3>
              {trendingArticles.map((article) => (
                <div key={article.id} className="flex items-center mb-2">
                  <div className="w-20 h-20 bg-cover bg-center rounded-lg mr-4" style={{ backgroundImage: `url(${article.thumbnail})` }} />
                  <div className="flex-1">
                    <h4 className="text-gray-400 font-medium font-mono">{article.title}</h4>
                    <div className="text-gray-400 text-sm font-mono">{article.reads} reads</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-32 h-32 bg-cover bg-center rounded-lg ml-4" style={{ backgroundImage: `url(${trendingArticles[0].image})` }} />
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Bookmarks</h3>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex items-center mb-2">
                  <div className="w-20 h-20 bg-cover bg-center rounded-lg mr-4" style={{ backgroundImage: `url(${bookmark.thumbnail})` }} />
                  <h4 className="text-gray-400 font-medium font-mono">{bookmark.title}</h4>
                </div>
              ))}
            </div>
            <div className="w-32 h-32 bg-cover bg-center rounded-lg ml-4" style={{ backgroundImage: `url(${bookmarks[0].image})` }} />
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Challenges</h3>
              {challenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center mb-2">
                  <div className="w-20 h-20 bg-cover bg-center rounded-lg mr-4" style={{ backgroundImage: `url(${challenge.thumbnail})` }} />
                  <h4 className="text-gray-400 font-medium font-mono">{challenge.title}</h4>
                </div>
              ))}
            </div>
            <div className="w-32 h-32 bg-cover bg-center rounded-lg ml-4" style={{ backgroundImage: `url(${challenges[0].image})` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;