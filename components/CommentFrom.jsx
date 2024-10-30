'use client'
import React, { useState } from "react";

const CommentForm = ({ paperId }) => {
  const [formData, setFormData] = useState({
    name: "",
    content: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);
    setIsSubmitting(true); // Set submitting state
    try {
      const response = await fetch(`http://localhost:8000/api/v1/paper/${paperId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Optionally reset the form or show success message
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFormData({ name: "", content: "" });
      setIsSubmitting(false); // Reset submitting state
    }
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
            name="content"
            value={formData.content}
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
             {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
