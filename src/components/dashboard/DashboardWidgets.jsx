import React from "react";
import { useNavigate } from "react-router-dom";

export function Widget({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center">
      <span className="text-3xl mb-2">{icon}</span>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}

export function Section({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 mb-4 ${className}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export function WeatherDay({ day, temp, desc, icon }) {
  return (
    <div className="flex flex-col items-center bg-[#f3f3e6] rounded-lg px-4 py-2 min-w-[120px]">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="font-bold text-lg">{temp}</span>
      <span className="text-sm text-gray-700">{desc}</span>
      <span className="text-xs text-gray-500 mt-1">{day}</span>
    </div>
  );
}

export function AICropRecommendation({ name, desc, percent }) {
  return (
    <div className="flex items-center justify-between bg-[#f7faf7] rounded-lg px-4 py-2 mb-2">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-gray-600 mb-1">{desc}</div>
        <div className="w-32 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-600 rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="text-xs text-green-700 font-bold">
          Profitability: {percent}%
        </span>
      </div>
      <button className="ml-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200">
        Learn More
      </button>
    </div>
  );
}

export function ActiveListing({ name, views, inquiries, status }) {
  return (
    <div className="flex items-center justify-between bg-[#f7faf7] rounded-lg px-4 py-2 mb-2">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-gray-600">
          {views} views • {inquiries} inquiries
        </div>
      </div>
      <span
        className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${
          status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export function QuickAction({ label, to }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) navigate(to);
  };
  return (
    <button
      className="w-full bg-[#f3f3e6] text-green-700 px-4 py-2 rounded-lg mb-2 font-semibold hover:bg-green-100 transition text-left"
      onClick={to ? handleClick : undefined}
    >
      {label}
    </button>
  );
}

export function RecentActivityItem({ text, time, color }) {
  const colorMap = {
    blue: "text-blue-600",
    orange: "text-orange-500",
    green: "text-green-600",
    purple: "text-purple-600",
  };
  return (
    <div className="flex items-center justify-between mb-2">
      <span className={`font-medium ${colorMap[color]}`}>{text}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}

export function FarmAlert({ text, desc }) {
  return (
    <div className="mb-2 p-3 rounded bg-yellow-100 border border-yellow-300">
      <div className="font-semibold text-yellow-800">{text}</div>
      <div className="text-xs text-yellow-700">{desc}</div>
    </div>
  );
}
