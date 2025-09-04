import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOtp } from "../../features/auth/authThunks";
import { clearAuthError } from "../../features/auth/authSlice";
import {
  Leaf,
  ArrowLeft,
  User,
  MapPin,
  Building2,
  ShoppingBag,
} from "lucide-react";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateRequired,
  validateConfirmPassword,
} from "../../utils/validation";
import {
  states,
  landSizes, // <-- fix here
  farmTypes,
  experienceLevels,
  businessTypes,
  orderVolumes,
} from "../../constants/registerData";

export default function Register() {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, registrationId, otpVerified } = useSelector(
    (state) => state.auth
  );

  // Navigate to login after successful OTP verification
  useEffect(() => {
    if (otpVerified) {
      navigate("/auth/login");
    }
  }, [otpVerified, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return validateConfirmPassword(formData.password, value);
      case "phone":
        return validatePhoneNumber(value);
      case "firstName":
        return validateRequired(value, "First name");
      case "lastName":
        return validateRequired(value, "Last name");
      case "address":
        return validateRequired(value, "Address");
      case "city":
        return validateRequired(value, "City");
      case "state":
        return validateRequired(value, "State");
      case "zip":
        return validateRequired(value, "ZIP code");
      case "farmName":
        return role === "farmer" ? validateRequired(value, "Farm name") : null;
      case "farmSize":
        return role === "farmer" ? validateRequired(value, "Farm size") : null;
      case "farmType":
        return role === "farmer" ? validateRequired(value, "Farm type") : null;
      case "landSize":
        return role === "farmer" ? validateRequired(value, "Land size") : null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "address",
      "city",
      "state",
      "zip",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = validateRequired(formData[field], field);
      }
    });
    if (role === "farmer") {
      ["farmName", "landSize", "farmType"].forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = validateRequired(formData[field], field);
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    if (!agree) {
      setErrors((prev) => ({
        ...prev,
        agree: "Please agree to the Terms of Service and Privacy Policy.",
      }));
      return;
    }
    if (!validateForm()) {
      setErrors((prev) => ({
        ...prev,
        form: "Please fix the errors in the form.",
      }));
      return;
    }
    // Fix: define payload before using it
    const payload = { ...formData, role };
    delete payload.confirmPassword;
    dispatch(registerUser(payload)).then((action) => {
      console.log("Registration action payload:", action.payload);
      if (
        action.payload &&
        (action.payload.registrationId ||
          action.payload.message === "OTP sent for verification")
      ) {
        // Pass role to VerifyOtp page for OTP verification
        navigate("/verify-otp", {
          state: {
            registrationId: action.payload.registrationId || formData.email,
            role: payload.role,
          },
        });
      } else if (action.payload && action.payload.message) {
        setErrors((prev) => ({ ...prev, form: action.payload.message }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Registration failed: No email returned.",
        }));
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
            Create your account
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Farmer Card */}
          <div
            onClick={() => setRole("farmer")}
            className={`relative border rounded-xl p-8 w-80 cursor-pointer transition bg-white flex flex-col items-center group
              ${
                role === "farmer"
                  ? "border-green-700 shadow-md"
                  : "border-gray-300 hover:border-green-700 hover:shadow-md"
              }`}
            style={{
              boxShadow: role === "farmer" ? "0 0 0 2px #e6f4ea" : undefined,
            }}
          >
            {role === "farmer" && (
              <span className="absolute top-4 right-4 bg-green-700 rounded-full p-1">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            )}
            <div className="bg-green-700 rounded-full p-4 mb-4">
              <Leaf className="text-white w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-green-900">
              I'm a Farmer
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Start selling your crops directly to buyers
            </p>
            <ul className="text-black text-sm list-none space-y-1 text-left w-full max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Direct sales
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Better prices
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                No middlemen
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Weather insights
              </li>
            </ul>
          </div>
          {/* Customer Card */}
          <div
            onClick={() => setRole("customer")}
            className={`relative border rounded-xl p-8 w-80 cursor-pointer transition bg-white flex flex-col items-center group
              ${
                role === "customer"
                  ? "border-green-700 shadow-md"
                  : "border-gray-300 hover:border-green-700 hover:shadow-md"
              }`}
            style={{
              boxShadow: role === "customer" ? "0 0 0 2px #e6f0fa" : undefined,
            }}
          >
            {role === "customer" && (
              <span className="absolute top-4 right-4 bg-blue-700 rounded-full p-1">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            )}
            <div className="bg-blue-700 rounded-full p-4 mb-4">
              <ShoppingBag className="text-white w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-green-900">
              I'm a Customer
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              Get fresh produce directly from local farmers
            </p>
            <ul className="text-black text-sm list-none space-y-1 text-left w-full max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Fresh produce
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Fair prices
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Support local
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Quality guaranteed
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-md text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-green-700 hover:underline font-semibold"
          >
            Sign in here
          </Link>
        </p>
      </div>
    );
  }

  //register ui
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ec] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button
          onClick={() => setRole(null)}
          className="absolute top-6 left-6 text-gray-600 hover:text-black flex items-center gap-1 text-md"
        >
          <ArrowLeft size={18} /> Back to role selection
        </button>
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
            {role === "farmer"
              ? "Farmer Registration"
              : "Customer Registration"}
          </h2>
          <span className="px-3 py-1 rounded-full text-sm bg-[#f5f3ec] text-green-900 border">
            I'm a {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="text-green-700 w-5 h-5" />
              <span className="font-semibold text-lg text-green-900">
                Personal Information
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "firstName",
                  placeholder: "First Name *",
                },
                {
                  name: "lastName",
                  placeholder: "Last Name *",
                },
                {
                  name: "email",
                  placeholder: "Email Address *",
                  type: "email",
                },
                {
                  name: "phone",
                  placeholder: "Phone Number *",
                },
                {
                  name: "password",
                  placeholder: "Password *",
                  type: "password",
                },
                {
                  name: "confirmPassword",
                  placeholder: "Confirm Password *",
                  type: "password",
                },
              ].map(({ name, placeholder, type = "text" }) => (
                <div key={name} className="flex flex-col">
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded ${
                      errors[name] ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Location Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-green-700 w-5 h-5" />
              <span className="font-semibold text-lg text-green-900">
                Location Details
              </span>
            </div>
            <div className="flex flex-col">
              <textarea
                name="address"
                placeholder="Address *"
                value={formData.address || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded mb-4 ${
                  errors.address ? "border-red-500" : ""
                }`}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city || ""}
                  onChange={handleChange}
                  className={`p-2 border rounded ${
                    errors.city ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="flex flex-col">
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className={`p-2 border rounded ${
                    errors.state ? "border-red-500" : ""
                  }`}
                  required
                >
                  <option value="">Select state</option>
                  {states.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code *"
                  value={formData.zip || ""}
                  onChange={handleChange}
                  className={`p-2 border rounded ${
                    errors.zip ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>
          {/* Farmer-specific fields */}
          {role === "farmer" && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="text-green-700 w-5 h-5" />
                <span className="font-semibold text-lg text-green-900">
                  Farm Information
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="farmName"
                    placeholder="Farm Name *"
                    value={formData.farmName || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded ${
                      errors.farmName ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.farmName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.farmName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <select
                    name="landSize"
                    value={formData.landSize || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded ${
                      errors.landSize ? "border-red-500" : ""
                    }`}
                    required
                  >
                    <option value="">Select land size</option>
                    {landSizes.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.landSize && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.landSize}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <select
                    name="farmType"
                    value={formData.farmType || ""}
                    onChange={handleChange}
                    className={`p-2 border rounded ${
                      errors.farmType ? "border-red-500" : ""
                    }`}
                    required
                  >
                    <option value="">Select farm type</option>
                    {farmTypes.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.farmType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.farmType}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <select
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* Customer-specific fields */}
          {role === "customer" && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="text-green-700 w-5 h-5" />
                <span className="font-semibold text-lg text-green-900">
                  Business Information
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name (optional)"
                    value={formData.businessName || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <select
                    name="businessType"
                    value={formData.businessType || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <select
                    name="orderVolume"
                    value={formData.orderVolume || ""}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Select volume</option>
                    {orderVolumes.map((vol) => (
                      <option key={vol} value={vol}>
                        {vol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* Terms and Submit */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              I agree to the{" "}
              <a href="#" className="text-green-700 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-700 underline">
                Privacy Policy
              </a>
            </label>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : role === "farmer"
                ? "Create I'm a Farmer Account"
                : "Create I'm a Customer Account"}
            </button>
            {errors.form && (
              <p className="text-center text-red-600 mt-2">{errors.form}</p>
            )}
            {errors.agree && (
              <p className="text-center text-red-600 mt-2">{errors.agree}</p>
            )}
            {error && (
              <p className="text-center text-red-600 mt-2">
                {typeof error === "string" ? error : error?.message}
              </p>
            )}
            {/*
            {message === "Email exists" && (
              <p className="text-center text-red-600 mt-2">{message}</p>
            )}
            {message && message !== "Email exists" && (
              <p className="text-center text-green-700 mt-2">{message}</p>
            )}
            */}
            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-green-700 hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
