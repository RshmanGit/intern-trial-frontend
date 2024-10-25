'use client'
import React, { useState } from "react";

const CommentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    comment: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData); // Pass the comment data to the parent component
    }
    setFormData({ name: "", comment: "" }); // Clear the form after submission
  };

  return (
    <div className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700">when you are attending </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            placeholder="Write your comment..."
            required
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
