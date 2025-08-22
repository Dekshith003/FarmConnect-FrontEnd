import React from "react";

export default function FilterPanel({
  cropCategory = "",
  setCropCategory,
  cropCategoriesList = [],
  onMoreFilters = () => {},
  className = "",
}) {
  return (
    <div className={`flex gap-3 items-center bg-transparent ${className}`}>
      <select
        className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-base shadow-sm min-w-[140px] focus:outline-none focus:ring-2 focus:ring-green-200"
        value={cropCategory}
        onChange={(e) => setCropCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {cropCategoriesList.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
