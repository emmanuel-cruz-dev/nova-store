import { Form } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { CheckboxState } from "../../types";

function ProductTableHeader({
  checkboxState,
  onToggleSelectAll,
}: {
  checkboxState: CheckboxState;
  onToggleSelectAll: () => void;
}) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = checkboxState === "indeterminate";
    }
  }, [checkboxState]);

  return (
    <thead>
      <tr>
        <th className="text-center" style={{ width: "50px" }}>
          <Form.Check
            id="select-all"
            ref={checkboxRef}
            type="checkbox"
            checked={checkboxState === "checked"}
            onChange={onToggleSelectAll}
            aria-label="Seleccionar todos los productos"
          />
        </th>
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
