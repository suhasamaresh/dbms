"use client";
import { blogsRead } from '@/lib/BlogPage';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

interface Blog {
  id: string;
  title: string;
  content: string;
  reads: number;
  likes: number;
  author: string;
  image: string;
}

interface Data {
  blogs: Blog[];
  featuredBlogs: Blog[]; // Adding featuredBlogs property
}

const FeedPage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'personalized' | 'features'>('personalized');
  const [data, setData] = useState<Data>({ blogs: [], featuredBlogs: [] }); // Changed data to include featuredBlogs
  const [challengesSectionHeight, setChallengesSectionHeight] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setData({ ...data, featuredBlogs: data.blogs }); // Set both blogs and featuredBlogs
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const challengesSection = document.getElementById('challenges-section');
    if (challengesSection) {
      setChallengesSectionHeight(challengesSection.clientHeight);
    } 
  }, []);

  const handleclick = async() =>{
    await blogsRead((session as any).user.id)
    console.log("Blogsread called");
  }

  const trendingArticles: TrendingArticle[] = [
    {
      id: '1',
      title: 'The Future of Web Development',
      thumbnail: 'https://example.com/trending-article-1.jpg',
      reads: 2345,
      image: 'https://example.com/trending-image-1.jpg',
    },
    {
      id: '2',
      title: 'Mastering Serverless Architecture',
      thumbnail: 'https://example.com/trending-article-2.jpg',
      reads: 1678,
      image: 'https://example.com/trending-image-2.jpg',
    },
    {
      id: '3',
      title: 'Exploring the Potential of Blockchain',
      thumbnail: 'https://example.com/trending-article-3.jpg',
      reads: 987,
      image: 'https://example.com/trending-image-3.jpg',
    },
  ];

  const bookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Building Scalable Web Applications',
      thumbnail: '/next.svg',
      image: 'https://example.com/bookmark-image-1.jpg',
    },
    {
      id: '2',
      title: 'Optimizing Website Performance',
      thumbnail: 'https://example.com/bookmark-2.jpg',
      image: 'https://example.com/bookmark-image-2.jpg',
    },
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Hacktoberfest 2023',
      thumbnail: 'https://example.com/challenge-1.jpg',
      image: 'https://example.com/challenge-image-1.jpg',
    },
    {
      id: '2',
      title: 'Weekly Coding Challenge',
      thumbnail: 'https://example.com/challenge-2.jpg',
      image: 'https://example.com/challenge-image-2.jpg',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pl-4 pr-4 md:pl-32 md:pr-32 font-mono">
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
      <div className="container py-4 md:py-8 flex flex-col md:flex-row">
        <div className="flex-[3_3_0%] pr-4">
          <div className="flex space-x-4 md:space-x-10">
            <button className="font-mono bg-gray-800 hover:bg-gray-700 px-2 md:px-4 py-2 rounded-md transition-colors">Personalized</button>
            <button className="font-mono bg-gray-800 hover:bg-gray-700 px-2 md:px-4 py-2 rounded-md transition-colors">Featured</button>
          </div>
          {data.blogs && data.blogs.map((blog: any) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`} onClick={handleclick}>
              <div className="blog-link ">
                <div className="bg-gray-800 mt-4 shadow-md rounded-lg mb-4 flex border border-gray-700 hover:border-blue-800 card">
                  <div className="w-24 md:w-32 mt-2 md:mt-3 h-24 md:h-32 bg-cover bg-center ml-1 rounded-lg" style={{ backgroundImage: `url(${blog.image})` }} />
                  <div className="p-4 flex-1">
                    <h3 className="text-lg md:text-xl font-medium mb-2 font-mono">{blog.title}</h3>
                    <p className="text-gray-400 mb-2 md:mb-4 font-mono">{blog.content && blog.content.length > 150 ? blog.content.slice(0, 150) + '...' : blog.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-400 text-sm font-mono">
                        <span className="mr-2">{blog.reads} reads</span>
                        <span>{blog.likes} likes</span>
                      </div>
                      <div className="text-gray-400 text-sm font-mono">{blog.author}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex-[2_2_0%] mt-4 md:mt-0 ml-0 md:ml-8 pl-0 md:pl-8 border-gray-700  " style={{ maxHeight: challengesSectionHeight }}>
          <div className="bg-gray-800 shadow-md rounded-lg p-2 md:p-4 mb-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Trending Articles</h3>
              {trendingArticles.map((article) => (
                <div key={article.id} className="flex items-center mb-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4" style={{ backgroundImage: `url(${article.thumbnail})` }} />
                  <div className="flex-1">
                    <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">{article.title}</h4>
                    <div className="text-gray-400 text-xs md:text-sm font-mono">{article.reads} reads</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg ml-2 md:ml-4" style={{ backgroundImage: `url(${trendingArticles[0].image})` }} />
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-2 md:p-4 mb-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Bookmarks</h3>
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex items-center mb-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4" style={{ backgroundImage: `url(${bookmark.thumbnail})` }} />
                  <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">{bookmark.title}</h4>
                </div>
              ))}
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg ml-2 md:ml-4" style={{ backgroundImage: `url(${bookmarks[0].image})` }} />
          </div>
          <div id="challenges-section" className="bg-gray-800 shadow-md rounded-lg p-2 md:p-4 border border-gray-700 flex">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 font-mono">Challenges</h3>
              {challenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center mb-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg mr-2 md:mr-4" style={{ backgroundImage: `url(${challenge.thumbnail})` }} />
                  <h4 className="text-gray-400 font-medium text-sm md:text-base font-mono">{challenge.title}</h4>
                </div>
              ))}
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-cover bg-center rounded-lg ml-2 md:ml-4" style={{ backgroundImage: `url(${challenges[0].image})` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
