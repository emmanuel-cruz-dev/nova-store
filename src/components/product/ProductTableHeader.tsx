import { Form } from "react-bootstrap";
import { useIndeterminateCheckbox } from "../../hooks";
import { CheckboxState } from "../../types";

function ProductTableHeader({
  checkboxState,
  onToggleSelectAll,
}: {
  checkboxState: CheckboxState;
  onToggleSelectAll: () => void;
}) {
  const checkboxRef = useIndeterminateCheckbox(checkboxState);

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
