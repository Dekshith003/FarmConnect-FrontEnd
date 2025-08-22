import React from "react";

export default function ProfileAvatar({ profile, size = 32 }) {
  if (profile?.avatar) {
    return (
      <img
        src={profile.avatar}
        alt="Avatar"
        className={`rounded-full object-cover border-2 border-green-600`}
        style={{ width: size, height: size }}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {profile?.firstName?.charAt(0) || "U"}
    </div>
  );
}
