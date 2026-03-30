import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../services/validation";
import FormInput from "../../components/FormInput";

const VEHICLE_TYPES = ["ELECTRIC", "SUV", "TRUCK", "MOTORCYCLE", "BUS", "VAN", "PICKUP", "OTHER"];
const FUEL_TYPES = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "GAS", "OTHER"];
const PURPOSES = ["PERSONAL", "COMMERCIAL", "TAXI", "GOVERNMENT"];
const VEHICLE_STATUSES = ["NEW", "USED", "REBUILT"];

export default function Step1({ defaultValues, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label="Manufacture / Make *"
          placeholder="e.g. Toyota"
          error={errors.manufacture?.message}
          {...register("manufacture")}
        />
        <FormInput
          label="Model *"
          placeholder="e.g. Corolla"
          error={errors.model?.message}
          {...register("model")}
        />
        <FormInput
          label="Year *"
          type="number"
          placeholder="e.g. 2020"
          error={errors.year?.message}
          {...register("year", { valueAsNumber: true })}
        />
        <FormInput
          label="Body Type *"
          placeholder="e.g. Sedan"
          error={errors.bodyType?.message}
          {...register("bodyType")}
        />
        <FormInput
          label="Color *"
          placeholder="e.g. White"
          error={errors.color?.message}
          {...register("color")}
        />
        <FormInput
          label="Engine Capacity (cc) *"
          type="number"
          placeholder="e.g. 1800"
          error={errors.engineCapacity?.message}
          {...register("engineCapacity", { valueAsNumber: true })}
        />
        <FormInput
          label="Seating Capacity *"
          type="number"
          placeholder="e.g. 5"
          error={errors.seatingCapacity?.message}
          {...register("seatingCapacity", { valueAsNumber: true })}
        />
        <FormInput
          label="Odometer Reading (km) *"
          type="number"
          placeholder="e.g. 0"
          error={errors.odometerReading?.message}
          {...register("odometerReading", { valueAsNumber: true })}
        />

        <FormInput label="Vehicle Type *" as="select" error={errors.vehicleType?.message} {...register("vehicleType")}>
          <option value="">Select type…</option>
          {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </FormInput>

        <FormInput label="Fuel Type *" as="select" error={errors.fuelType?.message} {...register("fuelType")}>
          <option value="">Select fuel…</option>
          {FUEL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </FormInput>

        <FormInput label="Purpose *" as="select" error={errors.purpose?.message} {...register("purpose")}>
          <option value="">Select purpose…</option>
          {PURPOSES.map((t) => <option key={t} value={t}>{t}</option>)}
        </FormInput>

        <FormInput label="Vehicle Status *" as="select" error={errors.vehicleStatus?.message} {...register("vehicleStatus")}>
          <option value="">Select status…</option>
          {VEHICLE_STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}
        </FormInput>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="btn-primary">
          Next: Owner Info →
        </button>
      </div>
    </form>
  );
}
