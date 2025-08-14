import React from "react";

export default function CropCard({ crop, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="w-full h-40 mb-2 flex items-center justify-center bg-gray-100 rounded">
        {crop.images && crop.images.length > 0 ? (
          <img
            src={crop.images[0]}
            alt={crop.name}
            className="object-cover w-full h-full rounded"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-green-700 mb-1">{crop.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{crop.category}</p>
      <p className="text-sm text-gray-800 mb-2">{crop.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">
          Qty: {crop.quantity} {crop.unit}
        </span>
        <span className="font-bold text-green-700">₹{crop.price}</span>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {crop.location && crop.location.coordinates
          ? `Location: ${crop.location.coordinates[1]}, ${crop.location.coordinates[0]}`
          : "Location: N/A"}
      </div>
      {crop.isSold && (
        <div className="mt-2 text-xs text-red-500 font-bold">SOLD</div>
      )}
    </div>
  );
}
