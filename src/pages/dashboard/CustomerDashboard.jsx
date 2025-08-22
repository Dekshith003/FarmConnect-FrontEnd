import React, { useEffect } from "react";
import WeatherWidget from "./WeatherWidget";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  QuickAction,
  RecentActivityItem,
  FarmAlert,
} from "../../components/dashboard/DashboardWidgets";

export default function CustomerDashboard({ stats, loading, error }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Example quick access actions (AI Buyer Recommendations removed)
  const quickActions = [
    { label: "Browse Marketplace", to: "/marketplace" },
    { label: "My Wishlist", to: "/wishlist" },
  ];

  // Example recent activity (replace with real data)
  const recentActivity = [
    { text: "Added to wishlist: Basmati Rice", time: "1h ago", color: "green" },
    { text: "Sent inquiry to Farmer A", time: "2d ago", color: "blue" },
    { text: "Received offer for Maize", time: "3d ago", color: "orange" },
  ];

  // Example farm alerts (replace with real data)
  const farmAlerts = [
    { text: "Price Drop Alert", desc: "Wheat prices dropped 5% this week." },
    { text: "Weather Alert", desc: "High temperatures expected tomorrow." },
  ];

  // Example wishlist (replace with real data)
  const wishlist = [
    { name: "Basmati Rice" },
    { name: "Organic Tomatoes" },
    { name: "Sweet Corn" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Quick Access */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Quick Access</h2>
          {quickActions.map((action, i) => (
            <QuickAction key={i} label={action.label} to={action.to} />
          ))}
        </div>
        {/* Weather Forecast */}
        <WeatherWidget />
        {/* Buyer Recommendations removed */}
      </div>
      <div className="space-y-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          {recentActivity.map((item, i) => (
            <RecentActivityItem
              key={i}
              text={item.text}
              time={item.time}
              color={item.color}
            />
          ))}
        </div>
        {/* Wishlist */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Wishlist</h2>
          {wishlist.map((item, i) => (
            <div
              key={i}
              className="mb-2 px-3 py-2 rounded bg-[#f7faf7] font-semibold text-green-700"
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* Farm Alerts */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Farm Alerts</h2>
          {farmAlerts.map((alert, i) => (
            <FarmAlert key={i} text={alert.text} desc={alert.desc} />
          ))}
        </div>
      </div>
    </div>
  );
}
