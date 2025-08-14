import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../../features/dashboard/dashboardThunks";
import { fetchCropRecommendations } from "../../features/ai/aiThunks";
import WeatherWidget from "./WeatherWidget";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        Please login to view dashboard.
      </div>
    );
  }

  if (user.role === "Farmer") {
    return <FarmerDashboard stats={stats} loading={loading} error={error} />;
  }
  if (user.role === "Customer") {
    return <CustomerDashboard stats={stats} loading={loading} error={error} />;
  }
  return <div className="max-w-5xl mx-auto py-10 px-4">Unknown role.</div>;
}

function FarmerDashboard({ stats, loading, error }) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Widget
            title="Total Crops Listed"
            value={stats?.totalCrops ?? 0}
            icon="🌱"
          />
          <Widget
            title="Active Inquiries"
            value={stats?.activeInquiries ?? 0}
            icon="📩"
          />
          <Widget
            title="Total Revenue"
            value={`₹${stats?.totalRevenue ?? 0}`}
            icon="💰"
          />
          <Widget
            title="Profile Views"
            value={stats?.profileViews ?? 0}
            icon="👤"
          />
        </div>
        {/* Weather Forecast */}
        <WeatherWidget />
        {/* AI Crop Recommendations */}
        <Section title="AI Crop Recommendations">
          <AICropRecommendation
            name="Winter Wheat"
            desc="Best for Winter"
            percent={85}
          />
          <AICropRecommendation
            name="Carrots"
            desc="Best for Fall"
            percent={72}
          />
          <AICropRecommendation
            name="Spinach"
            desc="Best for Cool Season"
            percent={68}
          />
        </Section>
        {/* Active Listings */}
        <Section title="Your Active Listings">
          <ActiveListing
            name="Organic Tomatoes"
            views={45}
            inquiries={3}
            status="active"
          />
          <ActiveListing
            name="Sweet Corn"
            views={32}
            inquiries={5}
            status="active"
          />
          <ActiveListing
            name="Fresh Lettuce"
            views={28}
            inquiries={2}
            status="pending"
          />
        </Section>
      </div>
      <div className="space-y-6">
        {/* Quick Actions */}
        <Section title="Quick Actions">
          <QuickAction label="Browse Marketplace" />
          <QuickAction label="View Farm Map" />
          <QuickAction label="Market Prices" />
          <QuickAction label="Crop Calendar" />
          <QuickAction label="Pest Detection" to="/pest-detection" />
        </Section>
        {/* Recent Activity */}
        <Section title="Recent Activity">
          <RecentActivityItem
            text="New inquiry for Organic Tomatoes"
            time="2 hours ago"
            color="blue"
          />
          <RecentActivityItem
            text="Weather alert: Rain expected tomorrow"
            time="4 hours ago"
            color="orange"
          />
          <RecentActivityItem
            text="Crop listing approved: Sweet Corn"
            time="1 day ago"
            color="green"
          />
          <RecentActivityItem
            text="Payment received: $340"
            time="2 days ago"
            color="purple"
          />
        </Section>
        {/* Farm Alerts */}
        <Section
          title="Farm Alerts"
          className="border-l-4 border-yellow-400 bg-yellow-50"
        >
          <FarmAlert
            text="Weather Alert"
            desc="Heavy rain expected tomorrow. Protect sensitive crops."
          />
          <FarmAlert
            text="Market Update"
            desc="Tomato prices up 15% this week."
          />
        </Section>
      </div>
    </div>
  );
}

function CustomerDashboard({ stats, loading, error }) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Quick Access */}
        <Section title="Quick Access">
          <QuickAction label="Browse Marketplace" />
          <QuickAction label="View Farm Map" />
          <QuickAction label="Wishlist" />
          <QuickAction label="Buyer Recommendations" />
          <QuickAction label="Pest Detection" to="/pest-detection" />
        </Section>
        {/* Weather Forecast */}
        <WeatherWidget />
        {/* AI Crop Recommendations */}
        <Section title="AI Crop Recommendations">
          <AICropRecommendation
            name="Winter Wheat"
            desc="Best for Winter"
            percent={85}
          />
          <AICropRecommendation
            name="Carrots"
            desc="Best for Fall"
            percent={72}
          />
          <AICropRecommendation
            name="Spinach"
            desc="Best for Cool Season"
            percent={68}
          />
        </Section>
        {/* Buyer Recommendations */}
        <Section title="Buyer Recommendations">
          <AICropRecommendation
            name="Tomatoes"
            desc="Recommended for your region"
            percent={90}
          />
          <AICropRecommendation name="Corn" desc="High demand" percent={80} />
        </Section>
      </div>
      <div className="space-y-6">
        {/* Recent Activity */}
        <Section title="Recent Activity">
          <RecentActivityItem
            text="Added Organic Tomatoes to wishlist"
            time="1 hour ago"
            color="blue"
          />
          <RecentActivityItem
            text="Viewed Sweet Corn details"
            time="2 hours ago"
            color="green"
          />
          <RecentActivityItem
            text="Received buyer recommendation"
            time="3 hours ago"
            color="purple"
          />
        </Section>
        {/* Wishlist */}
        <Section title="Wishlist">
          <ActiveListing
            name="Organic Tomatoes"
            views={45}
            inquiries={3}
            status="active"
          />
          <ActiveListing
            name="Sweet Corn"
            views={32}
            inquiries={5}
            status="active"
          />
        </Section>
        {/* Farm Alerts */}
        <Section
          title="Farm Alerts"
          className="border-l-4 border-yellow-400 bg-yellow-50"
        >
          <FarmAlert
            text="Weather Alert"
            desc="Heavy rain expected tomorrow. Protect sensitive crops."
          />
        </Section>
      </div>
    </div>
  );
}

// Reusable UI components
function Widget({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center">
      <span className="text-3xl mb-2">{icon}</span>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 mb-4 ${className}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function WeatherDay({ day, temp, desc, icon }) {
  return (
    <div className="flex flex-col items-center bg-[#f3f3e6] rounded-lg px-4 py-2 min-w-[120px]">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="font-bold text-lg">{temp}</span>
      <span className="text-sm text-gray-700">{desc}</span>
      <span className="text-xs text-gray-500 mt-1">{day}</span>
    </div>
  );
}

function AICropRecommendation({ name, desc, percent }) {
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

function ActiveListing({ name, views, inquiries, status }) {
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

import { useNavigate } from "react-router-dom";

function QuickAction({ label, to }) {
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

function RecentActivityItem({ text, time, color }) {
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

function FarmAlert({ text, desc }) {
  return (
    <div className="mb-2 p-3 rounded bg-yellow-100 border border-yellow-300">
      <div className="font-semibold text-yellow-800">{text}</div>
      <div className="text-xs text-yellow-700">{desc}</div>
    </div>
  );
}
