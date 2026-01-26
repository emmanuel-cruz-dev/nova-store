import { Form } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { CheckboxState } from "../../types";

function UserTableHeader({
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
            id="select-all-users"
            ref={checkboxRef}
            type="checkbox"
            checked={checkboxState === "checked"}
            onChange={onToggleSelectAll}
            aria-label="Seleccionar todos los usuarios"
          />
        </th>
        <th>Nombre Completo</th>
        <th>Email</th>
        <th>Órdenes</th>
        <th>Registrado</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}

export default UserTableHeader;
