'use client'
import React, { useState } from "react";

const PaperForm = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    paperName: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Set submitting state
    try {
      const response = await fetch("http://localhost:8000/api/v1/paper", {
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
      setFormData({ authorName: "",paperName: "" ,description:""});
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="p-6 space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            autoComplete="off"
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
            autoComplete="off"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter paper name"
          />
        </div>

        {/* Paper Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Paper Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            autoComplete="off"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
            placeholder="Enter paper description"
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type = "submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
          {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaperForm;
