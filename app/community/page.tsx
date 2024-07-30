"use client";
import React, { useState, useEffect } from 'react';

const Page: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [communities, setCommunities] = useState<any[]>([]); // State to hold communities data
    const [loading, setLoading] = useState(true);

    const showMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/api/community');
            const data = await response.json();
            setCommunities(data); // Set communities data
            setLoading(false);
        } catch (error) {
            console.error('Error fetching communities:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-black text-white text-center py-8">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black py-8 font-mono justify-between items-center">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Student Communities</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities.slice(0, visibleCount).map((community, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 cursor-pointer border border-gray-700 hover:border-blue-700 shadow-md rounded-lg p-6 max-w-sm mx-auto flex flex-col justify-between"
                        >
                            <img
                                src={community.image}
                                alt={community.name}
                                className="rounded-lg mb-4 w-full h-32 object-cover"
                            />
                            <h2 className="text-xl font-semibold text-white mb-2">{community.name}</h2>
                            <p className="text-gray-300">{community.description}</p>
                        </div>
                    ))}
                </div>
                {visibleCount < communities.length && (
                    <div className="text-left ml-12 mt-8">
                        <button
                            onClick={showMore}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
