"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Simulate file upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        Upload Your Video
      </h2>
      <input
        type="file"
        accept="video/*"
        className="hidden"
        id="video-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="video-upload" className="cursor-pointer">
        <div className="border-2 border-dashed border-blue-500 p-6 rounded-lg hover:bg-gray-100 transition duration-300">
          {file ? (
            <p className="text-gray-700 break-words">{file.name}</p>
          ) : (
            <p className="text-gray-500">Click to select your video file</p>
          )}
        </div>
      </label>

      <div className="flex flex-col text-left my-4 rounded-lg">
        <label className="text-xl my-2">Video Title</label>
        <input
          type="text border"
          className="border-2 border-dashed border-blue-400 p-4 outline-none"
        />
      </div>

      <div className="flex flex-col text-left my-4 rounded-lg">
        <label className="text-xl my-2">Description</label>
        <textarea className="outline-none border-2 border-dashed border-blue-400 p-4"/>
      </div>

      {file && (
        <div className="mt-4">
          <Button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Upload
          </Button>
        </div>
      )}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <Progress
            value={uploadProgress}
            className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-blue-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </Progress>
          <p className="text-gray-500 mt-2">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
