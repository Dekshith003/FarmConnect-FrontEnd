import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPestDetection,
  fetchPestHistory,
  fetchPestTreatment,
} from "../../features/pest/pestThunks";

export default function PestDetection() {
  const dispatch = useDispatch();
  const {
    result,
    loading,
    error,
    history,
    treatment,
    treatmentLoading,
    treatmentError,
  } = useSelector((state) => state.pest);
  // Fetch treatment recommendations after successful detection
  useEffect(() => {
    if (result && result.data) {
      dispatch(
        fetchPestTreatment({
          pestName: result.data.pestName || result.data.pest_name,
          labels: result.data.labels,
          webEntities: result.data.webEntities,
        })
      );
    }
  }, [result]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    dispatch(fetchPestDetection(formData));
  };

  useEffect(() => {
    dispatch(fetchPestHistory());
  }, [dispatch]);

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 px-2 sm:px-0 flex flex-col items-center">
      {/* Upload Card */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="inline-block">
            <svg width="22" height="22" fill="none" stroke="#4b5563">
              <circle cx="11" cy="11" r="10" strokeWidth="2" />
            </svg>
          </span>
          Pest Detection Analysis
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Upload an image of your crop to detect pests and get treatment
          recommendations
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <label
            htmlFor="file-upload"
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-[#faf9f6] hover:bg-gray-50 mb-4"
          >
            <span className="text-4xl text-gray-400 mb-2">
              <svg width="40" height="40" fill="none" stroke="#b8b8b8">
                <path d="M20 28V12M12 20h16" strokeWidth="2" />
              </svg>
            </span>
            <span className="text-gray-600 font-medium">Upload Crop Image</span>
            <span className="text-xs text-gray-400">
              Click to select or drag and drop an image of your crop
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {preview && (
            <div className="mb-4 w-full flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded shadow"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold transition mb-2"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {result && (
          <div className="mt-4 text-green-700">
            <h3 className="font-semibold">Detection Result:</h3>
            <p>
              {typeof result.message === "object"
                ? JSON.stringify(result.message)
                : result.message}
            </p>
          </div>
        )}
        {result && result.data && (
          <div className="w-full mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-2">
              Detection Details
            </h4>

            {result &&
              typeof result === "object" &&
              result.success === false && (
                <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded">
                  <div className="text-red-700 font-semibold mb-1">
                    Error Details:
                  </div>
                  <div className="text-xs text-red-800">
                    <div>
                      <span className="font-medium">Success:</span>{" "}
                      {String(result.success)}
                    </div>
                    <div>
                      <span className="font-medium">Message:</span>{" "}
                      {result.message || "-"}
                    </div>
                    {result.stack && (
                      <div>
                        <span className="font-medium">Stack:</span>{" "}
                        <pre className="whitespace-pre-wrap break-all">
                          {result.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            <div className="mb-2">
              <span className="font-medium">Message:</span>{" "}
              {typeof result.message === "object"
                ? JSON.stringify(result.message)
                : result.message || "-"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Pest Name:</span>{" "}
              {result.data.pestName || result.data.pest_name || "-"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Labels:</span>{" "}
              {Array.isArray(result.data.labels) &&
              result.data.labels.length > 0 ? (
                <ul className="list-disc pl-5 text-green-700 text-xs">
                  {result.data.labels.map((label, i) => (
                    <li key={i}>
                      {label.description}{" "}
                      {typeof label.score === "number" &&
                        `(${Math.round(label.score * 100)}%)`}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ml-2 text-gray-500">None</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-medium">Treatment Recommendations:</span>{" "}
              {treatmentLoading ? (
                <span className="ml-2 text-gray-500">Loading...</span>
              ) : treatmentError ? (
                <span className="ml-2 text-red-500">
                  {typeof treatmentError === "string"
                    ? treatmentError
                    : treatmentError?.message || "Error"}
                </span>
              ) : Array.isArray(treatment) && treatment.length > 0 ? (
                <ul className="list-disc pl-5 text-green-700 text-xs">
                  {treatment.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <span className="ml-2 text-gray-500">None</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-medium">Web Entities:</span>{" "}
              {Array.isArray(result.data.webEntities) &&
              result.data.webEntities.length > 0 ? (
                <ul className="list-disc pl-5 text-green-700 text-xs">
                  {result.data.webEntities.map((entity, i) => (
                    <li key={i}>
                      {entity.description || "Entity"}{" "}
                      {typeof entity.score === "number" &&
                        `(${Math.round(entity.score * 100)}%)`}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ml-2 text-gray-500">None</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-medium">Is Healthy:</span>{" "}
              {result.data.health_assessment?.is_healthy ? "Yes" : "No"}
              {typeof result.data.health_assessment?.is_healthy_probability ===
                "number" && (
                <span className="ml-2 text-xs text-gray-500">
                  (Confidence:{" "}
                  {Math.round(
                    result.data.health_assessment.is_healthy_probability * 100
                  )}
                  %)
                </span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-medium">Detected Diseases:</span>{" "}
              {Array.isArray(result.data.diseases) &&
              result.data.diseases.length > 0 ? (
                <ul className="list-disc pl-5 text-green-700 text-xs">
                  {result.data.diseases.map((d, i) => (
                    <li key={i}>
                      <span className="font-semibold">{d.name}</span>
                      {typeof d.probability === "number" && (
                        <span className="ml-2">
                          ({Math.round(d.probability * 100)}%)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ml-2 text-gray-500">None</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-medium">Is Plant:</span>{" "}
              {result.data.is_plant ? "Yes" : "No"}
              {typeof result.data.is_plant_probability === "number" && (
                <span className="ml-2 text-xs text-gray-500">
                  (Confidence:{" "}
                  {Math.round(result.data.is_plant_probability * 100)}%)
                </span>
              )}
            </div>
            {Array.isArray(result.data.images) &&
              result.data.images.length > 0 && (
                <div className="mb-2">
                  <span className="font-medium">Uploaded Image:</span>
                  <img
                    src={
                      result.data.images[0]?.imageUrl
                        ? `http://localhost:5001${result.data.images[0].imageUrl}`
                        : result.data.images[0]?.file_name
                        ? `http://localhost:5001/uploads/pest-images/${result.data.images[0].file_name}`
                        : ""
                    }
                    alt="Uploaded"
                    className="h-32 mt-2 rounded shadow border"
                  />
                </div>
              )}
          </div>
        )}
      </div>
      {/* Detection History */}
      <div className="w-full max-w-6xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="inline-block">
            <svg width="20" height="20" fill="none" stroke="#4b5563">
              <path d="M3 11V7a8 8 0 0116 0v4" strokeWidth="2" />
            </svg>
          </span>
          Detection History
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.length === 0 && (
            <div className="col-span-2 text-gray-400 text-center py-8">
              No detection history yet.
            </div>
          )}
          {history.map((item, idx) => {
            let imageSrc = item.imageUrl
              ? `http://localhost:5001${item.imageUrl}`
              : null;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-lg text-gray-800">
                      {item.pestName || item.pest_name || "Unknown Pest"}
                    </span>
                    <span className="block text-gray-500 text-xs mt-1">
                      {item.cropLocation || item.cropName || "Location Unknown"}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.severity === "High"
                        ? "bg-red-100 text-red-600"
                        : item.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.severity ? item.severity.toUpperCase() : "LOW"}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-40 mb-4">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Detected Pest"
                      className="h-36 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-3xl">
                      <svg width="32" height="32" fill="none" stroke="#b8b8b8">
                        <circle cx="16" cy="16" r="15" strokeWidth="2" />
                        <path d="M16 22v-8M12 16h8" strokeWidth="2" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Labels:</span>{" "}
                  {Array.isArray(item.labels) && item.labels.length > 0 ? (
                    <ul className="list-disc pl-5 text-green-700 text-xs">
                      {item.labels.map((label, i) => (
                        <li key={i}>
                          {label.description}{" "}
                          {typeof label.score === "number" &&
                            `(${Math.round(label.score * 100)}%)`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">None</span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Suggestions:</span>{" "}
                  {Array.isArray(item.suggestions) &&
                  item.suggestions.length > 0 ? (
                    <ul className="list-disc pl-5 text-green-700 text-xs">
                      {item.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">None</span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Web Entities:</span>{" "}
                  {Array.isArray(item.webEntities) &&
                  item.webEntities.length > 0 ? (
                    <ul className="list-disc pl-5 text-green-700 text-xs">
                      {item.webEntities.map((entity, i) => (
                        <li key={i}>
                          {entity.description || "Entity"}{" "}
                          {typeof entity.score === "number" &&
                            `(${Math.round(entity.score * 100)}%)`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">None</span>
                  )}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs">
                    Confidence:{" "}
                    <span className="font-bold">
                      {item.confidence ? `${item.confidence}%` : "N/A"}
                    </span>
                  </span>
                  <span className="text-gray-600 text-xs">
                    Detected:{" "}
                    <span className="font-bold">
                      {item.detectedAt
                        ? new Date(item.detectedAt).toLocaleString()
                        : "Unknown"}
                    </span>
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 text-sm block mb-1">
                    Treatment Recommendations:
                  </span>{" "}
                  {item.suggestions && item.suggestions.length > 0 ? (
                    <ul className="list-disc pl-5 text-green-700 text-xs">
                      {item.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No recommendations available.
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-semibold">
                    View Details
                  </button>
                  <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs font-semibold">
                    Mark Treated
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
