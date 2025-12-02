import { steps } from "../../data/checkoutSteps";

function CheckoutSteps() {
  return (
    <ul className="list-unstyled d-flex gap-3 justify-content-center mb-4">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <li key={step.text} className="text-center">
            <Icon size={32} className="text-primary mb-2" />
            <p className="small text-muted mb-0">{step.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CheckoutSteps;
