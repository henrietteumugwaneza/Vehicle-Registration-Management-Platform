import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Car, LayoutDashboard, LogIn, LogOut, PlusCircle } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "text-indigo-400" : "text-slate-300 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <Car className="text-indigo-400" size={22} />
          <span>VehicleReg</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={`flex items-center gap-1.5 transition-colors ${active("/")}`}>
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className={`flex items-center gap-1.5 transition-colors ${active("/dashboard")}`}>
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link to="/vehicle/new" className={`flex items-center gap-1.5 transition-colors ${active("/vehicle/new")}`}>
                <PlusCircle size={15} />
                Register
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-slate-300 hover:text-red-400 transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          ) : (
            <Link to="/login" className={`flex items-center gap-1.5 transition-colors ${active("/login")}`}>
              <LogIn size={15} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
