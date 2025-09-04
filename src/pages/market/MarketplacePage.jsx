import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CropCard from "../../components/CropCard";
import { fetchCrops } from "../../features/crop/cropThunks";
import { fetchTrendingCrops } from "../../features/crop/trendingThunks";
import SearchBar from "../../components/SearchBar";
import FilterPanel from "../../components/FilterPanel";

export default function MarketplacePage() {
  const [showCount, setShowCount] = useState(9);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crops, trending, loading, error } = useSelector(
    (state) => state.crop
  );
  const [search, setSearch] = useState("");
  const [cropCategory, setCropCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCrops());
    dispatch(fetchTrendingCrops());
  }, [dispatch]);

  // Defensive: ensure crops is always an array
  const cropsArray = Array.isArray(crops)
    ? crops
    : crops && Array.isArray(crops.crops)
    ? crops.crops
    : [];
  const cropCategoriesList = useMemo(
    () => [...new Set(cropsArray.map((crop) => crop.category).filter(Boolean))],
    [cropsArray]
  );
  const filteredCrops = cropsArray.filter((crop) => {
    // Exclude crops marked as sold
    if (crop.isSold) return false;
    const matchesSearch =
      !search ||
      crop.name?.toLowerCase().includes(search.toLowerCase()) ||
      (crop.farmer &&
        typeof crop.farmer === "object" &&
        `${crop.farmer.firstName || ""} ${crop.farmer.lastName || ""}`
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (crop.farmer &&
        typeof crop.farmer === "object" &&
        crop.farmer.location &&
        crop.farmer.location.toLowerCase().includes(search.toLowerCase())) ||
      (typeof crop.location === "string" &&
        crop.location.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !cropCategory || crop.category === cropCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-[#fcfcf8] min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-10 px-2 sm:px-4 bg-[#ece8db]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left Image */}
          <img
            src="https://res.cloudinary.com/di73dum6d/image/upload/v1755847627/Farming_iovwm0.jpg"
            alt="Marketplace"
            className="w-64 h-auto rounded-lg shadow-md"
          />

          {/* Right Content */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Fresh Crops Marketplace
            </h1>
            <p className="text-gray-700 text-base mb-6">
              Connect directly with farmers and discover the freshest produce
              from your region
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search crops, farmers, or locations..."
                className="w-full md:w-1/3"
              />
              <FilterPanel
                cropCategory={cropCategory}
                setCropCategory={setCropCategory}
                cropCategoriesList={cropCategoriesList}
                className="w-full md:w-2/3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-6xl mx-auto mt-8 px-2 sm:px-0">
        <h2 className="text-lg font-semibold text-left mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6.75A6.75 6.75 0 119.75 20.25"
            />
          </svg>
          Trending This Week
        </h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {trending && trending.length > 0 ? (
            trending.map((tag) => (
              <span
                key={tag.name}
                className="bg-[#f3f3e6] text-green-700 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-green-100"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No trending crops</span>
          )}
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-500">
              Loading crops...
            </div>
          ) : error ? (
            <div className="col-span-3 text-center py-10 text-red-500">
              {typeof error === "string"
                ? error
                : error && typeof error === "object" && error.message
                ? error.message
                : JSON.stringify(error)}
            </div>
          ) : filteredCrops.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-400">
              No crops found.
            </div>
          ) : (
            filteredCrops
              .slice(0, showCount)
              .map((crop) => <CropCard key={crop._id} crop={crop} />)
          )}
        </div>
        {filteredCrops.length > showCount && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
              onClick={() => setShowCount(showCount + 6)}
            >
              Load More Crops
            </button>
          </div>
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-8 px-2 sm:px-0"></div>
    </section>
  );
}
