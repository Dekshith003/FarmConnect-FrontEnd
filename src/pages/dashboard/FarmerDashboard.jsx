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

  useEffect(() => {
    dispatch(fetchCrops());
    // Crop recommendations are now handled by CropRecommendations component
  }, [dispatch]);

  const statWidgets = [
    {
      title: "Total Crops",
      value: stats?.totalCrops ?? cropsArray.length,
      icon: (
        <img
          src="https://res.cloudinary.com/di73dum6d/image/upload/v1756892730/wheat-removebg-preview_urmgx4.png"
          alt="Total Crops"
          style={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      title: "Crops Sold",
      value:
        stats?.soldCrops ??
        cropsArray.filter((c) => c.status === "sold").length,
      icon: (
        <img
          src="https://res.cloudinary.com/di73dum6d/image/upload/v1756892822/vegetables_ib5ele.png"
          alt="Crops Sold"
          style={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      title: "Crops Not Sold",
      value:
        (stats?.totalCrops ?? cropsArray.length) -
        (stats?.soldCrops ??
          cropsArray.filter((c) => c.status === "sold").length),
      icon: (
        <img
          src="https://res.cloudinary.com/di73dum6d/image/upload/v1756892979/wheat_1_lujkyz.png"
          alt="Crops Not Sold"
          style={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      title: "Farm Area (acres)",
      value: stats?.farmArea ?? "-",
      icon: (
        <img
          src="https://res.cloudinary.com/di73dum6d/image/upload/v1756893128/land_fcfrz7.png"
          alt="Farm Area"
          style={{ width: 32, height: 32 }}
        />
      ),
    },
  ];
  console.log("Stats:", stats);

  // Example recent activity (replace with real data)
  // Show recent crops from stats.recentCrops if available
  const recentActivity = Array.isArray(stats?.recentCrops)
    ? stats.recentCrops.map((crop) => ({
        text: `Added new crop: ${crop.name}`,
        time: crop.createdAt
          ? new Date(crop.createdAt).toLocaleDateString()
          : "recent",
        color: "green",
      }))
    : [
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

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Crops</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(stats?.recentCrops)
              ? stats.recentCrops.map((crop, i) => (
                  <Widget
                    key={i}
                    title={crop.name}
                    value={`${crop.quantity}`}
                    unit={crop.unit ? `${crop.unit}` : undefined}
                    price={crop.price ? `${crop.price}` : undefined}
                  />
                ))
              : null}
          </div>
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
