import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { Car, Search, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => api.get("/vehicle").then((res) => res.data),
  });

  const filtered = data?.filter((v) =>
    `${v.manufacture} ${v.model} ${v.plateNumber} ${v.vehicleType}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <Car size={12} />
          Vehicle Registration Platform
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
          Manage Your Fleet
        </h1>
        <p className="text-slate-400 max-w-md mx-auto mb-6">
          A centralized platform for vehicle registration, ownership tracking, and compliance management.
        </p>
        <Link to="/login" className="btn-primary inline-flex items-center gap-2">
          Get Started →
        </Link>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Registered Vehicles</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {data ? `${data.length} vehicles found` : "Loading…"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search vehicles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9 w-56 text-sm"
              />
            </div>
            <button onClick={() => refetch()} className="btn-secondary p-2.5" title="Refresh">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <RefreshCw size={20} className="animate-spin mr-2" />
            Loading vehicles…
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-red-400">
            Failed to load vehicles.{" "}
            <button onClick={() => refetch()} className="underline">Retry</button>
          </div>
        )}

        {!isLoading && !isError && <Table data={filtered} />}
      </div>
    </div>
  );
}
