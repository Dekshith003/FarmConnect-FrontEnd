import React from "react";

import { Widget, Section } from "../../components/dashboard/DashboardWidgets";

export default function AdminDashboard({ stats, loading, error }) {
  // Example platform stats (replace with real stats from backend)
  const statWidgets = [
    { title: "Total Users", value: stats?.totalUsers ?? "-", icon: "👥" },
    { title: "Total Farmers", value: stats?.totalFarmers ?? "-", icon: "🧑‍🌾" },
    {
      title: "Total Customers",
      value: stats?.totalCustomers ?? "-",
      icon: "🛒",
    },
    { title: "Total Crops", value: stats?.totalCrops ?? "-", icon: "🌱" },
    {
      title: "Active Listings",
      value: stats?.activeListings ?? "-",
      icon: "📦",
    },
    { title: "Total Sales", value: stats?.totalSales ?? "-", icon: "💰" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statWidgets.map((w, i) => (
          <Widget key={i} title={w.title} value={w.value} icon={w.icon} />
        ))}
      </div>
      {/* User Management */}
      <Section title="User Management">
        <div className="text-gray-500">
          Coming soon: User list, role management, and actions.
        </div>
      </Section>
      {/* Analytics & Controls */}
      <Section title="Platform Analytics & Controls">
        <div className="text-gray-500">
          Coming soon: Platform analytics, reports, and admin controls.
        </div>
      </Section>
    </div>
  );
}
