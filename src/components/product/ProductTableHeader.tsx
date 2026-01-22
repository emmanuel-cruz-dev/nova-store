function ProductTableHeader() {
  return (
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
  );
}

export default ProductTableHeader;
