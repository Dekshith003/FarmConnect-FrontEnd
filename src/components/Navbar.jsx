import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationLinks } from "../utils/Constants";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaStore,
  FaChartLine,
  FaCloudSun,
  FaMapMarkerAlt,
  FaSearch,
  FaBell,
  FaLeaf,
  FaBug,
} from "react-icons/fa";
import { Leaf } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
// import ProfileAvatar from "./ProfileAvatar";

// function ProfileIcon({ profile, user }) {
//   const navigate = useNavigate();
//   if (profile?.avatar) {
//     return (
//       <img
//         src={profile.avatar}
//         alt="Avatar"
//         className="w-8 h-8 rounded-full object-cover border-2 border-green-600 cursor-pointer"
//         loading="lazy"
//         onClick={() => navigate("/profile")}
//       />
//     );
//   }
//   if (profile?.firstName || user?.firstName) {
//     return (
//       <div
//         className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
//         onClick={() => navigate("/profile")}
//       >
//         {profile?.firstName?.charAt(0) || user?.firstName?.charAt(0) || "U"}
//       </div>
//     );
//   }
//   // fallback to icon for logged-out
//   return <FaUser className="text-gray-600 text-xl" />;
// }

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { profile } = useSelector((state) => state.profile);
  let user = useSelector((state) => state.auth.user);
  let userRole = user?.role || user?.userrole;

  // Fallback to localStorage if Redux state is empty or role missing
  if (!user || !userRole) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user = JSON.parse(storedUser);
        userRole = user?.role || user?.userrole;
      }
      // If still no role, try to get it from token
      if (!userRole) {
        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userRole = payload.role;
        }
      }
    } catch (e) {
      user = null;
      userRole = null;
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
    setMenuOpen(false);
  };

  const handleSearchClick = () => {
    setShowSearchBar((prev) => !prev);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement crop search logic here (e.g., navigate to crop search results page or filter crops)
    navigate(`/crops?search=${encodeURIComponent(searchQuery)}`);
    setShowSearchBar(false);
    setSearchQuery("");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur bg-opacity-90 shadow-md py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to={navigationLinks.home.path}
            className="flex items-center space-x-2 cursor-pointer"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-8 h-8 rounded-[12px] flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #228B22 0%, #43ea7c 100%)",
              }}
            >
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-[#222]">FarmConnect</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 text-gray-800">
          {/* Farmer links: only for farmer role */}
          {userRole === "farmer" && (
            <>
              <Link
                to={navigationLinks.cropManagement?.path || "/crop-management"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaLeaf className="text-green-600" />
                <span className="font-medium">Crop Management</span>
              </Link>
              <Link
                to={navigationLinks.pestDetection?.path || "/pest-detection"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaBug className="text-green-600" />
                <span className="font-medium">Pest Detection</span>
              </Link>
              <Link
                to={navigationLinks.weatherDashboard.path}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaCloudSun className="text-green-600" />
                <span className="font-medium">Weather</span>
              </Link>
              <Link
                to={navigationLinks.map?.path || "/map"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-green-600" />
                <span className="font-medium">Farm Map</span>
              </Link>
              <Link
                to={navigationLinks.dashboard?.path || "/dashboard"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaChartLine className="text-green-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </>
          )}
          {/* Customer links: only for customer role */}
          {userRole === "customer" && (
            <>
              <Link
                to={navigationLinks.marketplace.path}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaStore className="text-green-600" />
                <span className="font-medium">Marketplace</span>
              </Link>
              <Link
                to={navigationLinks.map?.path || "/map"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-green-600" />
                <span className="font-medium">Farm Map</span>
              </Link>
              <Link
                to={navigationLinks.dashboard?.path || "/dashboard"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaChartLine className="text-green-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                to={navigationLinks.weatherDashboard.path}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaCloudSun className="text-green-600" />
                <span className="font-medium">Weather</span>
              </Link>
            </>
          )}
          {/* Admin links */}
          {user && userRole === "admin" && (
            <>
              <Link
                to={navigationLinks.dashboard?.path || "/dashboard"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaChartLine className="text-green-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                to={navigationLinks.map?.path || "/map"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-green-600" />
                <span className="font-medium">Farm Map</span>
              </Link>
            </>
          )}
          {/* Common links: only show when user is not logged in and no role detected */}
          {!user && !userRole && (
            <>
              <Link
                to="/marketplace"
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaStore className="text-green-600" />
                <span className="font-medium">Marketplace</span>
              </Link>
              <Link
                to="/pest-detection"
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                onClick={() => localStorage.setItem("selectedRole", "farmer")}
              >
                <FaBug className="text-green-600" />
                <span className="font-medium">Pest Detection</span>
              </Link>
              <Link
                to="/weather-dashboard"
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaCloudSun className="text-green-600" />
                <span className="font-medium">Weather</span>
              </Link>
              <Link
                to="/map"
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-green-600" />
                <span className="font-medium">Farm Map</span>
              </Link>
            </>
          )}
          {/* Search, Notification, Profile: only show when user is logged in */}
          {user && (
            <>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
                title="Search"
                onClick={handleSearchClick}
              >
                <FaSearch />
              </button>
              {showSearchBar && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center ml-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    placeholder="Search crops..."
                    className="border px-3 py-1 rounded-full text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded-full text-sm"
                  >
                    Go
                  </button>
                </form>
              )}
              {/* <button
                className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
                title="Notifications"
              >
                <FaBell />
              </button> */}
              {/* <Link
                to={"/profile"}
                className="ml-2 flex items-center"
                title={profile?.firstName || user?.firstName || "Profile"}
              >
                <ProfileAvatar profile={profile} size={32} />
              </Link> */}
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm"
              >
                <FaUser className="text-gray-600" /> Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-2xl text-green-600 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <div className="flex flex-col p-4">
            {/* Mobile Links */}
            {user && userRole === "farmer" && (
              <>
                <Link
                  to={navigationLinks.dashboard?.path || "/dashboard"}
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaChartLine className="text-green-600" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to={navigationLinks.weatherDashboard.path}
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaCloudSun className="text-green-600" />
                  <span className="font-medium">Weather</span>
                </Link>
              </>
            )}
            {/* Admin links */}
            {user && userRole === "admin" && (
              <>
                <Link
                  to={navigationLinks.dashboard?.path || "/dashboard"}
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaChartLine className="text-green-600" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                  to={navigationLinks.map?.path || "/map"}
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-medium">Farm Map</span>
                </Link>
              </>
            )}
            {/* Common links: only show when user is not logged in and no role detected */}
            {!user && !userRole && (
              <>
                <Link
                  to="/marketplace"
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaStore className="text-green-600" />
                  <span className="font-medium">Marketplace</span>
                </Link>
                <Link
                  to="/crop-management"
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  onClick={() => localStorage.setItem("selectedRole", "farmer")}
                >
                  <FaLeaf className="text-green-600" />
                  <span className="font-medium">Crop Management</span>
                </Link>
                <Link
                  to="/pest-detection"
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  onClick={() => localStorage.setItem("selectedRole", "farmer")}
                >
                  <FaBug className="text-green-600" />
                  <span className="font-medium">Pest Detection</span>
                </Link>
                <Link
                  to="/weather-dashboard"
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaCloudSun className="text-green-600" />
                  <span className="font-medium">Weather</span>
                </Link>
                <Link
                  to="/map"
                  className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                >
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-medium">Farm Map</span>
                </Link>
              </>
            )}
            {/* Search, Notification, Profile: only show when user is logged in */}
            {user && (
              <>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
                  title="Search"
                >
                  <FaSearch />
                </button>
                {/* <button
                  className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
                  title="Notifications"
                >
                  <FaBell />
                </button> */}
                {/* <Link
                  to={"/profile"}
                  className="ml-2 flex flex-row items-center gap-2"
                >
                  <ProfileIcon profile={profile} user={user} />
                  <span className="font-medium text-gray-700">Profile</span>
                </Link> */}
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm"
                >
                  <FaUser className="text-gray-600" /> Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
