import { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { Package, PackagePlus } from "lucide-react";
import {
  useProductsTable,
  useProductsFilter,
  useBulkSelection,
  useBulkActions,
} from "../../hooks";
import {
  DeleteConfirmationModal,
  PaginationItem,
  ProductTableRowSkeleton,
  ProductSidebarForm,
  SectionHeader,
  EmptySection,
  ProductFilters,
  ProductsTableInfo,
  ProductRow,
  ProductTableHeader,
  ProductTableWrapper,
  BulkActionsToolbar,
  BulkDeleteConfirmationModal,
  DiscountModal,
  PriceAdjustmentModal,
  StockAdjustmentModal,
  ProductsResultsLoader,
} from "..";
import {
  StockAdjustmentData,
  PriceAdjustmentData,
  DiscountData,
  CheckboxState,
} from "../../types";

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
    mutate,
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

  const {
    selectedIds,
    selectedItems: selectedProducts,
    selectedCount,
    isSelected,
    toggleSelection,
    toggleSelectAll,
    checkboxState,
    deselectAll,
  } = useBulkSelection(paginatedProducts);

  const {
    isProcessing,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    bulkAdjustStock,
    bulkApplyDiscount,
    bulkAdjustPrice,
  } = useBulkActions(() => {
    mutate();
    deselectAll();
  });

  const [showStockModal, setShowStockModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const handleBulkActivate = () => {
    bulkActivate(selectedIds);
  };

  const handleBulkDeactivate = () => {
    bulkDeactivate(selectedIds);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const confirmBulkDelete = () => {
    bulkDelete(selectedIds);
    setShowBulkDeleteModal(false);
  };

  const handleStockAdjustment = (data: StockAdjustmentData) => {
    bulkAdjustStock(selectedProducts, data);
    setShowStockModal(false);
  };

  const handlePriceAdjustment = (data: PriceAdjustmentData) => {
    bulkAdjustPrice(selectedProducts, data);
    setShowPriceModal(false);
  };

  const handleDiscountApplication = (data: DiscountData) => {
    bulkApplyDiscount(selectedProducts, data);
    setShowDiscountModal(false);
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductTableRowSkeleton key={`placeholder-${index}`} />
          ))}
        </tbody>
      );
    }

    if (error) {
      return (
        <tbody>
          <tr>
            <td colSpan={7} className="text-center text-danger">
              Error al cargar productos
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {paginatedProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isSelected={isSelected(product.id)}
            onToggleSelect={toggleSelection}
            isProcessing={isProcessing && isSelected(product.id)}
          />
        ))}
      </tbody>
    );
  };

  const showEmptyState = !loading && products.length === 0;
  const showNoResults =
    !loading && !error && products.length > 0 && filteredProducts.length === 0;
  const showTable =
    !loading && !error && products.length > 0 && filteredProducts.length > 0;

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

      {(loading || products.length > 0) && (
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

          {loading ? (
            <ProductsResultsLoader />
          ) : (
            products.length > 0 && (
              <p className="mt-3 text-center text-muted mb-0">
                <small>
                  {filteredProducts.length === products.length
                    ? `Mostrando ${filteredProducts.length} productos`
                    : `Mostrando ${filteredProducts.length} de ${products.length} productos`}
                </small>
              </p>
            )
          )}
        </div>
      )}

      <BulkActionsToolbar
        selectedCount={selectedCount}
        onClearSelection={deselectAll}
        onActivate={handleBulkActivate}
        onDeactivate={handleBulkDeactivate}
        onDelete={handleBulkDelete}
        onAdjustStock={() => setShowStockModal(true)}
        onApplyDiscount={() => setShowDiscountModal(true)}
        onAdjustPrice={() => setShowPriceModal(true)}
        isProcessing={isProcessing}
      />

      {showEmptyState && (
        <EmptySection
          title="Tu catálogo está vacío"
          message="Agrega productos para empezar a vender y gestionar tu tienda desde el panel de control."
          icon={<Package size={56} className="text-white" />}
          showButton={false}
        />
      )}

      {showNoResults && (
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
      )}

      {(loading || error || showTable) && (
        <>
          <ProductTableWrapper>
            <ProductTableHeader
              checkboxState={checkboxState as CheckboxState}
              onToggleSelectAll={toggleSelectAll}
            />
            {renderTableContent()}
          </ProductTableWrapper>

          {showTable && <ProductsTableInfo />}
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

      <StockAdjustmentModal
        show={showStockModal}
        onHide={() => setShowStockModal(false)}
        onConfirm={handleStockAdjustment}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
      />

      <PriceAdjustmentModal
        show={showPriceModal}
        onHide={() => setShowPriceModal(false)}
        onConfirm={handlePriceAdjustment}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
      />

      <DiscountModal
        show={showDiscountModal}
        onHide={() => setShowDiscountModal(false)}
        onConfirm={handleDiscountApplication}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
      />

      <BulkDeleteConfirmationModal
        show={showBulkDeleteModal}
        onHide={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
      />

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
