import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
const steps = [
  "Shipping address",
  "Payment Method",
  "Review your order",
  "Pay",
];

function CheckoutSteps({ activeStep, stepper }) {
  return (
    <Stepper activeStep={activeStep} className={stepper}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CheckoutSteps;
