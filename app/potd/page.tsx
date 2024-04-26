"use client";
import React, { useState, useEffect } from "react";
import Split from "react-split";
import ProblemDescription from "@/components/problemDescription";
import CodeEditor from "@/components/codeeditor";

const POTD: React.FC = () => {
  return (
    <div>
    <Split
      className="flex flex-row pt-16 h-screen bg-black cursor-col-resize"
      sizes={[50, 50]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      <div className=" bg-[#1a1a1a] text-white cursor-pointer">
        <ProblemDescription />
      </div>
      <div className="bg-[#1a1a1a] text-white cursor-pointer"> <CodeEditor/></div>
    </Split>
    </div>
  );
};

export default POTD;
