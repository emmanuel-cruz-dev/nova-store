import { SummaryRowProps } from "../../types";

function SummaryRow({
  label,
  value,
  className = "",
  valueClassName = "",
}: SummaryRowProps) {
  const rowClasses = `d-flex justify-content-between ${className} list-unstyled mb-0`;
  const valueClasses = `fw-bold ${valueClassName}`;

  return (
    <ul className={rowClasses}>
      <li className="custom__text-muted">{label}:</li>
      <li className={valueClasses}>{value}</li>
    </ul>
  );
}

export default SummaryRow;
