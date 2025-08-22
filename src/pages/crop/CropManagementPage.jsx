import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFarmerCrops } from "../../features/crop/cropThunks";
import MyCropList from "./MyCropList";

export default function CropManagementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { crops, loading } = useSelector((state) => state.crop);

  // Get farmerId from localStorage user
  let farmerId = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      farmerId = user.id || user._id || user.userDetails?.id;
    }
  } catch (e) {}

  React.useEffect(() => {
    if (farmerId) {
      dispatch(fetchFarmerCrops(farmerId));
    }
  }, [dispatch, farmerId]);

  const cropsArray = Array.isArray(crops) ? crops : crops?.crops || [];
  // Compute summary from crops array
  const summary = useMemo(() => {
    const totalCrops = cropsArray.length;
    const totalArea = cropsArray.reduce(
      (sum, crop) => sum + (parseFloat(crop.area) || 0),
      0
    );
    const avgHealth =
      cropsArray.length > 0
        ? Math.round(
            cropsArray.reduce(
              (sum, crop) => sum + (parseFloat(crop.health) || 0),
              0
            ) / cropsArray.length
          ) + "%"
        : "-";
    const readyToHarvest = cropsArray.filter(
      (crop) => crop.status === "Ready to Harvest"
    ).length;
    return {
      totalCrops,
      totalArea: totalArea ? totalArea + " acres" : "-",
      avgHealth,
      readyToHarvest,
    };
  }, [cropsArray]);

  // Handler to navigate to crop list after adding a crop
  const handleCropAdded = () => {
    if (farmerId) {
      dispatch(fetchFarmerCrops(farmerId));
    }
    navigate("/crops");
  };

  return (
    <div className="min-h-screen bg-[#fcfcf8]">
      <div className="w-full py-8 px-2 sm:px-4 text-center bg-[#ece8db] mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Crop Management
        </h1>
        <p className="text-gray-700 text-base">
          Track and manage your crops throughout their lifecycle
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Show loading */}
        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading crops...</p>
        )}
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Total Crops</span>
            <span className="text-2xl font-bold text-green-900">
              {summary.totalCrops}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Total Area</span>
            <span className="text-2xl font-bold text-green-900">
              {summary.totalArea}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Average Health</span>
            <span className="text-2xl font-bold text-green-900">
              {summary.avgHealth}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Ready to Harvest</span>
            <span className="text-2xl font-bold text-green-900">
              {summary.readyToHarvest}
            </span>
          </div>
        </div>
        {/* Add New Crop Button navigates to /crops/add */}
        <button
          className="mb-6 bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800 transition flex items-center gap-2"
          onClick={() => navigate("/crops/add")}
        >
          <span className="text-xl font-bold">+</span> Add New Crop
        </button>
        <MyCropList />
      </div>
    </div>
  );
}
