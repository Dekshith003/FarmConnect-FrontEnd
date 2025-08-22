import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCropRecommendations } from "../../features/ai/aiThunks";

const selectCropRecommendations = (state) => {
  const ai = state.ai || {};
  return ai.cropRecommendations || { data: [], loading: false, error: null };
};

export default function CropRecommendations({ onRecommendation }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(selectCropRecommendations);
  console.log("Crop Recommendations State:", data);
  const [form, setForm] = useState({
    farmerName: "",
    location: "",
    season: "",
    cropHistory: "",
  });
  // Track if form has been submitted
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(
      fetchCropRecommendations({
        farmerName: form.farmerName,
        location: form.location,
        season: form.season,
        cropHistory: form.cropHistory.split(",").map((c) => c.trim()),
      })
    );
  };

  // Pass recommendations up to parent when available
  useEffect(() => {
    // Defensive extraction for nested recommendations
    let recText = "";
    if (submitted && data && data.data) {
      // Handles: {recommendations: {recommendations: "..."}}
      if (
        typeof data.data.recommendations === "object" &&
        data.data.recommendations.recommendations
      ) {
        recText = data.data.recommendations.recommendations;
      } else if (typeof data.data.recommendations === "string") {
        recText = data.data.recommendations;
      }
      console.log("Crop Recommendations API response:", recText);
      if (typeof onRecommendation === "function") {
        onRecommendation(recText);
      }
    }
    // If error, clear recommendations in parent
    if (error && typeof onRecommendation === "function") {
      onRecommendation("");
    }
    // Hide recommendations if not submitted
    if (!submitted && typeof onRecommendation === "function") {
      onRecommendation("");
    }
  }, [data, error, onRecommendation, submitted]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">AI Crop Recommendations</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-1">Farmer Name</label>
          <input
            type="text"
            name="farmerName"
            value={form.farmerName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Season</label>
          <input
            type="text"
            name="season"
            value={form.season}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Crop History (comma separated)
          </label>
          <input
            type="text"
            name="cropHistory"
            value={form.cropHistory}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition"
          disabled={loading}
          onSubmit={handleSubmit}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* No recommendations shown here, only in parent */}
    </div>
  );
}
