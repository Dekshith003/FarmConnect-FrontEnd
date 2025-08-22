import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/dashboard/DashboardPage";
import WeatherDashboard from "../pages/dashboard/WeatherDashboard";
import MainLayout from "../components/Layout/mainLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import NotFound from "../pages/not-found/NotFound";
import Register from "../pages/auth/register";
import Login from "../pages/auth/Login";
import VerifyOtp from "../pages/auth/VerifyOtp";
import { navigationLinks } from "../utils/Constants";
import FarmMap from "../components/FarmMap";
import PestDetection from "../pages/pest-detection/PestDetection";
import CropRecommendations from "../pages/ai/CropRecommendations";
import Predict from "../pages/ai/Predict";
import Recommend from "../pages/ai/Recommend";
import CropManagementPage from "../pages/crop/CropManagementPage";
import CropForm from "../pages/crop/CropForm";
import Profile from "../pages/profile/profile";
import MarketplacePage from "../pages/market/MarketplacePage";

// Public (no auth required)
const publicRoutes = [
  { index: true, element: <Home /> },
  { path: navigationLinks.about.path, element: <AboutUs /> },
  { path: navigationLinks.contact.path, element: <ContactUs /> },
  { path: navigationLinks.faq.path, element: <FAQ /> },
  { path: navigationLinks.marketplace.path, element: <MarketplacePage /> },
  { path: "/weather-dashboard", element: <WeatherDashboard /> },
  { path: navigationLinks.register.path, element: <Register /> },
  { path: navigationLinks.login.path, element: <Login /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "*", element: <NotFound /> },
];

// Farmer routes (auth only)
const farmerRoutes = [
  {
    path: navigationLinks.cropManagement.path,
    element: <CropManagementPage />,
  },
  {
    path: "/crops/add",
    element: <CropForm />,
  },
  {
    path: "/pest-detection",
    element: <PestDetection />,
  },
];

const aiRoutes = [
  {
    path: navigationLinks.aiCropRecommendations.path,
    element: (
      <ProtectedRoute>
        <CropRecommendations />
      </ProtectedRoute>
    ),
  },
  {
    path: navigationLinks.aiPredict.path,
    element: (
      <ProtectedRoute>
        <Predict />
      </ProtectedRoute>
    ),
  },
  {
    path: navigationLinks.aiRecommend.path,
    element: (
      <ProtectedRoute>
        <Recommend />
      </ProtectedRoute>
    ),
  },
];

const protectedRoutes = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  { path: navigationLinks.map.path, element: <FarmMap /> },
  { path: "/pest-detection", element: <PestDetection /> },
  {
    path: navigationLinks.aiCropRecommendations.path,
    element: <CropRecommendations />,
  },
  { path: navigationLinks.aiPredict.path, element: <Predict /> },
  { path: navigationLinks.aiRecommend.path, element: <Recommend /> },
  {
    path: navigationLinks.profile.path,
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...publicRoutes,
      ...aiRoutes,
      ...[...farmerRoutes, ...protectedRoutes].map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      })),
    ],
  },
]);

export default function AppRoutesWrapper() {
  return <RouterProvider router={router} />;
}
