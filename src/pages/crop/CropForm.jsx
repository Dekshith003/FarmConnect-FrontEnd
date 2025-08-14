import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCrop, editCrop } from "../../features/crop/cropThunks";
import { useNavigate, useParams } from "react-router-dom";

export default function CropForm({ isEdit = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { crops, loading, error, success } = useSelector((state) => state.crop);
  const cropToEdit = isEdit ? crops.find((c) => c._id === id) : null;

  const [form, setForm] = useState({
    name: cropToEdit?.name || "",
    category: cropToEdit?.category || "",
    description: cropToEdit?.description || "",
    quantity: cropToEdit?.quantity || 0,
    unit: cropToEdit?.unit || "kg",
    price: cropToEdit?.price || 0,
    location: cropToEdit?.location || { type: "Point", coordinates: [0, 0] },
    images: cropToEdit?.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: files.map((file) => URL.createObjectURL(file)), // For preview only
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (isEdit) {
      dispatch(editCrop({ id, cropData: payload }));
    } else {
      dispatch(createCrop(payload));
    }
    navigate("/crop/list");
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">
        {isEdit ? "Edit Crop" : "Add Crop"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Crop Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Unit (e.g. kg)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={JSON.stringify(form.location)}
          onChange={(e) => {
            try {
              setForm((prev) => ({
                ...prev,
                location: JSON.parse(e.target.value),
              }));
            } catch {
              // ignore parse error
            }
          }}
          placeholder='Location as {"type":"Point","coordinates":[lng,lat]}'
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex gap-2 flex-wrap">
          {form.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Preview"
              className="w-16 h-16 object-cover rounded"
              loading="lazy"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
        >
          {isEdit ? "Update Crop" : "Add Crop"}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
