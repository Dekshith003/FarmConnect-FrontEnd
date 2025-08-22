import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CropCard from "../../components/CropCard";
import { fetchFarmerCrops } from "../../features/crop/cropThunks";

export default function MyCropList() {
  const dispatch = useDispatch();
  const { crops, loading, error } = useSelector((state) => state.crop);

  // Get farmerId from localStorage user
  let farmerId = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      farmerId = user.id || user._id || user.userDetails?.id;
    }
  } catch (e) {}

  useEffect(() => {
    if (farmerId) {
      dispatch(fetchFarmerCrops(farmerId));
    }
  }, [dispatch, farmerId]);

  if (loading) return <div className="p-8 text-center">Loading crops...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  // crops may be nested: crops, crops.crops, or crops.crops.crops
  console.log("Crops:", crops);
  const cropList = Array.isArray(crops)
    ? crops
    : Array.isArray(crops?.crops)
    ? crops.crops
    : Array.isArray(crops?.crops?.crops)
    ? crops.crops.crops
    : [];

  return (
    <div className="max-w-3xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cropList.length === 0 ? (
        <div className="col-span-2 text-center text-gray-500">
          No crops found.
        </div>
      ) : (
        cropList.map((crop) => <CropCard key={crop._id} crop={crop} />)
      )}
    </div>
  );
}
