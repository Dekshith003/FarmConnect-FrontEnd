import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  saveProfile,
  clearProfileMessage,
} from "../../features/profile/profileThunks";

function ProfileAvatar({ profile }) {
  if (profile?.avatar) {
    return (
      <img
        src={profile.avatar}
        alt="Avatar"
        className="w-20 h-20 rounded-full object-cover border-2 border-green-600"
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
      {profile?.firstName?.charAt(0) || "U"}
    </div>
  );
}

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error, success } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfile());
    return () => dispatch(clearProfileMessage());
  }, [dispatch]);

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
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(saveProfile({ ...profile, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {profile && (
        <div className="flex flex-col items-center gap-4">
          <ProfileAvatar profile={profile} />
          <div className="text-center">
            <p className="text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-gray-600">{profile.email}</p>
            {/* Add more profile fields here if needed */}
          </div>
        </div>
      )}
      <div className="mt-6">
        <label className="block mb-2 font-medium">
          Upload Avatar (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          onChange={handleAvatarUpload}
        />
      </div>
    </div>
  );
}
