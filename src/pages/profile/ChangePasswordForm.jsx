import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/auth/authThunks";

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (form.newPassword !== form.confirmPassword) {
      setSuccess("");
      return alert("New passwords do not match");
    }
    const res = await dispatch(
      changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    );
    if (res.meta && res.meta.requestStatus === "fulfilled") {
      setSuccess("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-gray-50 p-4 rounded-lg shadow"
    >
      <h3 className="text-lg font-semibold mb-2">Change Password</h3>
      {error && (
        <div className="text-red-600 mb-2">
          {typeof error === "string" ? error : error?.message}
        </div>
      )}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800"
        disabled={isLoading?.changePassword}
      >
        {isLoading?.changePassword ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}
