import React, { useState, useEffect } from "react";

const FARMER_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "zip",
  "bio",
  "farmName",
  "landSize",
  "farmType",
  "experience",
];
const CUSTOMER_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "zip",
  "bio",
  "businessName",
  "businessType",
  "orderVolume",
];

export default function ProfileForm({ profile, onSave, onCancel }) {
  const [form, setForm] = useState({ ...profile });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    setForm({ ...profile });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB.");
      return;
    }
    setAvatarFile(file);
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...form };
    if (avatarFile) submitData.avatar = avatarFile;
    onSave(submitData);
  };

  const role = (form.role || "").toLowerCase();
  const fields = role === "farmer" ? FARMER_FIELDS : CUSTOMER_FIELDS;

  return (
    <form
      className="space-y-4 w-full"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <label className="block font-medium mb-1">Avatar</label>
        {form.avatar && (
          <img
            src={
              typeof form.avatar === "string"
                ? form.avatar
                : URL.createObjectURL(form.avatar)
            }
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-green-600"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>
      {fields.map((key) => (
        <div key={key}>
          <label className="block font-medium mb-1" htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            name={key}
            id={key}
            value={form[key] || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={key === "role"}
          />
        </div>
      ))}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
