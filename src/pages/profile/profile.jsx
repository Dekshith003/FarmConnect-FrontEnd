import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  createProfileThunk,
} from "../../features/profile/profileThunks";
import ProfileForm from "../../components/ProfileForm";
import ProfileView from "./ProfileView";

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const userDetails = JSON.parse(localStorage.getItem("user"))?.userDetails;
  const userId = userDetails?.id;
  const role = userDetails?.role || userDetails?.userrole || "Farmer";
  const [editMode, setEditMode] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const triedCreateRef = useRef(false);

  // Fetch or create profile on mount
  useEffect(() => {
    if (userId && !triedCreateRef.current) {
      dispatch(fetchProfile({ userId, role })).then((action) => {
        if (
          action.type === "profile/fetchProfile/rejected" &&
          (action.payload?.message === "Profile not found" ||
            action.payload === "Profile not found")
        ) {
          if (!triedCreateRef.current) {
            triedCreateRef.current = true;
            dispatch(createProfileThunk({ userId, role, userDetails })).then(
              () => {
                setProfileCreated(true);
              }
            );
          }
        }
      });
    }
  }, [dispatch, userId, role, userDetails]);

  // Refetch after creation
  useEffect(() => {
    if (profileCreated && userId) {
      dispatch(fetchProfile({ userId, role }));
      setProfileCreated(false);
    }
  }, [profileCreated, dispatch, userId, role]);

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
