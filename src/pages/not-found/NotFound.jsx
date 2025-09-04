import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </p>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-green-700 transition"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}
