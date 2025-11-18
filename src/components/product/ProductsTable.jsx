import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteProduct, useProducts } from "../../hooks/useProducts";
import { formatPrice } from "../../utils/utils";
import UpdateProductModal from "./UpdateProductModal";
import { ToastContainer, toast, Bounce } from "react-toastify";

function ProductsTable() {
  const { products, loading, error, refetch } = useProducts(2, 10, "all");
  const { deleteProduct, loading: loadingDelete } = useDeleteProduct();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setProductId] = useState(null);

  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleEditProduct = (productId) => {
    setShowModal(true);
    setProductId(productId);
  };

  const handleDeleteProduct = async (productId) => {
    if (loadingDelete) return;

    try {
      await deleteProduct(productId);
      notify("Producto eliminado exitosamente", "success");
      refetch();
    } catch (error) {
      notify("Error al eliminar producto", "error");
      console.error("Error al eliminar producto:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        <h2 className="mb-4">Productos</h2>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center mb-2 ">
            <label className="form-label" htmlFor="search">
              Buscar producto
            </label>
            <input className="form-control ml-2" type="text" id="search" />
          </div>
          <button
            onClick={() => handleModalShow({})}
            className="btn btn-primary"
          >
            Crear producto
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="checkAll" id="checkAll" />
              </th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={`placeholder-${index}`}>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={6}>Error al cargar productos</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      name="checkAll"
                      id={`checkAll-${product.id}`}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${formatPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>{product.isActive ? "Activo" : "Inactivo"}</td>
                  <td className="d-flex gap-2">
                    <button
                      // onClick={() => handleModalShow(product)}
                      onClick={() => handleEditProduct(product.id)}
                      className="btn btn-primary"
                    >
                      <Pencil size={18} className="me-2" />
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 size={18} className="me-2" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <footer className="d-flex justify-content-center">
          <p>Los productos inactivos no se muestran a los clientes</p>
          {showModal && (
            <UpdateProductModal
              show={showModal}
              onHide={() => setShowModal(false)}
              productId={selectedProductId}
            />
          )}
        </footer>
      </section>
      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default ProductsTable;
