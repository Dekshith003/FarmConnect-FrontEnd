import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrops } from "../../features/crop/cropThunks";
import CropCard from "../../components/CropCard";
import { useNavigate } from "react-router-dom";

export default function CropList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crops, loading, error } = useSelector((state) => state.crop);
  const { user } = useSelector((state) => state.auth);

  // Pagination, search, filter state
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchCrops());
  }, [dispatch]);

  // Filter and search crops
  let filteredCrops = crops.filter(
    (crop) =>
      (!search || crop.name.toLowerCase().includes(search.toLowerCase())) &&
      (!category || crop.category === category)
  );

  // If user is a customer, prioritize crops by location
  let locationFiltered = filteredCrops;
  if (user && user.role === "customer" && user.location) {
    locationFiltered = filteredCrops.filter(
      (crop) =>
        crop.location &&
        crop.location.toLowerCase() === user.location.toLowerCase()
    );
    // If no crops match location, show all filtered crops
    if (locationFiltered.length === 0) {
      locationFiltered = filteredCrops;
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(locationFiltered.length / pageSize);
  const paginatedCrops = locationFiltered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-green-700">All Crops</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search crops..."
            className="border px-3 py-2 rounded text-sm"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="">All Categories</option>
            <option value="cereal crops">Cereal Crops</option>
            <option value="legumes">Legumes</option>
            <option value="oilseeds">Oilseeds</option>
            <option value="root and tuber crops">Root and Tuber Crops</option>
            <option value="fiber">Fiber</option>
            <option value="spices">Spices</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
          </select>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
            onClick={() => navigate("/crop/add")}
          >
            Add Crop
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedCrops.length > 0 ? (
          paginatedCrops.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              onClick={() => navigate(`/crop/edit/${crop._id}`)}
            />
          ))
        ) : (
          <p className="col-span-3 text-gray-500">No crops found.</p>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="px-3 py-1 rounded border bg-gray-100"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded border bg-gray-100"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
