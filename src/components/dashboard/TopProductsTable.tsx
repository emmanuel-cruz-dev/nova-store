import { Card, Table, Badge } from "react-bootstrap";
import { formatCurrency } from "../../utils";
import { TopProduct } from "../../types";

interface TopProductsTableProps {
  products: TopProduct[];
}

function TopProductsTable({ products }: TopProductsTableProps) {
  const getCategoryBadgeVariant = (category: string) => {
    const variants: Record<string, string> = {
      tecnologia: "primary",
      mujeres: "info",
      hombres: "success",
      gaming: "secondary",
    };
    return variants[category] || "secondary";
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="card-title mb-4">Productos Más Vendidos</h5>

        {products.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p>No hay datos de ventas disponibles</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th className="text-end">Unidades</th>
                  <th className="text-end">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-light rounded me-2 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <div className="fw-semibold">{product.name}</div>
                          <div className="small text-muted">#{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge
                        bg={getCategoryBadgeVariant(product.category)}
                        className="text-capitalize"
                      >
                        {product.category}
                      </Badge>
                    </td>
                    <td className="text-end fw-semibold">
                      {product.unitsSold}
                    </td>
                    <td className="text-end fw-semibold text-success">
                      {formatCurrency(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default TopProductsTable;
