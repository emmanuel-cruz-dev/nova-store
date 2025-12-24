import SummaryRow from "./SummaryRow";
import { formatPrice } from "../../utils/utils";
import { useCheckoutStore } from "../../stores";

function CheckoutSummary() {
  const { orderData } = useCheckoutStore();

  if (!orderData) return null;

  const itemsText = `${orderData.itemsCount} ${
    orderData.itemsCount === 1 ? "artículo" : "artículos"
  }`;
  const formattedTotal = formatPrice(orderData.total);

  const summaryData = [
    {
      label: "Órden",
      value: `#${orderData.orderId.slice(0, 6)}`,
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
