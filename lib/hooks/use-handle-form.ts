import { useState } from "react";

export function useHandleForm(steps: any) {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((prevStep) => {
      if (prevStep >= steps.length - 1) return prevStep;
      return prevStep + 1;
    });
  };

  const prev = () => {
    setStep((prevStep) => {
      if (step <= 0) return prevStep;
      return prevStep - 1;
    });
  };

  const goto = (n: number) => {
    setStep(n);
  };

  return {
    step,
    currentForm: steps[step],
    next,
    prev,
    goto,
  };
}
