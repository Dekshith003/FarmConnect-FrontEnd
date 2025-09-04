import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    title: "What is FarmConnect?",
    content:
      "FarmConnect is a digital platform that connects farmers directly with buyers, eliminating middlemen and providing real-time access to markets, crop listings, and transparent pricing.",
  },
  {
    title: "How do I register?",
    content:
      "Click on the 'Register' button on the top navigation bar and fill in your details. You can register as a farmer, buyer, or both.",
  },
  {
    title: "How can I post a crop?",
    content:
      "Once logged in as a farmer, go to your dashboard and click 'Post Crop'. Fill in the details including type, quantity, price, and availability date.",
  },
  {
    title: "What crops can I post?",
    content:
      "You can post any agricultural crop including vegetables, grains, pulses, and fruits. Ensure they are legally allowed for sale in your region.",
  },
  {
    title: "How can I contact support?",
    content:
      "Visit our Contact Us page or email support@farmconnect.com. We're available 24/7 to help you with your concerns.",
  },
  {
    title: "What are the payment options?",
    content:
      "FarmConnect supports UPI, Net Banking, and Credit/Debit Cards through secure payment gateways.",
  },
  {
    title: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login screen and follow the instructions. You'll receive a reset link via email.",
  },
  {
    title: "How do I delete my account?",
    content:
      "Navigate to your profile settings and click on 'Delete Account'. You'll be asked to confirm before permanent deletion.",
  },
  {
    title: "Where can I find the terms and conditions?",
    content:
      "Our terms and conditions are available at the bottom of the website or by visiting /terms-and-conditions.",
  },
];

function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-md shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full text-left px-5 py-4 bg-white hover:bg-gray-50 flex justify-between items-center"
          >
            <span className="text-lg font-medium text-gray-800">
              {item.title}
            </span>
            <span
              className={`ml-2 text-gray-500 text-xl transition-transform duration-300 ${
                openIdx === idx ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          {openIdx === idx && (
            <div className="px-5 py-4 bg-gray-50 text-gray-700 animate-fade-in">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="uppercase text-sm text-gray-500">Ask Us</p>
        <h1 className="text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
      </div>
      <Accordion items={faqs} />
      <div className="mt-10 text-center text-gray-700">
        <p className="mb-2">Still need help? We're here for you 24/7.</p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
