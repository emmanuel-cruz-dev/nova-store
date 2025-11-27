import React from "react";
import { useParams } from "react-router-dom";
import { useProductById, useProductsByCategory } from "../hooks";
import { ProductSlideList, ProductDetailsCard } from "../components";

function Product() {
  const { id } = useParams();
  const idNumber = Number(id);
  const { product, loading } = useProductById(idNumber);
  const productCategory = product?.category;
  const {
    products,
    loading: isProductsLoading,
    error,
  } = useProductsByCategory(productCategory);

  return (
    <section className="mb-4">
      <ProductDetailsCard product={product} isLoading={loading} />
      {productCategory && (
        <article>
          <ProductSlideList
            title="Productos Relacionados"
            products={products}
            loading={isProductsLoading}
            error={error}
          />
        </article>
      )}
    </section>
  );
}

export default Product;
