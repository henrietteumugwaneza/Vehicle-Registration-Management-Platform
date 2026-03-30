import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Car, PlusCircle, Trash2, Eye, Edit, AlertTriangle,
  Activity, CheckCircle, XCircle, Clock, RefreshCw,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value ?? "—"}</p>
      </div>
    </div>
  );
}

function DeleteModal({ vehicle, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="card max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <AlertTriangle className="text-red-400" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-white">Delete Vehicle</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">
            {vehicle.manufacture} {vehicle.model}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="btn-danger">
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => api.get("/vehicle").then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/vehicle/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle deleted successfully");
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete vehicle"),
  });

  const stats = {
    total: data?.length ?? 0,
    active: data?.filter((v) => v.registrationStatus === "ACTIVE").length ?? 0,
    expired: data?.filter((v) => v.registrationStatus === "EXPIRED").length ?? 0,
    pending: data?.filter((v) => v.registrationStatus === "PENDING").length ?? 0,
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {deleteTarget && (
        <DeleteModal
          vehicle={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteMutation.isPending}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage all registered vehicles</p>
          </div>
          <Link to="/vehicle/new" className="btn-primary inline-flex items-center gap-2">
            <PlusCircle size={16} />
            Register Vehicle
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Car} label="Total Vehicles" value={stats.total} color="bg-indigo-500/20 text-indigo-400" />
          <StatCard icon={CheckCircle} label="Active" value={stats.active} color="bg-emerald-500/20 text-emerald-400" />
          <StatCard icon={XCircle} label="Expired" value={stats.expired} color="bg-red-500/20 text-red-400" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} color="bg-yellow-500/20 text-yellow-400" />
        </div>

        {/* Vehicle Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              All Vehicles
            </h2>
            <button onClick={() => refetch()} className="text-slate-400 hover:text-white transition-colors">
              <RefreshCw size={16} />
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12 text-slate-500">
              <RefreshCw size={18} className="animate-spin mr-2" />
              Loading…
            </div>
          )}

          {isError && (
            <p className="text-center py-10 text-red-400">Failed to load vehicles.</p>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-left border-b border-slate-800">
                    <th className="pb-3 font-medium">Plate</th>
                    <th className="pb-3 font-medium">Make / Model</th>
                    <th className="pb-3 font-medium">Year</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Vehicle</th>
                    <th className="pb-3 font-medium">Registration</th>
                    <th className="pb-3 font-medium">Insurance</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data?.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-mono text-indigo-300 text-xs">{v.plateNumber || "—"}</td>
                      <td className="py-3 text-slate-200">{v.manufacture} {v.model}</td>
                      <td className="py-3 text-slate-400">{v.year}</td>
                      <td className="py-3">
                        <StatusBadge value={v.vehicleType} />
                      </td>
                      <td className="py-3">
                        <StatusBadge value={v.vehicleStatus} />
                      </td>
                      <td className="py-3">
                        <StatusBadge value={v.registrationStatus} />
                      </td>
                      <td className="py-3">
                        <StatusBadge value={v.insuranceStatus} />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            to={`/vehicle/${v.id}`}
                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                            title="View"
                          >
                            <Eye size={15} />
                          </Link>
                          <Link
                            to={`/vehicle/${v.id}/edit`}
                            className="text-slate-400 hover:text-yellow-400 transition-colors"
                            title="Edit"
                          >
                            <Edit size={15} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(v)}
                            className="text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data?.length && (
                <p className="text-center py-10 text-slate-500">No vehicles yet. Register one!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
