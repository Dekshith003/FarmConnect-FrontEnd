import React, { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CropRecommendations from "../ai/CropRecommendations";
import { fetchCropRecommendations } from "../../features/ai/aiThunks";
import { fetchCrops } from "../../features/crop/cropThunks";

// Reuse UI components from DashboardWidgets
import {
  Widget,
  ActiveListing,
  QuickAction,
  RecentActivityItem,
  FarmAlert,
} from "../../components/dashboard/DashboardWidgets";

export default function FarmerDashboard({ stats, loading, error }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { crops } = useSelector((state) => state.crop);
  const { cropRecommendations } = useSelector((state) => state.ai);

  // Always use an array for crops, handle backend { crops: [...] } structure
  const cropsArray = Array.isArray(crops)
    ? crops
    : crops && Array.isArray(crops.crops)
    ? crops.crops
    : [];
  const { user } = useSelector((state) => state.auth);
  // Get role from localStorage first, fallback to Redux user
  let role = null;
  try {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      role = storedRole;
    } else if (user) {
      role = user.role;
    }
  } catch (e) {
    role = user?.role || null;
  }
  // Ensure role is always a string for comparison
  role = typeof role === "string" ? role.toLowerCase() : "";

  // State for dynamic crop recommendations response
  const [cropRecommendationText, setCropRecommendationText] = useState("");

  console.log("Crop Recommendation Text:", cropRecommendationText);
  console.log("data", cropRecommendations.data.recommendations);

  useEffect(() => {
    dispatch(fetchCrops());
    // Crop recommendations are now handled by CropRecommendations component
  }, [dispatch]);

  const statWidgets = [
    {
      title: "Total Crops",
      value: stats?.totalCrops ?? cropsArray.length,
      icon: "🌱",
    },
    {
      title: "Active Listings",
      value:
        stats?.activeListings ??
        cropsArray.filter((c) => c.status === "active").length,
      icon: "📦",
    },
    {
      title: "Total Sales",
      value: stats?.totalSales ?? 0,
      icon: "💰",
    },
    {
      title: "Farm Area (acres)",
      value: stats?.farmArea ?? "-",
      icon: "🏞️",
    },
  ];

  // Example recent activity (replace with real data)
  const recentActivity = [
    { text: "Added new crop: Wheat", time: "2h ago", color: "green" },
    { text: "Updated farm boundary", time: "1d ago", color: "blue" },
    { text: "Received inquiry for Rice", time: "3d ago", color: "orange" },
  ];

  // Example farm alerts (replace with real data)
  const farmAlerts = [
    {
      text: "Pest Alert",
      desc: "Possible pest detected in your area. Check pest detection tool.",
    },
    {
      text: "Weather Alert",
      desc: "Heavy rain expected tomorrow. Take precautions.",
    },
  ];

  // Example quick actions (AI Crop Recommendations removed)
  const quickActions = [
    { label: "Add New Crop", to: "/crops/add" },
    { label: "View Marketplace", to: "/marketplace" },
    { label: "Open Farm Map", to: "/map" },
    { label: "Profile Settings", to: "/profile" },
    { label: "Crop Management", to: "/crops" },
  ];

  // Active listings (from crops with status 'active')
  const activeListings = cropsArray.filter((c) => c.status === "active");

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statWidgets.map((w, i) => (
            <Widget key={i} title={w.title} value={w.value} icon={w.icon} />
          ))}
        </div>
        {/* Weather Forecast */}
        <WeatherWidget />

        {role === "farmer" && (
          <div className="mb-6">
            <CropRecommendations onRecommendation={setCropRecommendationText} />
            {/* Show recommendations only after user clicks Get Recommendations and response is received */}
            {cropRecommendations.data.recommendations && (
              <div className="bg-[#f7faf7] border border-green-200 rounded-lg p-4 mt-4">
                <div className="text-gray-800 text-base min-h-[100px]">
                  {/* Render string as pre-line, array as list */}
                  {Array.isArray(cropRecommendations.data.recommendations) ? (
                    <ul className="list-disc ml-6">
                      {cropRecommendations.data.recommendations.map(
                        (rec, idx) => (
                          <li
                            key={idx}
                            className="mb-1 text-green-700 font-semibold"
                          >
                            {rec}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <div className="whitespace-pre-line">
                      {cropRecommendations.data.recommendations}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Active Listings */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Your Active Listings</h2>
          {activeListings.length > 0 ? (
            activeListings
              .slice(0, 3)
              .map((listing, i) => (
                <ActiveListing
                  key={i}
                  name={listing.name || listing.cropName}
                  views={listing.views || 0}
                  inquiries={listing.inquiries || 0}
                  status={listing.status}
                />
              ))
          ) : (
            <div className="text-gray-500">No active listings.</div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          {quickActions.map((action, i) => (
            <QuickAction key={i} label={action.label} to={action.to} />
          ))}
        </div>
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
