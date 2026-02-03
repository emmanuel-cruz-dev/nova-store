import { Form } from "react-bootstrap";
import { useAuthStore } from "../../stores";
import { useIndeterminateCheckbox } from "../../hooks";
import { isSuperAdmin } from "../../utils";
import { CheckboxState } from "../../types";

function UserTableHeader({
  checkboxState,
  onToggleSelectAll,
}: {
  checkboxState: CheckboxState;
  onToggleSelectAll: () => void;
}) {
  const { user } = useAuthStore();
  const isSuperAdminRole = isSuperAdmin(user?.role);
  const checkboxRef = useIndeterminateCheckbox(checkboxState);

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
        {isSuperAdminRole && <th>Rol</th>}
        <th>Órdenes</th>
        <th>Registrado</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}

export default UserTableHeader;
