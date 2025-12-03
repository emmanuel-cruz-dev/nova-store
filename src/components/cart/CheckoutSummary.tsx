import SummaryRow from "./SummaryRow";
import { formatPrice } from "../../utils/utils";
import { CheckoutSummaryProps } from "../../types";

function CheckoutSummary({ orderTotal, itemsCount }: CheckoutSummaryProps) {
  const orderNumber = Math.floor(Math.random() * 1000000);
  const itemsText = `${itemsCount} ${
    itemsCount === 1 ? "artículo" : "artículos"
  }`;
  const formattedTotal = formatPrice(orderTotal);

  const summaryData = [
    {
      label: "Número de orden",
      value: `#${orderNumber}`,
      rowClass: "mb-1",
    },
    {
      label: "Productos",
      value: itemsText,
      rowClass: "mb-1",
    },
    {
      label: "Total",
      value: `$${formattedTotal}`,
      valueClass: "text-success fs-5",
    },
  ];

  return (
    <section className="bg-light rounded p-4 py-2 mb-4">
      {summaryData.map((item) => (
        <SummaryRow
          key={item.label}
          label={item.label}
          value={item.value}
          className={item.rowClass}
          valueClassName={item.valueClass}
        />
      ))}
    </section>
  );
}

export default CheckoutSummary;
