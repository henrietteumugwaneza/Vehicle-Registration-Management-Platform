import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import VehicleForm from "../pages/VehicleForm";
import VehicleDetails from "../pages/VehicleDetails";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/vehicle/new",
    element: (
      <ProtectedRoute>
        <VehicleForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/vehicle/:id",
    element: (
      <ProtectedRoute>
        <VehicleDetails />
      </ProtectedRoute>
    ),
  },
]);