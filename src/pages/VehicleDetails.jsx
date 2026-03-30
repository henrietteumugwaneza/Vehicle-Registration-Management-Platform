import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import StatusBadge from "../components/StatusBadge";
import toast from "react-hot-toast";
import { useState } from "react";
import { Edit, Trash2, ArrowLeft, AlertTriangle, RefreshCw } from "lucide-react";

const STATUS_KEYS = new Set(["vehicleStatus", "registrationStatus", "insuranceStatus", "vehicleType"]);

function DetailRow({ label, value, fieldKey }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-800 last:border-0">
      <span className="text-slate-400 text-sm w-48 shrink-0">{label}</span>
      {STATUS_KEYS.has(fieldKey) ? (
        <StatusBadge value={String(value)} />
      ) : (
        <span className="text-slate-100 text-sm font-medium mt-0.5 sm:mt-0">{String(value)}</span>
      )}
    </div>
  );
}

function Section({ title, data, fields }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">{title}</h3>
      <div className="card">
        {fields.map(({ label, key }) => (
          <DetailRow key={key} label={label} value={data?.[key]} fieldKey={key} />
        ))}
      </div>
    </div>
  );
}

function TabContent({ queryKey, queryFn, fields, title }) {
  const { data, isLoading, isError } = useQuery({ queryKey, queryFn });

  if (isLoading) return (
    <div className="flex items-center gap-2 text-slate-500 py-8">
      <RefreshCw size={16} className="animate-spin" /> Loading…
    </div>
  );
  if (isError) return <p className="text-red-400 py-8">Failed to load data.</p>;

  return <Section title={title} data={data} fields={fields} />;
}

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/vehicle/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle deleted");
      navigate("/dashboard");
    },
    onError: () => toast.error("Failed to delete vehicle"),
  });

  const tabs = [
    {
      label: "Info",
      content: (
        <TabContent
          queryKey={["vehicle-info", id]}
          queryFn={() => api.get(`/vehicle/${id}/info`).then((r) => r.data)}
          title="Vehicle Information"
          fields={[
            { label: "Manufacture", key: "manufacture" },
            { label: "Model", key: "model" },
            { label: "Year", key: "year" },
            { label: "Body Type", key: "bodyType" },
            { label: "Color", key: "color" },
            { label: "Vehicle Type", key: "vehicleType" },
            { label: "Fuel Type", key: "fuelType" },
            { label: "Engine Capacity", key: "engineCapacity" },
            { label: "Seating Capacity", key: "seatingCapacity" },
            { label: "Odometer Reading", key: "odometerReading" },
            { label: "Purpose", key: "purpose" },
            { label: "Status", key: "vehicleStatus" },
          ]}
        />
      ),
    },
    {
      label: "Owner",
      content: (
        <TabContent
          queryKey={["vehicle-owner", id]}
          queryFn={() => api.get(`/vehicle/${id}/owner`).then((r) => r.data)}
          title="Owner Information"
          fields={[
            { label: "Owner Name", key: "ownerName" },
            { label: "Owner Type", key: "ownerType" },
            { label: "National ID", key: "nationalId" },
            { label: "Mobile Number", key: "mobileNumber" },
            { label: "Email", key: "email" },
            { label: "Address", key: "address" },
            { label: "Company Reg No.", key: "companyRegNumber" },
            { label: "Passport Number", key: "passportNumber" },
          ]}
        />
      ),
    },
    {
      label: "Registration",
      content: (
        <TabContent
          queryKey={["vehicle-registration", id]}
          queryFn={() => api.get(`/vehicle/${id}/registration`).then((r) => r.data)}
          title="Registration Details"
          fields={[
            { label: "Plate Number", key: "plateNumber" },
            { label: "Plate Type", key: "plateType" },
            { label: "Registration Date", key: "registrationDate" },
            { label: "Expiry Date", key: "expiryDate" },
            { label: "Status", key: "registrationStatus" },
            { label: "Proof of Ownership", key: "proofOfOwnership" },
            { label: "Customs Reference", key: "customsRef" },
            { label: "State", key: "state" },
          ]}
        />
      ),
    },
    {
      label: "Insurance",
      content: (
        <TabContent
          queryKey={["vehicle-insurance", id]}
          queryFn={() => api.get(`/vehicle/${id}/insurance`).then((r) => r.data)}
          title="Insurance Details"
          fields={[
            { label: "Policy Number", key: "policyNumber" },
            { label: "Company Name", key: "companyName" },
            { label: "Insurance Type", key: "insuranceType" },
            { label: "Expiry Date", key: "insuranceExpiryDate" },
            { label: "Status", key: "insuranceStatus" },
            { label: "Roadworthy Cert", key: "roadworthyCert" },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Vehicle Details</h1>
              <p className="text-slate-400 text-sm font-mono mt-0.5">ID: {id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/vehicle/${id}/edit`} className="btn-secondary inline-flex items-center gap-2 text-sm">
              <Edit size={14} />
              Edit
            </Link>
            <button
              onClick={() => setShowDelete(true)}
              className="btn-danger inline-flex items-center gap-2 text-sm"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="card max-w-sm w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="text-red-400" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Vehicle</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                This will permanently delete this vehicle record. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDelete(false)} className="btn-secondary">Cancel</button>
                <button
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                  className="btn-danger"
                >
                  {deleteMutation.isPending ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="card">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
