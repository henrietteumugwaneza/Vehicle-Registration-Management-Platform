import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../services/validation";
import FormInput from "../../components/FormInput";

const OWNER_TYPES = ["INDIVIDUAL", "COMPANY", "NGO", "GOVERNMENT"];

export default function Step2({ defaultValues, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues,
    mode: "onBlur",
  });

  const ownerType = useWatch({ control, name: "ownerType" });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label="Owner Full Name *"
          placeholder="e.g. John Doe"
          error={errors.ownerName?.message}
          {...register("ownerName")}
        />

        <FormInput label="Owner Type *" as="select" error={errors.ownerType?.message} {...register("ownerType")}>
          <option value="">Select owner type…</option>
          {OWNER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </FormInput>

        <FormInput
          label="National ID *"
          placeholder="16-digit national ID"
          maxLength={16}
          error={errors.nationalId?.message}
          {...register("nationalId")}
        />
        <FormInput
          label="Mobile Number *"
          placeholder="10-digit mobile number"
          maxLength={10}
          error={errors.mobileNumber?.message}
          {...register("mobileNumber")}
        />
        <FormInput
          label="Email Address *"
          type="email"
          placeholder="owner@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          label="Address *"
          placeholder="Physical address"
          error={errors.address?.message}
          {...register("address")}
        />

        {ownerType === "COMPANY" && (
          <FormInput
            label="Company Registration Number *"
            placeholder="e.g. RCA-12345"
            error={errors.companyRegNumber?.message}
            {...register("companyRegNumber")}
          />
        )}

        <FormInput
          label="Passport Number (optional)"
          placeholder="Passport number"
          error={errors.passportNumber?.message}
          {...register("passportNumber")}
        />
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Registration →
        </button>
      </div>
    </form>
  );
}
