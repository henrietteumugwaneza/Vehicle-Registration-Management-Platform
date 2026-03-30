import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye } from "lucide-react";

const statusColors = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400",
  SUSPENDED: "bg-yellow-500/20 text-yellow-400",
  EXPIRED: "bg-red-500/20 text-red-400",
  PENDING: "bg-blue-500/20 text-blue-400",
};

export default function Table({ data }) {
  const { isAuthenticated } = useAuth();

  if (!data?.length) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-lg">No vehicles registered yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-800/60 text-slate-400 text-left">
            <th className="px-4 py-3 font-medium">Plate</th>
            <th className="px-4 py-3 font-medium">Make / Model</th>
            <th className="px-4 py-3 font-medium">Year</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Status</th>
            {isAuthenticated && <th className="px-4 py-3 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.map((v) => (
            <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
              <td className="px-4 py-3 font-mono text-indigo-300">{v.plateNumber || "—"}</td>
              <td className="px-4 py-3 text-slate-200">
                {v.manufacture} {v.model}
              </td>
              <td className="px-4 py-3 text-slate-300">{v.year}</td>
              <td className="px-4 py-3 text-slate-300">{v.vehicleType}</td>
              <td className="px-4 py-3">
                <span className={`badge ${statusColors[v.status] || "bg-slate-700 text-slate-300"}`}>
                  {v.status || "—"}
                </span>
              </td>
              {isAuthenticated && (
                <td className="px-4 py-3">
                  <Link
                    to={`/vehicle/${v.id}`}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
