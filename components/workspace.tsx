import React from "react";
import Split from "react-split";
import ProblemDescription from "./problemDescription";

const Workspace: React.FC = () => {
  return (
    <div className="flex flex-row h-full ">
      <div className="w-1/2 h-full">
        <Split direction="vertical" sizes={[50, 50]}>
          <div className="h-screen">
            <ProblemDescription />
          </div>
          <div className="h-screen">Code Editor</div>
        </Split>
      </div>
    </div>
  );
};
export default Workspace;
