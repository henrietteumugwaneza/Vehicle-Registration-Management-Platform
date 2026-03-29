import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function VehicleForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="p-4">
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}

      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}