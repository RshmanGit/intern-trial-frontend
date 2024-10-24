'use client'
import React, { useState } from "react";

const PaperForm = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    paperName: "",
    paperDescription: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <form className="space-y-4">
        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter author's name"
          />
        </div>

        {/* Paper Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Paper Name</label>
          <input
            type="text"
            name="paperName"
            value={formData.paperName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter paper name"
          />
        </div>

        {/* Paper Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Paper Description</label>
          <textarea
            name="paperDescription"
            value={formData.paperDescription}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            placeholder="Enter paper description"
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaperForm;
