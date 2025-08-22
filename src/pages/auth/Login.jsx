import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Leaf, ArrowLeft, ShoppingBag } from "lucide-react";
import { loginUser } from "../../features/auth/authThunks";

export default function Login() {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Autofill email if passed from registration/OTP
  useEffect(() => {
    if (location.state && location.state.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return;
    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        role,
      })
    ).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        // Store user details, role, and token in localStorage
        const userData = res.payload?.user || res.payload;
        const token = res.payload?.token || res.payload?.userDetails?.token;
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("role", userData.role || role);
        }
        if (token) {
          localStorage.setItem("token", token);
        }
        // Redirect to dashboard or home after login
        navigate("/");
      }
    });
  };

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f3ec] p-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-[12px] flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #228B22 0%, #43ea7c 100%)",
              }}
            >
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl text-[#222]">FarmConnect</span>
          </div>
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to continue to your dashboard
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          <div
            onClick={() => setRole("farmer")}
            className="border rounded-xl p-8 w-80 cursor-pointer hover:shadow-2xl transition bg-white flex flex-col items-center"
          >
            <div className="bg-green-700 rounded-full p-4 mb-4">
              <Leaf className="text-white w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-green-900">
              I'm a Farmer
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Sell your crops directly to buyers
            </p>
            <ul className="text-green-700 text-sm list-none space-y-1 text-left">
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> List your crops
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Set your prices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Chat with buyers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Weather insights
              </li>
            </ul>
          </div>
          <div
            onClick={() => setRole("customer")}
            className="border rounded-xl p-8 w-80 cursor-pointer hover:shadow-2xl transition bg-white flex flex-col items-center"
            style={{ border: role === "customer" ? "2px solid #228B22" : "" }}
          >
            <div className="bg-blue-700 rounded-full p-4 mb-4">
              <ShoppingBag className="text-white w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-green-900">
              I'm a Customer
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Buy fresh produce directly from farmers
            </p>
            <ul className="text-green-700 text-sm list-none space-y-1 text-left">
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Browse fresh crops
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Compare prices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Chat with farmers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-700">●</span> Track orders
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-md text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 hover:underline font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ec] p-4">
      {/* Back button above and outside the card, left-aligned */}
      <div className="w-full max-w-md mb-6">
        <button
          onClick={() => setRole(null)}
          className="flex items-center gap-2 text-green-900 bg-green-100 px-4 py-2 rounded-lg font-medium hover:bg-green-200"
        >
          <ArrowLeft size={18} /> Back to role selection
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div
            className={`rounded-full p-4 mb-2 ${
              role === "farmer" ? "bg-green-700" : "bg-blue-700"
            }`}
          >
            {role === "farmer" ? (
              <Leaf className="text-white w-10 h-10" />
            ) : (
              <ShoppingBag className="text-white w-10 h-10" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-1">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-2">Sign in to your {role} account</p>
          <span className="px-3 py-1 rounded-full text-sm bg-[#f5f3ec] text-green-900 border">
            I'm a {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {error && (
            <div className="text-red-600 text-center font-semibold mb-2">
              {typeof error === "string" ? error : error?.message}
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl bg-[#f5f3ec] focus:border-green-700 focus:ring-0"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-green-900">
              Password
            </label>
            <div className="relative w-full max-w-md mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl bg-[#f5f3ec] focus:border-green-700 focus:ring-0"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.25 4.5 6.75 7.5 12 7.5 2.042 0 3.98-.41 5.73-1.223M3.98 8.223l.01-.01M3.98 8.223C5.73 7.41 7.668 7 9.71 7c5.25 0 9.75 3 12 7.5a10.477 10.477 0 0 1-1.73 3.777M3.98 8.223l.01-.01M21.75 12c-.41-.82-.89-1.6-1.43-2.33M21.75 12c-2.25-4.5-6.75-7.5-12-7.5-2.042 0-3.98.41-5.73 1.223"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 0c0 4.5-4.5 7.5-12 7.5S3 16.5 3 12 7.5 4.5 15 4.5 21 7.5 21 12z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-green-700" /> Remember me
            </label>
            <a href="#" className="text-green-700 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : role === "farmer"
              ? "Sign In as I'm a Farmer"
              : "Sign In as I'm a Customer"}
          </button>

          <p className="text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-700 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
