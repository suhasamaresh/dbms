"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TiltingCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current && backgroundRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        const middleX = window.innerWidth / 2;
        const middleY = window.innerHeight / 2;
        const offsetX = ((x - middleX) / middleX) * 45;
        const offsetY = ((y - middleY) / middleY) * 45;
        setRotateX(offsetX);
        setRotateY(-offsetY);

        // Rotate the background gradient with the same degree as the card
        backgroundRef.current.style.transform = `perspective(5000px) rotateX(${offsetY}deg) rotateY(${offsetX}deg) translateZ(-50px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="md:flex w-full h-screen justify-between bg-black pl-40 xl:pl-0">
      <div className="w-3/5 h-full flex justify-center items-center ">
        <div
          ref={backgroundRef}
          className="absolute w-80 h-80 bg-gradient-to-r from-[#08f] to-[#4DFFF9] rounded-lg opacity-50 transition-transform"
          style={{
            transform: `perspective(5000px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) translateZ(-50px)`,
          }}
        />
        <div
          ref={cardRef}
          className="relative w-64 h-64 bg-black rounded-lg overflow-hidden transition-transform shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
          style={{
            transform: `perspective(5000px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
            transformStyle: `preserve-3d`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <Image src="/drait.jpeg" alt="Logo" width={100} height={100}  className=' ml-20 rounded-lg'/>
              <h2 className="text-2xl font-bold text-pink-600 drop-shadow-md">Dr AIT</h2>
              <p className="text-sm text-[#4DFFF9] drop-shadow-md">
                Elevate your event experience with our cutting-edge platform
              </p>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" className="w-2/5 h-full flex justify-center items-center hidden xl:visible bg-black md:flex flex-col xl:pr-32">
        <div className="text-white text-left">
          <h2 className="text-2xl font-bold mb-4 text-white font-mono font-semibold">Discover the Future of Events</h2>
          <p className="text-gray-100 mt-3 font-mono">
            Dr AIT's event management platform offers a seamless and innovative solution for your event needs. Streamline your planning, engage your
            attendees, and elevate your events to new heights. Experience the power of cutting-edge technology and unparalleled service.
          </p>
        </div>
        <div className="relative group mt-7 ">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#08f] to-[#4DFFF9] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
          <button
            type="submit"
            className="relative px-2 py-2 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
          >
            <span className="flex items-center space-x-5">
              <span className="text-gray-100 pl-12 pr-12 font-mono">Explore</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiltingCard;