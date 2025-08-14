import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPestDetection } from "../../features/pest/pestThunks";

export default function PestDetection() {
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector((state) => state.pest);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [history, setHistory] = useState([]);

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

  React.useEffect(() => {
    // Only add to history if result is not null and file is present
    if (result && file) {
      setHistory((prev) => [
        {
          image: preview,
          result,
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }
    // eslint-disable-next-line
  }, [result]);

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
            const pest = item.result;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-lg text-gray-800">
                      {pest.pestName || "Unknown Pest"}
                    </span>
                    <span className="block text-gray-500 text-xs mt-1">
                      {pest.cropLocation || pest.cropName || "Location Unknown"}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pest.severity === "High"
                        ? "bg-red-100 text-red-600"
                        : pest.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {pest.severity ? pest.severity.toUpperCase() : "LOW"}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-40 mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs">
                    Confidence:{" "}
                    <span className="font-bold">
                      {pest.confidence ? `${pest.confidence}%` : "N/A"}
                    </span>
                  </span>
                  <span className="text-gray-600 text-xs">
                    Detected: <span className="font-bold">{item.time}</span>
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 text-sm block mb-1">
                    Treatment Recommendations:
                  </span>
                  {pest.suggestions && pest.suggestions.length > 0 ? (
                    <ul className="list-disc pl-5 text-green-700 text-xs">
                      {pest.suggestions.map((s, i) => (
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
