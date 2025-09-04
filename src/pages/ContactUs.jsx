import React, { useState } from "react";
function ContactUs() {
  // ...existing code...
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        We'd love to hear from you. Fill out the form below and we'll get back
        to you as soon as possible.
      </p>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Thank you for contacting us. We’ll get back to you soon!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
