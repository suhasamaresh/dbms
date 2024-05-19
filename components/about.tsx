import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col lg:space-x-80 lg:flex-row lg:space-x-8 lg:pl-32 px-4 bg-gray-900 items-center font-mono">
      <div className="bg-gray-900 p-4 lg:p-8 text-gray-500 flex-1 lg:mb-0 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-500">ABOUT US:</h2>
        <p className="mb-4">
          We are students from Dr. AIT, who want to build a community around the campus. Our motive is learning publicly. In this site, we provide free resources students can utilize and learn from.
        </p>
        <p className="mb-4">
          All the events are not organized by us. Those are free events students can attend to gain knowledge and make useful connections.
        </p>
        <p>
          We believe in the power of education and community. Together, we can achieve great things and make a positive impact on the world.
        </p>
      </div>
      <div className="bg-gray-900 p-4 lg:p-8 flex-1">
        <img src="/a.jpg" alt="Image" className=" lg:h-72 rounded-xl" />
      </div>
    </div>
  );
};

export default AboutUs;
