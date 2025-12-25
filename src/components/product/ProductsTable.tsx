import { Badge, Table } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { Pencil, Trash2, Info } from "lucide-react";
import { useProductsTable } from "../../hooks";
import {
  DeleteConfirmationModal,
  PaginationItem,
  TableRowSkeleton,
  ProductSidebarForm,
  ProductStockIndicator,
} from "..";
import { formatPrice } from "../../utils/utils";

function ProductsTable() {
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    showModal,
    selectedProductId,
    showDeleteModal,
    productToDelete,
    loadingDelete,
    goToPage,
    notify,
    handleModalShow,
    handleModalClose,
    handleProductSaved,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useProductsTable(1, 10);

  return (
    <section>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Productos</h2>
        <button onClick={handleModalShow} className="btn btn-primary">
          Crear producto
        </button>
      </header>
      <Table
        className="mb-0"
        striped
        bordered
        hover
        responsive
        style={{ minWidth: "680px" }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th style={{ width: "200px", height: "100%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={`placeholder-${index}`} />
            ))
          ) : error ? (
            <tr>
              <td colSpan={6}>Error al cargar productos</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${formatPrice(product.price)}</td>
                <td>
                  {product.stock.toString().padStart(2, "0")}
                  <ProductStockIndicator stock={product.stock} />
                </td>
                <td>{product.isActive ? "Activo" : "Inactivo"}</td>
                <td
                  className="d-flex gap-2"
                  style={{
                    width: "200px",
                    height: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Pencil size={18} className="me-2" />
                    Editar
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDeleteProduct(product)}
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

      <div className="d-flex justify-content-between align-items-start mt-2">
        <small
          className="text-muted d-flex align-items-center gap-1"
          style={{ lineHeight: 1 }}
        >
          <Info size={15} />
          Los productos inactivos no se muestran a los clientes
        </small>

        <ul className="d-flex gap-1 mb-0 list-unstyled">
          <li>
            <Badge bg="danger">Crítico</Badge>
          </li>
          <li>
            <Badge bg="warning">Bajo</Badge>
          </li>
          <li>
            <Badge bg="success">OK</Badge>
          </li>
          <li>
            <Badge bg="primary">Alto</Badge>
          </li>
        </ul>
      </div>

      {showModal && (
        <ProductSidebarForm
          show={showModal}
          onHide={handleModalClose}
          productId={selectedProductId as number}
          onUpdate={notify}
          onSuccess={handleProductSaved}
        />
      )}

      {productToDelete && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          name={productToDelete.name}
          loading={loadingDelete}
        />
      )}

      {totalPages > 1 && (
        <PaginationItem
          currentPage={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          isLoading={loading}
        />
      )}
      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export default ProductsTable;
