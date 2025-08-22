import React, { useEffect, useState } from "react";

// IMD Telangana RSS feed (HTML, not pure XML, so we parse as text)
const IMD_TELANGANA_RSS =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://mausam.imd.gov.in/rss/all_india_warnings.xml");

export default function WeatherAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch(IMD_TELANGANA_RSS);
        const text = await res.text();
        // Parse RSS XML
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = Array.from(xml.querySelectorAll("item"));
        // Filter for Telangana or Hyderabad in title/description
        const telanganaAlerts = items
          .filter((item) => {
            const title = item.querySelector("title")?.textContent || "";
            const desc = item.querySelector("description")?.textContent || "";
            return /telangana|hyderabad/i.test(title + desc);
          })
          .map((item) => ({
            title: item.querySelector("title")?.textContent,
            description: item.querySelector("description")?.textContent,
            pubDate: item.querySelector("pubDate")?.textContent,
            link: item.querySelector("link")?.textContent,
          }));
        setAlerts(telanganaAlerts);
      } catch (err) {
        setError("Failed to fetch IMD alerts.");
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-red-700">
        Weather Alerts (IMD Telangana)
      </h2>
      {loading && <div>Loading alerts...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && alerts.length === 0 && (
        <div className="text-gray-500">No current alerts for Telangana.</div>
      )}
      <ul className="space-y-2">
        {alerts.map((alert, idx) => (
          <li key={idx} className="border-l-4 border-red-400 pl-2">
            <div className="font-semibold">{alert.title}</div>
            <div className="text-xs text-gray-600 mb-1">{alert.pubDate}</div>
            <div
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: alert.description }}
            />
            {alert.link && (
              <a
                href={alert.link}
                className="text-blue-600 text-xs underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                More info
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
