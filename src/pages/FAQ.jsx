import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is FarmConnect?",
    answer:
      "FarmConnect is a digital platform that connects farmers directly with buyers, eliminating middlemen and providing real-time access to markets, crop listings, and transparent pricing.",
  },
  {
    question: "How do I register?",
    answer:
      "Click on the 'Register' button on the top navigation bar and fill in your details. You can register as a farmer, buyer, or both.",
  },
  {
    question: "How can I post a crop?",
    answer:
      "Once logged in as a farmer, go to your dashboard and click 'Post Crop'. Fill in the details including type, quantity, price, and availability date.",
  },
  {
    question: "What crops can I post?",
    answer:
      "You can post any agricultural crop including vegetables, grains, pulses, and fruits. Ensure they are legally allowed for sale in your region.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Visit our Contact Us page or email support@farmconnect.com. We're available 24/7 to help you with your concerns.",
  },
  {
    question: "What are the payment options?",
    answer:
      "FarmConnect supports UPI, Net Banking, and Credit/Debit Cards through secure payment gateways.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow the instructions. You’ll receive a reset link via email.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Navigate to your profile settings and click on 'Delete Account'. You’ll be asked to confirm before permanent deletion.",
  },
  {
    question: "Where can I find the terms and conditions?",
    answer:
      "Our terms and conditions are available at the bottom of the website or by visiting /terms-and-conditions.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="uppercase text-sm text-gray-500">Ask Us</p>
        <h1 className="text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-5 py-4 bg-white hover:bg-gray-50 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-gray-700">
        <p className="mb-2">Still need help? We're here for you 24/7.</p>
        <Link
          to="/contact-us"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
