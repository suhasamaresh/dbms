import React, { useState } from "react";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(""); // State to hold the code content
  const [language, setLanguage] = useState<string>("javascript"); // State to hold the selected language
  const [output, setOutput] = useState<string>(""); // State to hold the output of the executed code

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleClear = () => {
    setCode("");
  };

  const handleRun = () => {
    try {
      let result;
      if (language === "javascript") {
        result = eval(code);
      } else {
        // Handle execution for other languages
        result = "Execution not supported for this language.";
      }
      setOutput(result.toString());
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const handleSubmit = () => {
    // Code submission logic here
    console.log("Submitting code:", code);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center border-b border-gray-200 p-2">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Select Language:</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-black"
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            {/* Add more languages here */}
          </select>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none mr-2"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none ml-2"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        className="flex-1 p-2 resize-none text-black"
        style={{ height: "calc(100% - 40px)" }} // Adjusting for the height of the language selector and buttons
        value={code}
        onChange={handleCodeChange}
        placeholder="Write your code here..."
      />
      <div className="p-2 border-t border-gray-200">{output}</div>
    </div>
  );
};

export default CodeEditor;
