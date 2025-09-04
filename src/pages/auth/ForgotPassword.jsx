import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/auth/authThunks";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const role = localStorage.getItem("role") || "farmer";
    dispatch(forgotPassword({ email, role }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ec] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your email to change the password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-xl bg-[#f5f3ec] focus:border-green-700 focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
            disabled={isLoading?.forgotPassword}
          >
            {isLoading?.forgotPassword ? "Sending..." : "Send Reset Link"}
          </button>
          {message && (
            <div className="text-green-600 text-center font-semibold mt-2">
              {message}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-center font-semibold mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
