import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../services/validation";
import FormInput from "../../components/FormInput";

const PLATE_TYPES = ["PRIVATE", "COMMERCIAL", "GOVERNMENT", "DIPLOMATIC", "PERSONALIZED"];
const REG_STATUSES = ["ACTIVE", "SUSPENDED", "EXPIRED", "PENDING"];
const INS_STATUSES = ["ACTIVE", "SUSPENDED", "EXPIRED"];

export default function Step3({ defaultValues, onSubmit, onBack, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Registration */}
      <div>
        <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
          Registration Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Plate Number *"
            placeholder="e.g. RAB 123 A"
            error={errors.plateNumber?.message}
            {...register("plateNumber")}
          />
          <FormInput label="Plate Type *" as="select" error={errors.plateType?.message} {...register("plateType")}>
            <option value="">Select plate type…</option>
            {PLATE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </FormInput>
          <FormInput
            label="Registration Date *"
            type="datetime-local"
            error={errors.registrationDate?.message}
            {...register("registrationDate")}
          />
          <FormInput
            label="Expiry Date *"
            type="datetime-local"
            error={errors.expiryDate?.message}
            {...register("expiryDate")}
          />
          <FormInput label="Registration Status *" as="select" error={errors.registrationStatus?.message} {...register("registrationStatus")}>
            <option value="">Select status…</option>
            {REG_STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}
          </FormInput>
          <FormInput
            label="Proof of Ownership *"
            placeholder="Document reference"
            error={errors.proofOfOwnership?.message}
            {...register("proofOfOwnership")}
          />
          <FormInput
            label="Customs Reference *"
            placeholder="Customs ref number"
            error={errors.customsRef?.message}
            {...register("customsRef")}
          />
          <FormInput
            label="State *"
            placeholder="e.g. Kigali"
            error={errors.state?.message}
            {...register("state")}
          />
        </div>
      </div>

      {/* Insurance */}
      <div>
        <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
          Insurance Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Policy Number *"
            placeholder="e.g. POL-2024-001"
            error={errors.policyNumber?.message}
            {...register("policyNumber")}
          />
          <FormInput
            label="Insurance Company *"
            placeholder="e.g. SORAS"
            error={errors.companyName?.message}
            {...register("companyName")}
          />
          <FormInput
            label="Insurance Type *"
            placeholder="e.g. Comprehensive"
            error={errors.insuranceType?.message}
            {...register("insuranceType")}
          />
          <FormInput
            label="Insurance Expiry Date *"
            type="datetime-local"
            error={errors.insuranceExpiryDate?.message}
            {...register("insuranceExpiryDate")}
          />
          <FormInput label="Insurance Status *" as="select" error={errors.insuranceStatus?.message} {...register("insuranceStatus")}>
            <option value="">Select status…</option>
            {INS_STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}
          </FormInput>
          <FormInput
            label="Roadworthy Certificate *"
            placeholder="Certificate number"
            error={errors.roadworthyCert?.message}
            {...register("roadworthyCert")}
          />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? "Submitting…" : "Submit Registration"}
        </button>
      </div>
    </form>
  );
}
