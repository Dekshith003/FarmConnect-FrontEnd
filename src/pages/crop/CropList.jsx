import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrops } from "../../features/crop/cropThunks";
import CropCard from "../../components/CropCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import FilterPanel from "../../components/FilterPanel";

export default function CropList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crops, loading, error } = useSelector((state) => state.crop);
  const { user } = useSelector((state) => state.auth);

  // Pagination, search, filter state
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [cropCategory, setCropCategory] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [minQty, setMinQty] = React.useState("");
  const [maxQty, setMaxQty] = React.useState("");
  const pageSize = 10;

  // Always use an array for crops, handle backend { crops: [...] } structure
  const cropsArray = Array.isArray(crops)
    ? crops
    : crops && Array.isArray(crops.crops)
    ? crops.crops
    : [];

  // Get unique crop categories from crops
  const cropCategoriesList = useMemo(
    () => [...new Set(cropsArray.map((crop) => crop.category).filter(Boolean))],
    [cropsArray]
  );

  useEffect(() => {
    dispatch(fetchCrops());
  }, [dispatch]);

  // Filter and search crops
  let filteredCrops = cropsArray.filter((crop) => {
    // If user is a farmer, only show their own crops
    if (user && user.role === "farmer") {
      // crop.farmer can be an object or an id string
      if (typeof crop.farmer === "object" && crop.farmer?._id) {
        if (crop.farmer._id !== user._id) return false;
      } else if (typeof crop.farmer === "string") {
        if (crop.farmer !== user._id) return false;
      }
    }
    const matchesSearch =
      !search ||
      crop.name?.toLowerCase().includes(search.toLowerCase()) ||
      (typeof crop.farmer === "object" &&
        crop.farmer?.name?.toLowerCase().includes(search.toLowerCase())) ||
      (typeof crop.farmer === "object" &&
        crop.farmer?.location?.toLowerCase().includes(search.toLowerCase())) ||
      (typeof crop.location === "string" &&
        crop.location.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !cropCategory || crop.category === cropCategory;
    const matchesMinPrice =
      !minPrice || (crop.price && Number(crop.price) >= Number(minPrice));
    const matchesMaxPrice =
      !maxPrice || (crop.price && Number(crop.price) <= Number(maxPrice));
    const matchesMinQty =
      !minQty || (crop.quantity && Number(crop.quantity) >= Number(minQty));
    const matchesMaxQty =
      !maxQty || (crop.quantity && Number(crop.quantity) <= Number(maxQty));
    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinQty &&
      matchesMaxQty
    );
  });

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
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search crops..."
          className="w-full md:w-1/3"
        />
        <FilterPanel
          cropCategory={cropCategory}
          setCropCategory={(val) => {
            setCropCategory(val);
            setPage(1);
          }}
          cropCategoriesList={cropCategoriesList}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minQty={minQty}
          setMinQty={setMinQty}
          maxQty={maxQty}
          setMaxQty={setMaxQty}
          className="w-full md:w-2/3"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error &&
        (() => {
          if (typeof error === "string") {
            return <p className="text-red-500">{error}</p>;
          }
          if (Array.isArray(error)) {
            return (
              <ul className="text-red-500 text-sm mt-2 list-disc list-inside">
                {error.map((err, idx) => (
                  <li key={idx}>
                    {typeof err === "string" ? err : JSON.stringify(err)}
                  </li>
                ))}
              </ul>
            );
          }
          if (typeof error === "object" && error !== null) {
            return (
              <div className="text-red-500 text-sm mt-2">
                {error.message && <div>{error.message}</div>}
                {Array.isArray(error.errors) && error.errors.length > 0 ? (
                  <ul className="list-disc list-inside mt-1">
                    {error.errors.map((err, idx) => (
                      <li key={idx}>{err.msg || JSON.stringify(err)}</li>
                    ))}
                  </ul>
                ) : null}
                {!error.message && !Array.isArray(error.errors) && (
                  <div>{JSON.stringify(error)}</div>
                )}
              </div>
            );
          }
          return <p className="text-red-500">{String(error)}</p>;
        })()}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedCrops.length > 0 ? (
          paginatedCrops.map((crop, idx) => (
            <CropCard
              key={crop._id || idx}
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
