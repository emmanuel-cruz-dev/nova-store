import React from "react";
import { Badge } from "react-bootstrap";
import StarRating from "../ui/StarRating";
import {
  formatPrice,
  priceInstallments,
  renderCategory,
} from "../../utils/utils";

const ProductInfoDisplay = ({ product }) => {
  return (
    <>
      <Badge bg="secondary" className="my-2 p-2">
        {renderCategory(product.category)}
      </Badge>
      <h2 className="fw-bold mt-3">{product.name}</h2>
      <p className="text-muted">Marca: {product.brand}</p>

      <StarRating rating={product.rating} />

      <div className="mb-4">
        <p className="display-6 fw-bold text-primary mb-0">
          ${formatPrice(product.price)}
        </p>
        <p className="text-muted mb-0">
          6 cuotas de ${priceInstallments(product.price)}
        </p>
      </div>

      <p className="text-muted mb-4">{product.description || ""}</p>

      <div className="mb-4">
        {product.stock > 0 ? (
          <Badge bg="success" className="p-2">
            En stock ({product.stock} disponibles)
          </Badge>
        ) : (
          <Badge bg="danger" className="px-3 py-2">
            Sin stock
          </Badge>
        )}
      </div>
    </>
  );
};

export default ProductInfoDisplay;
