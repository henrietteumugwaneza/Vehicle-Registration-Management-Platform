import { z } from "zod";

const currentYear = new Date().getFullYear();

export const step1Schema = z.object({
  manufacture: z.string().min(1, "Manufacture is required").trim(),
  model: z.string().min(1, "Model is required").trim(),
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int()
    .min(1886, "Year must be 1886 or later")
    .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
  vehicleType: z.enum(["ELECTRIC", "SUV", "TRUCK", "MOTORCYCLE", "BUS", "VAN", "PICKUP", "OTHER"], {
    errorMap: () => ({ message: "Select a valid vehicle type" }),
  }),
  fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "GAS", "OTHER"], {
    errorMap: () => ({ message: "Select a valid fuel type" }),
  }),
  engineCapacity: z
    .number({ invalid_type_error: "Engine capacity must be a number" })
    .int()
    .positive("Engine capacity must be greater than 0"),
  bodyType: z.string().min(1, "Body type is required").trim(),
  color: z.string().min(1, "Color is required").trim(),
  seatingCapacity: z
    .number({ invalid_type_error: "Seating capacity must be a number" })
    .int()
    .min(1, "Seating capacity must be at least 1"),
  odometerReading: z
    .number({ invalid_type_error: "Odometer reading must be a number" })
    .int()
    .min(0, "Odometer reading cannot be negative"),
  purpose: z.enum(["PERSONAL", "COMMERCIAL", "TAXI", "GOVERNMENT"], {
    errorMap: () => ({ message: "Select a valid purpose" }),
  }),
  vehicleStatus: z.enum(["NEW", "USED", "REBUILT"], {
    errorMap: () => ({ message: "Select a valid vehicle status" }),
  }),
});

export const step2Schema = z
  .object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
    ownerType: z.enum(["INDIVIDUAL", "COMPANY", "NGO", "GOVERNMENT"], {
      errorMap: () => ({ message: "Select a valid owner type" }),
    }),
    nationalId: z.string().regex(/^\d{16}$/, "National ID must be exactly 16 digits"),
    mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: z.string().email("Enter a valid email address"),
    address: z.string().min(1, "Address is required").trim(),
    companyRegNumber: z.string().optional(),
    passportNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.ownerType === "COMPANY" && !data.companyRegNumber?.trim()) {
      ctx.addIssue({
        path: ["companyRegNumber"],
        code: z.ZodIssueCode.custom,
        message: "Company registration number is required for COMPANY owner type",
      });
    }
    if (data.passportNumber !== undefined && data.passportNumber !== "" && !data.passportNumber.trim()) {
      ctx.addIssue({
        path: ["passportNumber"],
        code: z.ZodIssueCode.custom,
        message: "Passport number cannot be empty spaces",
      });
    }
  });

export const step3Schema = z.object({
  plateNumber: z
    .string()
    .regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i, "Invalid Rwandan plate number (e.g. RAB 123 A)"),
  plateType: z.enum(["PRIVATE", "COMMERCIAL", "GOVERNMENT", "DIPLOMATIC", "PERSONALIZED"], {
    errorMap: () => ({ message: "Select a valid plate type" }),
  }),
  registrationDate: z.string().min(1, "Registration date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  registrationStatus: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED", "PENDING"], {
    errorMap: () => ({ message: "Select a valid registration status" }),
  }),
  policyNumber: z.string().min(1, "Policy number is required"),
  companyName: z.string().min(1, "Insurance company name is required"),
  insuranceType: z.string().min(1, "Insurance type is required"),
  insuranceExpiryDate: z.string().min(1, "Insurance expiry date is required"),
  insuranceStatus: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED"], {
    errorMap: () => ({ message: "Select a valid insurance status" }),
  }),
  roadworthyCert: z.string().min(1, "Roadworthy certificate is required"),
  customsRef: z.string().min(1, "Customs reference is required"),
  proofOfOwnership: z.string().min(1, "Proof of ownership is required"),
  state: z.string().min(1, "State is required"),
}).superRefine((data, ctx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (data.expiryDate) {
    const exp = new Date(data.expiryDate);
    if (exp < today) {
      ctx.addIssue({ path: ["expiryDate"], code: z.ZodIssueCode.custom, message: "Expiry date cannot be in the past" });
    }
  }
  if (data.insuranceExpiryDate) {
    const insExp = new Date(data.insuranceExpiryDate);
    if (insExp < today) {
      ctx.addIssue({ path: ["insuranceExpiryDate"], code: z.ZodIssueCode.custom, message: "Insurance expiry date cannot be in the past" });
    }
  }
});
