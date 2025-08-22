import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../../features/dashboard/dashboardThunks";
import FarmerDashboard from "./FarmerDashboard";
import CustomerDashboard from "./CustomerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  // Get user from Redux, but get role from localStorage for robustness
  const { user } = useSelector((state) => state.auth);
  // Get role from localStorage 'role' key first, then fallback to user object and Redux
  let role = null;
  // 1. Check localStorage 'role' key
  const storedRole = localStorage.getItem("role");
  if (storedRole) {
    role = storedRole;
  } else {
    // 2. Try to get from parsed user object (if present)
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        role = parsedUser.role || parsedUser.userDetails?.role;
      }
    } catch (e) {
      // fallback to Redux user
      role = user?.role;
    }
    // 3. If still no role, fallback to Redux user
    if (!role && user) {
      role = user.role;
    }
  }

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (!role) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        Please login to view dashboard.
      </div>
    );
  }

  if (role === "Farmer" || role === "farmer") {
    return <FarmerDashboard stats={stats} loading={loading} error={error} />;
  }
  if (role === "Customer" || role === "customer") {
    return <CustomerDashboard stats={stats} loading={loading} error={error} />;
  }
  if (role === "Admin" || role === "admin") {
    return <AdminDashboard stats={stats} loading={loading} error={error} />;
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600">
        Role not recognized. Please contact support.
      </p>
    </div>
  );
}
