import React from "react";

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

export default function ProfileView({ profile }) {
  if (!profile) return <div>No profile data.</div>;
  const data = profile.profile ? profile.profile : profile;
  const role = (data.role || "").toLowerCase();
  const fields = role === "farmer" ? FARMER_FIELDS : CUSTOMER_FIELDS;
  const name =
    data.firstName || data.lastName
      ? `${data.firstName || ""} ${data.lastName || ""}`.trim()
      : data.name || data.email || "-";
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Profile Details
      </h2>
      {data.avatar && (
        <img
          src={data.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-green-600"
        />
      )}
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {name}
      </div>
      {fields.map((key) =>
        key !== "firstName" && key !== "lastName" && data[key] ? (
          <div className="mb-2" key={key}>
            <span className="font-semibold">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>{" "}
            {data[key]}
          </div>
        ) : null
      )}
      {data.createdAt && (
        <div className="mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </div>
      )}
      {data.updatedAt && (
        <div className="mb-2">
          <span className="font-semibold">Updated At:</span>{" "}
          {new Date(data.updatedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}
