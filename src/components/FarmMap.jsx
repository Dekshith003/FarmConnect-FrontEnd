import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "minhaj-react-leaflet-draw";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import { useSelector } from "react-redux";

const DEFAULT_POSITION = [17.385, 78.4867];

function LocationSetter({ onSet }) {
  useMapEvents({
    click(e) {
      onSet([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function FarmMap() {
  // TODO: Replace with real crop categories from backend or Redux store
  const cropCategoriesList = [];

  // Demo fallback for farms
  const demoFarms = [];
  // Load farms from localStorage or use demoFarms
  const [farms, setFarms] = useState(() => {
    const saved = localStorage.getItem("farms");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return demoFarms;
      }
    }
    return demoFarms;
  });
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [newFarmLocation, setNewFarmLocation] = useState(null);
  const [newBoundary, setNewBoundary] = useState(null);
  const [farmForm, setFarmForm] = useState({
    name: "",
    owner: "",
    details: "",
    role: "farmer",
  });
  const [mapCenter, setMapCenter] = useState(DEFAULT_POSITION);
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [farmType, setFarmType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [cropCategory, setCropCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQty, setMinQty] = useState("");
  const [maxQty, setMaxQty] = useState("");
  const featureGroupRef = useRef();

  // Geolocation effect: set userLocation and mapCenter to current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Filtered farms based on search, farmType, and crop filters
  const filteredFarms = farms.filter((farm) => {
    const matchesType = farmType === "all" || farm.role === farmType;
    const matchesSearch =
      farm.name.toLowerCase().includes(search.toLowerCase()) ||
      farm.owner.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !cropCategory ||
      (farm.cropCategories && farm.cropCategories.includes(cropCategory));
    const matchesPrice =
      (minPrice === "" ||
        (farm.cropPrice != null && farm.cropPrice >= Number(minPrice))) &&
      (maxPrice === "" ||
        (farm.cropPrice != null && farm.cropPrice <= Number(maxPrice)));
    const matchesQty =
      (minQty === "" ||
        (farm.cropQuantity != null && farm.cropQuantity >= Number(minQty))) &&
      (maxQty === "" ||
        (farm.cropQuantity != null && farm.cropQuantity <= Number(maxQty)));
    return (
      matchesType &&
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesQty
    );
  });

  // Add new farm marker
  const handleMapClick = (latlng) => {
    setNewFarmLocation(latlng);
    setSelectedFarm(null);
  };

  // Add new farm boundary
  const handleSaveFarm = (e) => {
    e.preventDefault();
    if (newFarmLocation && newBoundary && farmForm.name && farmForm.owner) {
      const newFarm = {
        id: farms.length + 1,
        name: farmForm.name,
        owner: farmForm.owner,
        position: newFarmLocation,
        boundary: newBoundary,
        details: farmForm.details,
        role: farmForm.role || "farmer", // default role
      };
      const updatedFarms = [...farms, newFarm];
      setFarms(updatedFarms);
      localStorage.setItem("farms", JSON.stringify(updatedFarms));
      setNewFarmLocation(null);
      setNewBoundary(null);
      setFarmForm({ name: "", owner: "", details: "", role: "farmer" });
      // Remove drawn polygon after save
      if (featureGroupRef.current) {
        const layers = featureGroupRef.current._layers;
        Object.keys(layers).forEach((key) => {
          const layer = layers[key];
          if (layer instanceof L.Polygon) {
            featureGroupRef.current.removeLayer(layer);
          }
        });
      }
    }
  };

  // Helper to get marker icon by role
  function getMarkerIcon(role) {
    let iconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // default farmer
    if (role === "admin")
      iconUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    if (role === "customer")
      iconUrl = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png";
    return L.icon({ iconUrl, iconSize: [32, 32], iconAnchor: [16, 32] });
  }

  // Set map center to user location
  function handleSetCurrentLocation() {
    if (userLocation) setMapCenter(userLocation);
  }

  // Cancel adding new farm
  function handleCancel() {
    setNewFarmLocation(null);
    setNewBoundary(null);
    setFarmForm({ name: "", owner: "", details: "", role: "farmer" });
  }

  // Handle polygon creation
  function onCreated(e) {
    if (e.layerType === "polygon") {
      const latlngs = e.layer
        .getLatLngs()[0]
        .map((latlng) => [latlng.lat, latlng.lng]);
      setNewBoundary(latlngs);
    }
  }
  function onCreated(e) {
    if (e.layerType === "polygon") {
      const latlngs = e.layer
        .getLatLngs()[0]
        .map((latlng) => [latlng.lat, latlng.lng]);
      setNewBoundary(latlngs);
    }
  }
  // Main render
  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">Farm Map</h1>
        <div className="text-gray-500 mb-6">
          Discover local farms and fresh produce near you
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search farms, crops, or farmers..."
            className="flex-1"
          />
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={farmType}
            onChange={(e) => setFarmType(e.target.value)}
          >
            <option value="all">All Farms</option>
            <option value="farmer">Farmers</option>
            <option value="customer">Customers</option>
            <option value="admin">Admins</option>
          </select>
          <button
            className="border px-3 py-2 rounded-lg text-sm flex items-center gap-1 bg-white"
            onClick={() => setShowFilters((f) => !f)}
          >
            <span>More Filters</span>
            <span className="material-icons text-base">filter_list</span>
          </button>
        </div>
        {showFilters && (
          <FilterPanel
            cropCategory={cropCategory}
            setCropCategory={setCropCategory}
            cropCategoriesList={cropCategoriesList}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minQty={minQty}
            setMinQty={setMinQty}
            maxQty={maxQty}
            setMaxQty={setMaxQty}
          />
        )}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Only show the interactive map and add farm UI, no nearby farmer list */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">Interactive Farm Map</h2>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={handleSetCurrentLocation}
                  type="button"
                >
                  Use My Current Location
                </button>
              </div>
              <div className="w-full h-96 rounded overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={8}
                  style={{ width: "100%", height: "380px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* User marker */}
                  {userLocation && (
                    <Marker
                      position={userLocation}
                      icon={L.icon({
                        iconUrl:
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                      })}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {/* Existing farm markers and boundaries */}
                  {farms.map((farm) =>
                    farm.boundary && farm.boundary.length > 0 ? (
                      <FeatureGroup key={farm.id}>
                        <Marker
                          position={farm.position}
                          icon={getMarkerIcon(farm.role)}
                          eventHandlers={{ click: () => setSelectedFarm(farm) }}
                        >
                          <Popup>
                            <div>
                              <b>{farm.name}</b>
                              <br />
                              <span className="text-xs text-gray-500">
                                Owner:
                              </span>{" "}
                              {farm.owner}
                              <br />
                              {farm.details && (
                                <span>
                                  {farm.details}
                                  <br />
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                Position:
                              </span>{" "}
                              [{farm.position[0].toFixed(5)},{" "}
                              {farm.position[1].toFixed(5)}]<br />
                              <span className="text-xs text-gray-500">
                                Boundary:
                              </span>{" "}
                              {farm.boundary && farm.boundary.length > 0
                                ? `${farm.boundary.length} points`
                                : "N/A"}
                              <br />
                              <span className="text-xs text-gray-500">
                                Role:
                              </span>{" "}
                              {farm.role || "farmer"}
                            </div>
                          </Popup>
                        </Marker>
                        <Polygon
                          positions={farm.boundary}
                          color={
                            selectedFarm && selectedFarm.id === farm.id
                              ? "blue"
                              : "green"
                          }
                        />
                      </FeatureGroup>
                    ) : (
                      <Marker
                        key={farm.id}
                        position={farm.position}
                        icon={getMarkerIcon(farm.role)}
                        eventHandlers={{ click: () => setSelectedFarm(farm) }}
                      >
                        <Popup>
                          <div>
                            <b>{farm.name}</b>
                            <br />
                            <span className="text-xs text-gray-500">
                              Owner:
                            </span>{" "}
                            {farm.owner}
                            <br />
                            {farm.details && (
                              <span>
                                {farm.details}
                                <br />
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              Position:
                            </span>{" "}
                            [{farm.position[0].toFixed(5)},{" "}
                            {farm.position[1].toFixed(5)}]<br />
                            <span className="text-xs text-gray-500">
                              Role:
                            </span>{" "}
                            {farm.role || "customer"}
                          </div>
                        </Popup>
                      </Marker>
                    )
                  )}
                  {/* New farm marker */}
                  {newFarmLocation && (
                    <Marker
                      position={newFarmLocation}
                      icon={getMarkerIcon(farmForm.role)}
                    >
                      <Popup>
                        <div>
                          <b>{farmForm.name || "New Farm"}</b>
                          <br />
                          <span className="text-xs text-gray-500">
                            Owner:
                          </span>{" "}
                          {farmForm.owner || "You"}
                          <br />
                          {farmForm.details && (
                            <span>
                              {farmForm.details}
                              <br />
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Position:
                          </span>{" "}
                          [{newFarmLocation[0].toFixed(5)},{" "}
                          {newFarmLocation[1].toFixed(5)}]<br />
                          <span className="text-xs text-gray-500">
                            Boundary:
                          </span>{" "}
                          {newBoundary && newBoundary.length > 0
                            ? `${newBoundary.length} points`
                            : "N/A"}
                          <br />
                          <span className="text-xs text-gray-500">
                            Role:
                          </span>{" "}
                          {farmForm.role || "farmer"}
                        </div>
                      </Popup>
                    </Marker>
                  )}
                  {/* Draw/edit controls for new farm boundary */}
                  <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                      position="topright"
                      onCreated={onCreated}
                      draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        polygon: newFarmLocation
                          ? { allowIntersection: false, showArea: true }
                          : false,
                      }}
                      edit={{ edit: false, remove: false }}
                    />
                  </FeatureGroup>
                  {/* Allow user to set marker by clicking map */}
                  <LocationSetter onSet={handleMapClick} />
                </MapContainer>
              </div>
              {/* Save/cancel new farm UI with form */}
              {(newFarmLocation || newBoundary) && (
                <form
                  className="mt-4 flex flex-col gap-2 max-w-md"
                  onSubmit={handleSaveFarm}
                >
                  <div className="flex gap-2">
                    <input
                      className="border rounded px-2 py-1 flex-1"
                      type="text"
                      placeholder="Farm Name"
                      value={farmForm.name}
                      onChange={(e) =>
                        setFarmForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                    />
                    <input
                      className="border rounded px-2 py-1 flex-1"
                      type="text"
                      placeholder="Owner Name"
                      value={farmForm.owner}
                      onChange={(e) =>
                        setFarmForm((f) => ({ ...f, owner: e.target.value }))
                      }
                      required
                    />
                    <select
                      className="border rounded px-2 py-1 flex-1"
                      value={farmForm.role || "farmer"}
                      onChange={(e) =>
                        setFarmForm((f) => ({ ...f, role: e.target.value }))
                      }
                    >
                      <option value="farmer">Farmer</option>
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <textarea
                    className="border rounded px-2 py-1"
                    placeholder="Farm Details (optional)"
                    value={farmForm.details}
                    onChange={(e) =>
                      setFarmForm((f) => ({ ...f, details: e.target.value }))
                    }
                    rows={2}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded"
                      type="submit"
                      disabled={
                        !newFarmLocation ||
                        !newBoundary ||
                        !farmForm.name ||
                        !farmForm.owner
                      }
                    >
                      Save Farm
                    </button>
                    <button
                      className="bg-gray-300 px-4 py-2 rounded"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Click on the map to set a new farm location. Draw a polygon to
                set the farm boundary. Click Save to add the farm.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
