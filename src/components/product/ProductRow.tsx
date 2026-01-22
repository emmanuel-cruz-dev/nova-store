import { Badge } from "react-bootstrap";
import { Pencil, Trash2 } from "lucide-react";
import { ProductStockIndicator } from "..";
import { formatPrice } from "../../utils";
import { Product } from "../../types";

const ProductRow = ({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (productId: number) => void;
  onDelete: (product: Product) => void;
}) => (
  <tr key={product.id}>
    <td className="align-middle">{product.name}</td>
    <td className="align-middle">${formatPrice(product.price)}</td>
    <td className="text-capitalize align-middle">{product.category}</td>
    <td className="text-nowrap align-middle">
      {product.stock.toString().padStart(2, "0")}
      <ProductStockIndicator stock={product.stock} />
    </td>
    <td className="align-middle">
      <Badge bg={product.isActive ? "success" : "secondary"}>
        {product.isActive ? "Activo" : "Inactivo"}
      </Badge>
    </td>
    <td className="text-nowrap align-middle">
      <button
        onClick={() => onEdit(product.id)}
        className="btn btn-secondary btn-sm me-2"
      >
        <Pencil size={18} className="me-2" />
        Editar
      </button>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onDelete(product)}
      >
        <Trash2 size={18} className="me-2" />
        Eliminar
      </button>
    </td>
  </tr>
);

export default ProductRow;
