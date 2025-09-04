import React from "react";

export default function ProfileView() {
  const userDetails = JSON.parse(localStorage.getItem("user"))?.userDetails;
  if (!userDetails) return <div>No user details found.</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">User Details</h2>
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {userDetails.firstName}{" "}
        {userDetails.lastName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {userDetails.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Phone:</span> {userDetails.phone}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Address:</span> {userDetails.address}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Role:</span>{" "}
        {userDetails.role || userDetails.userrole}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
}
