import { Badge, Table, Button } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { Pencil, Trash2, Info, Package, PackagePlus } from "lucide-react";
import { useProductsTable, useProductsFilter } from "../../hooks";
import {
  DeleteConfirmationModal,
  PaginationItem,
  TableRowSkeleton,
  ProductSidebarForm,
  ProductStockIndicator,
  SectionHeader,
  EmptySection,
  ProductFilters,
} from "..";
import { formatPrice } from "../../utils";

function ProductsTable() {
  const {
    products,
    loading,
    error,
    showModal,
    selectedProductId,
    showDeleteModal,
    productToDelete,
    loadingDelete,
    notify,
    handleModalShow,
    handleModalClose,
    handleProductSaved,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useProductsTable(1, 100);

  const {
    searchTerm,
    statusFilter,
    stockFilter,
    minPrice,
    maxPrice,
    hasActiveFilters,
    setSearchTerm,
    setStatusFilter,
    setStockFilter,
    setMinPrice,
    setMaxPrice,
    clearFilters,
    handlePageChange,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
  } = useProductsFilter(products, 10);

  return (
    <section>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: "-28px" }}
      >
        <SectionHeader
          title="Productos"
          subtitle="Gestiona el catálogo de productos de tu tienda"
        />
        <button
          className="btn btn-primary mb-5 px-4 d-flex align-items-center gap-2"
          onClick={handleModalShow}
        >
          <PackagePlus size={16} />
          Crear producto
        </button>
      </div>

      <div className="bg-light py-3 rounded">
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {!loading && (
          <p className="mt-3 text-center text-muted mb-0">
            <small>
              {filteredProducts.length === products.length ? (
                <>Mostrando {filteredProducts.length} productos</>
              ) : (
                <>
                  Mostrando {filteredProducts.length} de {products.length}{" "}
                  productos
                </>
              )}
            </small>
          </p>
        )}
      </div>

      {loading ? (
        <div className="card rounded-3 shadow-sm overflow-hidden">
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
                <th>Categoria</th>
                <th>Stock</th>
                <th>Estado</th>
                <th style={{ width: "200px", height: "100%" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRowSkeleton key={`placeholder-${index}`} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : error ? (
        <div className="card rounded-3 shadow-sm overflow-hidden">
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
                <th>Categoria</th>
                <th>Stock</th>
                <th>Estado</th>
                <th style={{ width: "200px", height: "100%" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center text-danger">
                  Error al cargar productos
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : products.length === 0 ? (
        <EmptySection
          title="Tu catálogo está vacío"
          message="Agrega productos para empezar a vender y gestionar tu tienda desde el panel de control."
          icon={<Package size={56} className="text-white" />}
          showButton={false}
        />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <h5 className="text-muted">No se encontraron productos</h5>
          <p className="text-muted">
            Intenta ajustar los filtros o{" "}
            <Button
              variant="link"
              className="p-0 text-decoration-none align-baseline"
              onClick={clearFilters}
            >
              limpiar todos los filtros
            </Button>
          </p>
        </div>
      ) : (
        <>
          <div className="card rounded-3 shadow-sm overflow-hidden">
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
                  <th>Categoria</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th style={{ width: "200px", height: "100%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td className="text-capitalize">{product.category}</td>
                    <td>
                      {product.stock.toString().padStart(2, "0")}
                      <ProductStockIndicator stock={product.stock} />
                    </td>
                    <td>
                      <Badge bg={product.isActive ? "success" : "secondary"}>
                        {product.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
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
                ))}
              </tbody>
            </Table>
          </div>

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
        </>
      )}

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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
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
