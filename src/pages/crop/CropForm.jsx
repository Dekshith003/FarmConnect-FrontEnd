import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCrop } from "../../features/crop/cropThunks";
import { useNavigate, useParams } from "react-router-dom";

export default function CropForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { crops, loading, error, success } = useSelector((state) => state.crop);

  // Clear success message on mount/unmount
  useEffect(() => {
    dispatch({ type: "crop/clearCropMessage" });
    return () => {
      dispatch({ type: "crop/clearCropMessage" });
    };
  }, [dispatch]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    customCategory: "",
    description: "",
    quantity: "",
    unit: "kg",
    price: "",
    city: "",
    state: "",
    images: [],
    previewImages: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle custom category input
  const handleCustomCategoryChange = (e) => {
    setForm((prev) => ({
      ...prev,
      customCategory: e.target.value,
      category: "custom",
    }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: files,
      previewImages: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    // If custom category is selected, use its value
    if (form.category === "custom" && form.customCategory.trim()) {
      formData.append("category", form.customCategory.trim());
    } else {
      formData.append("category", form.category);
    }
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("unit", form.unit);
    formData.append("price", form.price);
    formData.append("city", form.city);
    formData.append("state", form.state);
    form.images.forEach((img) => formData.append("images", img));

    const resultAction = await dispatch(createCrop(formData));
    if (createCrop.fulfilled.match(resultAction)) {
      setForm({
        name: "",
        category: "",
        customCategory: "",
        description: "",
        quantity: "",
        unit: "kg",
        price: "",
        city: "",
        state: "",
        images: [],
        previewImages: [],
      });
      navigate("/crops");
      dispatch({ type: "crop/clearCropMessage" });
    }
  };

  const cropCategoriesList = useMemo(() => {
    let arr = [];
    if (Array.isArray(crops)) {
      arr = crops;
    } else if (crops && Array.isArray(crops.crops)) {
      arr = crops.crops;
    }
    // Only include non-empty, non-null, non-undefined, non-duplicate categories
    const unique = Array.from(
      new Set(
        arr
          .map((crop) =>
            typeof crop.category === "string" ? crop.category.trim() : ""
          )
          .filter((cat) => cat && cat.length > 0)
      )
    );
    if (unique.length > 0) {
      return unique;
    }
    return [
      "Cereals",
      "Pulses",
      "Vegetables",
      "Fruits",
      "Oilseeds",
      "Spices",
      "Flowers",
      "Other",
    ];
  }, [crops]);

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">Add Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Crop Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="" disabled>
              Select category
            </option>
            {cropCategoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="custom">Other (Custom Category)</option>
          </select>
          {form.category === "custom" && (
            <input
              type="text"
              name="customCategory"
              value={form.customCategory}
              onChange={handleCustomCategoryChange}
              placeholder="Enter custom category"
              className="w-full border px-3 py-2 rounded mt-2"
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block font-medium mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="unit" className="block font-medium mb-1">
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="quintal">quintal</option>
            <option value="ton">ton</option>
            <option value="litre">litre</option>
            <option value="ml">ml</option>
            <option value="piece">piece</option>
            <option value="dozen">dozen</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border px-3 py-2 rounded mb-2"
            required
          />
          <label className="block font-medium mb-1">State</label>
          <input
            id="state"
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="images" className="block font-medium mb-1">
            Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {form.previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
        >
          Add Crop
        </button>
      </form>
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
                    {typeof err === "string"
                      ? err
                      : err && typeof err === "object" && err.message
                      ? err.message
                      : JSON.stringify(err)}
                  </li>
                ))}
              </ul>
            );
          }
          if (typeof error === "object" && error !== null) {
            // If error has a message property, show it
            if (error.message) {
              return (
                <div className="text-red-500 text-sm mt-2">{error.message}</div>
              );
            }
            // If error has errors array, show each
            if (Array.isArray(error.errors) && error.errors.length > 0) {
              return (
                <ul className="text-red-500 text-sm mt-2 list-disc list-inside">
                  {error.errors.map((err, idx) => (
                    <li key={idx}>
                      {err.msg ||
                        (err.message ? err.message : JSON.stringify(err))}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <div className="text-red-500 text-sm mt-2">
                {JSON.stringify(error)}
              </div>
            );
          }
          // fallback for any other type
          return <p className="text-red-500">{String(error)}</p>;
        })()}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
