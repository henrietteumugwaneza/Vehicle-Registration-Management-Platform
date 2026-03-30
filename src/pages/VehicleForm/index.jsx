import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import toast from "react-hot-toast";
import { CheckCircle, Circle } from "lucide-react";

const STEPS = ["Vehicle Info", "Owner Info", "Registration & Insurance"];

export default function VehicleForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  // Pre-fill form when editing
  useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => api.get(`/vehicle/${id}`).then((r) => r.data),
    enabled: isEdit,
    onSuccess: (data) => setFormData(data),
  });

  const mutation = useMutation({
    mutationFn: (payload) =>
      isEdit ? api.put(`/vehicle/${id}`, payload) : api.post("/vehicle", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success(isEdit ? "Vehicle updated!" : "Vehicle registered!");
      navigate("/dashboard");
    },
    onError: (err) => {
      const errors = err?.response?.data?.errors || err?.response?.data?.message;
      if (Array.isArray(errors)) {
        setServerErrors(errors);
      } else {
        toast.error(errors || "Something went wrong");
      }
    },
  });

  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    setServerErrors([]);
  };

  const handleSubmit = (step3Data) => {
    const payload = { ...formData, ...step3Data };
    setServerErrors([]);
    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? "Edit Vehicle" : "Register New Vehicle"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Complete all steps to {isEdit ? "update the" : "register a new"} vehicle.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 text-sm font-medium ${
                i < step ? "text-emerald-400" : i === step ? "text-indigo-400" : "text-slate-500"
              }`}>
                {i < step ? (
                  <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                    i === step ? "border-indigo-500 text-indigo-400" : "border-slate-700 text-slate-600"
                  }`}>
                    {i + 1}
                  </div>
                )}
                <span className="hidden sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-emerald-500/40" : "bg-slate-800"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Server Errors */}
        {serverErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 font-medium text-sm mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1">
              {serverErrors.map((e, i) => (
                <li key={i} className="text-red-300 text-sm">{e.message || e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Card */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-slate-800">
            Step {step + 1}: {STEPS[step]}
          </h2>

          {step === 0 && (
            <Step1 defaultValues={formData} onNext={handleNext} />
          )}
          {step === 1 && (
            <Step2 defaultValues={formData} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 2 && (
            <Step3
              defaultValues={formData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isSubmitting={mutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
