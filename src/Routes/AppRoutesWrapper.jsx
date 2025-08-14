import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireRole from "./RequireRole";
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
import MarketplacePage from "../pages/market/MarketplacePage";
import { navigationLinks } from "../utils/Constants";

const AppRoutes = [
  { index: true, element: <Home /> },
  { path: navigationLinks.about.path, element: <AboutUs /> },
  { path: navigationLinks.contact.path, element: <ContactUs /> },
  { path: navigationLinks.faq.path, element: <FAQ /> },
  {
    path: navigationLinks.marketplace.path,
    element: <MarketplacePage />,
  },
  { path: "/weather-dashboard", element: <WeatherDashboard /> },
  { path: navigationLinks.register.path, element: <Register /> },
  { path: navigationLinks.login.path, element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <RequireRole allowedRoles={["admin"]}>
        <DashboardPage />
      </RequireRole>
    ),
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: AppRoutes,
  },
]);

export default function AppRoutesWrapper() {
  return <RouterProvider router={router} />;
}
