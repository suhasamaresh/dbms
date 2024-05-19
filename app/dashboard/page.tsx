"use client"
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const userInfo = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    blogsWritten: 12,
    blogsRead: 34,
    eventsAttended: 5,
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  }
  

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">User Dashboard</h1>
        <div className="flex justify-center mb-6">
          <label htmlFor="profileImageInput" className="cursor-pointer">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
            />
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="mb-4">
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
        <div className="flex justify-between space-x-4 mb-6">
          <div className="text-center p-4 bg-gray-700 rounded-lg flex-1">
            <p className="font-semibold">Blogs Written</p>
            <p className="text-2xl">{userInfo.blogsWritten}</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg flex-1">
            <p className="font-semibold">Blogs Read</p>
            <p className="text-2xl">{userInfo.blogsRead}</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg flex-1">
            <p className="font-semibold">Events Attended</p>
            <p className="text-2xl">{userInfo.eventsAttended}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative group flex-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
            <button
              onClick={handleGoBack}
              className="relative px-7 py-4 bg-blue-500 rounded-lg leading-none flex items-center divide-x divide-gray-600 hover:bg-blue-600 w-full"
            >
              <span className="flex items-center space-x-5">
                <span className="text-gray-100 pl-2 pr-2">&lt;&lt;</span>
                <span className="text-gray-100">Go Back</span>
              </span>
            </button>
          </div>
          <div className="relative group flex-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
            <button
              onClick={handleLogout}
              className="relative px-7 py-4 bg-red-500 rounded-lg leading-none flex items-center divide-x divide-gray-600 hover:bg-red-600 w-full"
            >
              <span className="flex items-center justify-center w-full">
                <span className="text-gray-100 ">Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
