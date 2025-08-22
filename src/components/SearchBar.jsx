import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search crops, farmers, or locations...",
  className = "",
}) {
  return (
    <div className={`relative flex-1 min-w-0 ${className}`}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"
          />
        </svg>
      </span>
      <input
        className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-2.5 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
