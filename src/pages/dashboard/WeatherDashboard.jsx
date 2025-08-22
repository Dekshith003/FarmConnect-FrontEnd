import React, { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import WeatherAlerts from "../../components/WeatherAlerts";
import FarmMap from "../../components/FarmMap";

const OPENWEATHER_API_KEY = "b8603bcaa7040db8fc80ebd88fe4c5a2";

function groupForecastByDay(list) {
  // Group 3-hour forecast data into days
  const days = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString();
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(item);
  });
  // For each day, pick the mid-day or first item as representative
  return Object.entries(days).map(([date, items]) => {
    // Pick the item closest to 12:00 or just the first
    const midDay = items.reduce((prev, curr) => {
      const prevHour = new Date(prev.dt * 1000).getHours();
      const currHour = new Date(curr.dt * 1000).getHours();
      return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
    }, items[0]);
    return { ...midDay, date };
  });
}

export default function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Current weather (free endpoint)
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
          );
          const weatherData = await weatherRes.json();
          setCurrentWeather(weatherData);

          // 5-day/3-hour forecast (free endpoint)
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
          );
          const forecastData = await forecastRes.json();
          if (Array.isArray(forecastData.list)) {
            setForecast(groupForecastByDay(forecastData.list));
          } else {
            setForecast([]);
          }
        } catch (err) {
          setError("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 px-2 sm:px-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1 text-gray-900">
            Weather Dashboard
          </h1>
          <p className="text-gray-600 mb-4">
            Real-time weather data and farming insights
          </p>
        </div>
        {/* IMD Telangana Weather Alerts */}
        <WeatherAlerts />
        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4">
          <WeatherWidget
            weather={currentWeather}
            loading={loading}
            error={error}
          />
        </div>
        {/* Multi-day Forecast from free API */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg font-bold mb-2">Forecast</h2>
          {loading && <div>Loading forecast...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && forecast.length === 0 && (
            <div className="text-gray-500">No forecast data.</div>
          )}
          <div className="space-y-2">
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 px-2 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].main}
                      className="w-8 h-8 inline"
                    />
                  </span>
                  <span className="font-semibold text-gray-800">
                    {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                      weekday: "long",
                    })}
                  </span>
                </div>
                <div className="text-gray-700 text-sm">
                  Temp{" "}
                  <span className="font-bold">
                    {Math.round(day.main.temp)}°C
                  </span>
                </div>
                <div className="text-blue-600 text-xs">
                  {day.rain ? `Rain ${Math.round(day.rain)}mm` : "No rain"}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Weather Map (OpenWeatherMap widget for Telangana) */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Weather Map</h2>
          <div className="w-full h-56 sm:h-80 rounded flex items-center justify-center">
            <iframe
              title="OpenWeatherMap"
              src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=17.385&lon=78.4867&zoom=7"
              width="100%"
              height="100%"
              className="rounded-lg min-h-[220px] sm:min-h-[320px]"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>

        {/* Soil Stats (static) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center w-full">
            <span className="text-3xl text-red-400 mb-2">🌡️</span>
            <div className="font-bold text-xl">Soil Temperature</div>
            <div className="text-2xl font-bold mt-1">18°C</div>
            <div className="text-gray-500 text-sm mt-1">
              Optimal for planting
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center w-full">
            <span className="text-3xl text-blue-400 mb-2">💧</span>
            <div className="font-bold text-xl">Soil Moisture</div>
            <div className="text-2xl font-bold mt-1">45%</div>
            <div className="text-gray-500 text-sm mt-1">
              Good moisture levels
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center w-full">
            <span className="text-3xl text-yellow-400 mb-2">☀️</span>
            <div className="font-bold text-xl">Growing Degree Days</div>
            <div className="text-2xl font-bold mt-1">145</div>
            <div className="text-gray-500 text-sm mt-1">This season</div>
          </div>
        </div>
      </div>
    </div>
  );
}
