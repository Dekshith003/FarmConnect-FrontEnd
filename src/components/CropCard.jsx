import React from "react";
import { FaCommentDots, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CropCard({ crop, onClick }) {
  const navigate = useNavigate();
  const [isSold, setIsSold] = React.useState(!!crop.isSold);
  // Debug log to inspect crop data
  console.log("CropCard crop:", crop);

  // Robust image handling
  let imageUrl = "";
  if (Array.isArray(crop.images) && crop.images.length > 0 && crop.images[0]) {
    const apiBase =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
    const backendBase = apiBase.replace(/\/api$/, "");
    imageUrl = crop.images[0].startsWith("http")
      ? crop.images[0]
      : backendBase + crop.images[0];
  } else if (crop.image) {
    imageUrl = crop.image;
  }

  // Location: string or GeoJSON
  let locationText = "Location: N/A";
  if (typeof crop.location === "string" && crop.location.trim()) {
    locationText = `Location: ${crop.location}`;
  } else if (crop.city && crop.state) {
    locationText = `Location: ${crop.city}, ${crop.state}`;
  } else if (crop.location && crop.location.coordinates) {
    locationText = `Location: ${crop.location.coordinates[1]}, ${crop.location.coordinates[0]}`;
  }

  // Show farmer full name if available, else fallback to farmer ID
  let farmerText = "";
  if (crop.farmer && typeof crop.farmer === "object") {
    const firstName = crop.farmer.firstName || "";
    const lastName = crop.farmer.lastName || "";
    if (firstName || lastName) {
      farmerText = `${firstName} ${lastName}`.trim();
    } else if (crop.farmer._id) {
      farmerText = crop.farmer._id;
    }
  } else if (typeof crop.farmer === "string") {
    farmerText = crop.farmer;
  }

  // Fallbacks for missing fields
  const cropName = crop.name || "Unnamed Crop";
  const cropCategory = crop.category || "-";
  const cropDescription = crop.description || null;
  const cropQuantity =
    crop.quantity !== undefined &&
    crop.quantity !== null &&
    crop.quantity !== ""
      ? crop.quantity
      : "-";
  const cropUnit = crop.unit || "";
  const cropPrice =
    crop.price !== undefined && crop.price !== null && crop.price !== ""
      ? crop.price
      : "-";

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="w-full h-40 mb-2 flex items-center justify-center bg-gray-100 rounded relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={cropName}
            className="object-cover w-full h-full rounded"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x160?text=No+Image";
            }}
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-green-700 mb-1">{cropName}</h3>
      <p className="text-sm text-gray-600 mb-1">{cropCategory}</p>
      {cropDescription && (
        <p className="text-sm text-gray-800 mb-2">{cropDescription}</p>
      )}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">
          Qty: {cropQuantity} {cropUnit}
        </span>
        <span className="font-bold text-green-700">₹{cropPrice}</span>
      </div>
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
        <span>{locationText}</span>
        {/* Message Icon Button using phone from crop.farmer.phone (API response) */}
        {(() => {
          let phone = null;
          if (
            crop.farmer &&
            typeof crop.farmer === "object" &&
            crop.farmer.phone
          ) {
            phone = crop.farmer.phone;
          }
          if (phone) {
            return (
              <button
                title="Message on WhatsApp"
                className="ml-2 p-1 rounded-full hover:bg-green-100 text-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  let waNumber = phone.startsWith("+") ? phone : `+91${phone}`;
                  window.open(
                    `https://wa.me/${waNumber.replace(/[^\d+]/g, "")}`
                  );
                }}
              >
                <FaCommentDots className="text-lg" />
              </button>
            );
          }
          return null;
        })()}
      </div>
      {farmerText && (
        <div className="mt-1 text-xs text-gray-500">Farmer: {farmerText}</div>
      )}
      {isSold && (
        <div className="mt-2 text-xs text-red-500 font-bold">SOLD</div>
      )}
      {/* Show Mark as Sold button only for farmers */}
      {(() => {
        let isFarmer = false;
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            if (user && user.userDetails === "farmer") isFarmer = true;
          }
        } catch (e) {}
        if (isFarmer) {
          return (
            <button
              className={`mt-2 px-3 py-1 rounded-full font-semibold text-xs ${
                isSold
                  ? "bg-gray-300 text-gray-700"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSold((prev) => !prev);
              }}
            >
              {isSold ? "Unmark as Sold" : "Mark as Sold"}
            </button>
          );
        }
        return null;
      })()}
    </div>
  );
}
