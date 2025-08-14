import { FaSearch, FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CropCard from "../../components/CropCard";
import { fetchTrendingCrops } from "../../features/crop/trendingThunks";
import WeatherWidget from "../dashboard/WeatherWidget";

export default function MarketplacePage() {
  const dispatch = useDispatch();
  const { crops, trending, loading, error } = useSelector(
    (state) => state.crop
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showCount, setShowCount] = useState(3);
  // Get unique categories from crops
  const uniqueCategories = [
    ...new Set(crops.map((crop) => crop.category).filter(Boolean)),
  ];

  useEffect(() => {
    dispatch(fetchTrendingCrops());
  }, [dispatch]);

  // Filter crops for display
  const filteredCrops = crops.filter(
    (crop) =>
      (!search || crop.name.toLowerCase().includes(search.toLowerCase())) &&
      (!category || crop.category === category)
  );

  return (
    <section className="bg-[#e9e6da] min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-8 px-2 sm:px-4 text-center bg-[#ece8db]">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
          Fresh Crops Marketplace
        </h1>
        <p className="text-gray-700 text-sm sm:text-base mb-4">
          Connect directly with farmers and discover the freshest produce from
          your region
        </p>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-center max-w-3xl mx-auto w-full">
          <div className="flex flex-1 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 bg-white items-center shadow-sm w-full min-w-0">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crops, farmers, or locations..."
              className="w-full outline-none text-xs sm:text-sm text-gray-700 bg-transparent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 bg-white rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 shadow-sm w-full md:w-auto"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 shadow-sm w-full md:w-auto justify-center">
            <FaFilter />
            More Filters
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-2 sm:px-0">
        <h2 className="text-base sm:text-lg font-semibold text-left mb-2">
          Trending This Week
        </h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {trending && trending.length > 0 ? (
            trending.map((tag) => (
              <span
                key={tag.name}
                className="bg-[#f3f3e6] text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No trending crops</span>
          )}
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredCrops.slice(0, showCount).map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              onClick={() => navigate(`/crop/list`)}
            />
          ))}
        </div>
        {filteredCrops.length > showCount && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              className="bg-green-700 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition text-xs sm:text-base"
              onClick={() => setShowCount(showCount + 3)}
            >
              Load More Crops
            </button>
          </div>
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-8 px-2 sm:px-0">
        <WeatherWidget />
      </div>
    </section>
  );
}
