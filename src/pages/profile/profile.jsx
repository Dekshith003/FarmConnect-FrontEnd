import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
} from "../../features/profile/profileThunks";
import { fetchOrCreateProfile } from "../../features/profile/profileApi";
import ProfileForm from "../../components/ProfileForm";
import ProfileView from "./ProfileView";

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const triedCreateRef = useRef(false);

  // Fetch or create profile on mount
  useEffect(() => {
    if (user?._id && !triedCreateRef.current) {
      dispatch(fetchProfile(user._id)).then((action) => {
        if (
          action.type === "profile/fetchProfile/rejected" &&
          (action.payload?.message === "Profile not found" ||
            action.payload === "Profile not found")
        ) {
          if (!triedCreateRef.current) {
            triedCreateRef.current = true;
            // Create profile if not found, only with basic fields
            const profileData = {
              _id: user._id,
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              email: user.email || "",
              role: user.role || "",
              phone: user.phone || "",
              address: user.address || "",
              city: user.city || "",
              state: user.state || "",
              zip: user.zip || "",
              avatar: "",
            };
            fetchOrCreateProfile(user._id, profileData).then(() => {
              setProfileCreated(true);
            });
          }
        }
      });
    }
  }, [dispatch, user]);

  // Refetch after creation
  useEffect(() => {
    if (profileCreated && user?._id) {
      dispatch(fetchProfile(user._id));
      setProfileCreated(false);
    }
  }, [profileCreated, dispatch, user]);

  // Save handler
  const handleSave = (updatedData) => {
    dispatch(updateProfile(updatedData));
    setEditMode(false);
  };

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (error && error !== "Profile not found") {
    const errorMsg =
      typeof error === "string"
        ? error
        : error?.message || JSON.stringify(error);
    return <div className="p-8 text-red-500">{errorMsg}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {editMode ? (
        <ProfileForm
          profile={profile}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <ProfileView profile={profile} />
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
}
