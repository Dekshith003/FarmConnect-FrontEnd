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
  FaCommentDots,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { Leaf } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function ProfileIcon({ profile, user }) {
  if (profile?.avatar) {
    return (
      <img
        src={profile.avatar}
        alt="Avatar"
        className="w-8 h-8 rounded-full object-cover border-2 border-green-600"
        loading="lazy"
      />
    );
  }
  if (profile?.firstName || user?.firstName) {
    return (
      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-bold">
        {profile?.firstName?.charAt(0) || user?.firstName?.charAt(0) || "U"}
      </div>
    );
  }
  // fallback to icon for logged-out
  return <FaUser className="text-gray-600 text-xl" />;
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
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
          <Link
            to={navigationLinks.weatherDashboard.path}
            className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
          >
            <FaCloudSun className="text-green-600" />
            <span className="font-medium">Weather</span>
          </Link>
          {/* Show all links before login */}
          {!user && (
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
                to={navigationLinks.messages?.path || "/messages"}
                className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
              >
                <FaCommentDots className="text-green-600" />
                <span className="font-medium">Messages</span>
              </Link>
            </>
          )}
          {user && (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    to={navigationLinks.marketplace.path}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaStore className="text-green-600" />
                    <span className="font-medium">Marketplace</span>
                  </Link>
                  <Link
                    to={navigationLinks.dashboard?.path || "/dashboard"}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
                  >
                    <FaChartLine className="w-4 h-4" /> Dashboard
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
                    to={navigationLinks.messages?.path || "/messages"}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaCommentDots className="text-green-600" />
                    <span className="font-medium">Messages</span>
                  </Link>
                </>
              )}
              {user.role === "farmer" && (
                <>
                  <Link
                    to={navigationLinks.dashboard?.path || "/dashboard"}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
                  >
                    <FaChartLine className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    to={navigationLinks.map?.path || "/map"}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaMapMarkerAlt className="text-green-600" />
                    <span className="font-medium">Farm Map</span>
                  </Link>
                  <Link
                    to={navigationLinks.weatherDashboard.path}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaCloudSun className="text-green-600" />
                    <span className="font-medium">Weather</span>
                  </Link>
                  <Link
                    to={navigationLinks.messages?.path || "/messages"}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaCommentDots className="text-green-600" />
                    <span className="font-medium">Messages</span>
                  </Link>
                </>
              )}
              {user.role === "customer" && (
                <>
                  <Link
                    to={navigationLinks.marketplace.path}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaStore className="text-green-600" />
                    <span className="font-medium">Marketplace</span>
                  </Link>
                  <Link
                    to={navigationLinks.weatherDashboard.path}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaCloudSun className="text-green-600" />
                    <span className="font-medium">Weather</span>
                  </Link>
                  <Link
                    to={navigationLinks.messages?.path || "/messages"}
                    className="px-3 py-2 rounded hover:bg-green-50 flex items-center gap-1"
                  >
                    <FaCommentDots className="text-green-600" />
                    <span className="font-medium">Messages</span>
                  </Link>
                </>
              )}
            </>
          )}

          {/* Spacer */}
          <div className="w-6" />

          {/* Search and Notification */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
            title="Search"
          >
            <FaSearch />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition text-xl text-gray-700 mr-1"
            title="Notifications"
          >
            <FaBell />
          </button>

          {/* Profile/Logout or Login/Get Started */}
          <Link
            to={"/profile"}
            className="ml-2 flex flex-row items-center gap-2"
          >
            <ProfileIcon profile={profile} user={user} />
            <span className="font-medium text-gray-700">Profile</span>
          </Link>
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
                to="/login"
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm"
              >
                <FaUser className="text-gray-600" /> Login
              </Link>
              <Link
                to="/register"
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
        <ul className="md:hidden px-4 pb-4 text-gray-800 space-y-2">
          {/* Show all links before login */}
          {!user && (
            <>
              <li>
                <Link
                  to={navigationLinks.marketplace.path}
                  className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaStore className="inline mr-2" /> Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to={navigationLinks.map?.path || "/map"}
                  className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaMapMarkerAlt className="inline mr-2" /> Farm Map
                </Link>
              </li>
              <li>
                <Link
                  to={navigationLinks.messages?.path || "/messages"}
                  className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaCommentDots className="inline mr-2" /> Messages
                </Link>
              </li>
              <li>
                <Link
                  to={"/profile"}
                  className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="inline mr-2" /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm mb-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="inline mr-2" /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link
                      to={navigationLinks.marketplace.path}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaStore className="inline mr-2" /> Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={navigationLinks.dashboard?.path || "/dashboard"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaChartLine className="inline mr-2" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={navigationLinks.map?.path || "/map"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaMapMarkerAlt className="inline mr-2" /> Farm Map
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={navigationLinks.messages?.path || "/messages"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaCommentDots className="inline mr-2" /> Messages
                    </Link>
                  </li>
                </>
              )}
              {user.role === "farmer" && (
                <>
                  <li>
                    <Link
                      to={navigationLinks.dashboard?.path || "/dashboard"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaChartLine className="inline mr-2" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={navigationLinks.map?.path || "/map"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaMapMarkerAlt className="inline mr-2" /> Farm Map
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={navigationLinks.messages?.path || "/messages"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaCommentDots className="inline mr-2" /> Messages
                    </Link>
                  </li>
                </>
              )}
              {user.role === "customer" && (
                <>
                  <li>
                    <Link
                      to={navigationLinks.marketplace.path}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaStore className="inline mr-2" /> Marketplace
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={navigationLinks.messages?.path || "/messages"}
                      className="block px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaCommentDots className="inline mr-2" /> Messages
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to={"/profile"}
                  className="block px-4 py-2 rounded-full bg-green-600 text-white font-semibold mb-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover inline mr-2"
                      loading="lazy"
                    />
                  ) : (
                    <span className="inline-block w-8 h-8 rounded-full bg-green-700 text-white text-center leading-8 font-bold mr-2">
                      {profile?.firstName?.charAt(0) ||
                        user?.firstName?.charAt(0) ||
                        "U"}
                    </span>
                  )}
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-full hover:bg-gray-100 transition"
              title="Search"
            >
              <FaSearch className="inline mr-2" /> Search
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-full hover:bg-gray-100 transition"
              title="Notifications"
            >
              <FaBell className="inline mr-2" /> Notifications
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
