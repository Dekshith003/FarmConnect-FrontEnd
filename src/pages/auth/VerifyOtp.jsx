import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../features/auth/authThunks";
import { clearAuthError } from "../../features/auth/authSlice";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationId, role } = location.state || {};
  const { loading, error, message, otpVerified } = useSelector(
    (state) => state.auth
  );

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors((prev) => ({ ...prev, otp: "Please enter the OTP." }));
      return;
    }
    console.log(role);
    const details = {
      email: registrationId,
      otp: otp,
      role: role,
    };
    console.log(details);
    // Always send { email, otp, role } as required by backend
    dispatch(verifyOtp(details));
  };

  React.useEffect(() => {
    if (otpVerified) {
      setTimeout(() => {
        dispatch(clearAuthError());
        navigate("/login");
      }, 1500);
    }
  }, [otpVerified, dispatch, navigate]);

  if (!registrationId) {
    return (
      <div className="text-red-600 p-8">
        No registration ID found. Please register again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ec] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Verify OTP</h2>
        <p className="mb-4 text-gray-700">
          Enter the OTP sent to your email/phone to complete registration.
        </p>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.otp ? "border-red-500" : ""
            }`}
            required
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
          {error && (
            <p className="text-red-600 text-sm">
              {typeof error === "string" ? error : error?.message}
            </p>
          )}
          {message && <p className="text-green-700 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
