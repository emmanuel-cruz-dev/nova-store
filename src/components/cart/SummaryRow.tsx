function SummaryRow({ label, value, className = "", valueClassName = "" }) {
  const rowClasses = `d-flex justify-content-between ${className} list-unstyled mb-0`;
  const valueClasses = `fw-bold ${valueClassName}`;

  return (
    <ul className={rowClasses}>
      <li className="text-muted">{label}:</li>
      <li className={valueClasses}>{value}</li>
    </ul>
  );
}

export default SummaryRow;
