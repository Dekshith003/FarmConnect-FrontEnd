import React, { useEffect } from "react";
export default function WeatherWidget() {
  const [weather, setWeather] = React.useState(null);
  const [forecast, setForecast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Get browser location and fetch weather from OpenWeatherMap
  React.useEffect(() => {
    const API_KEY = "b8603bcaa7040db8fc80ebd88fe4c5a2";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          try {
            setLoading(true);
            // Current weather
            const resWeather = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const weatherData = await resWeather.json();
            setWeather(weatherData);
            // 7-day forecast (One Call API)
            const resForecast = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
            );
            const forecastData = await resForecast.json();
            setForecast(forecastData.daily || []);
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch weather data.");
            setLoading(false);
          }
        },
        () => {
          setError("Unable to get location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold">Weather Forecast</h2>
        <img
          src="https://res.cloudinary.com/di73dum6d/image/upload/v1756893417/thunder_zjbuos.png"
          alt="Weather Icon"
          style={{ width: 32, height: 32 }}
        />
      </div>
      {loading && <div>Loading weather...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {weather && weather.weather && weather.weather[0] && (
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl">
              {/* Weather icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </span>
            <div>
              <span className="text-3xl font-bold">
                {weather.main ? Math.round(weather.main.temp) : "--"}°C
              </span>
              <div className="text-gray-600">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-2">
            <div>
              Humidity{" "}
              <span className="font-bold">
                {weather.main?.humidity ?? "--"}%
              </span>
            </div>
            <div>
              Wind{" "}
              <span className="font-bold">
                {weather.wind?.speed ?? "--"} m/s
              </span>
            </div>
            <div>
              Visibility{" "}
              <span className="font-bold">
                {weather.visibility ? weather.visibility / 1000 : "--"} km
              </span>
            </div>
            <div>
              Pressure{" "}
              <span className="font-bold">
                {weather.main?.pressure ?? "--"} hPa
              </span>
            </div>
          </div>
        </div>
      )}
      {forecast.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-2">7-Day Forecast</h3>
          <div className="flex gap-4 flex-wrap">
            {forecast.slice(0, 7).map((day, idx) =>
              day.weather && day.weather[0] ? (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-[#f3f3e6] rounded-lg px-4 py-2 min-w-[120px] mb-2"
                >
                  <span className="text-2xl mb-1">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="icon"
                    />
                  </span>
                  <span className="font-bold text-lg">
                    {day.temp ? Math.round(day.temp.day) : "--"}°C
                  </span>
                  <span className="text-sm text-gray-700">
                    {day.weather[0].description}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {day.dt
                      ? new Date(day.dt * 1000).toLocaleDateString(undefined, {
                          weekday: "long",
                        })
                      : ""}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
