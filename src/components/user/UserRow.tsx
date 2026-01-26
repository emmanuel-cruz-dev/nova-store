import { Form } from "react-bootstrap";
import { Eye, Trash2 } from "lucide-react";
import { User } from "../../types";
import { formatDateShort } from "../../utils";

const UserRow = ({
  user,
  onShowDetails,
  onDelete,
  isSelected,
  onToggleSelect,
}: {
  user: User;
  onShowDetails: (id: number) => void;
  onDelete: (user: User) => void;
  isSelected: boolean;
  onToggleSelect: (userId: number) => void;
}) => (
  <tr
    key={user.id}
    className={isSelected ? "table-active" : ""}
    style={{
      backgroundColor: isSelected ? "rgba(13, 110, 253, 0.1)" : undefined,
    }}
  >
    <td className="align-middle text-center">
      <Form.Check
        id={`select-user-${user.id}`}
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(user.id as number)}
        aria-label={`Seleccionar ${user.firstName} ${user.lastName}`}
      />
    </td>
    <td className="text-nowrap">
      <img
        className="rounded-circle"
        style={{
          width: "32px",
          height: "32px",
          objectFit: "cover",
        }}
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
      />{" "}
      <span
        className="d-inline-block text-truncate"
        style={{ maxWidth: "144px", verticalAlign: "middle" }}
      >
        {user.firstName} {user.lastName}
      </span>
    </td>
    <td
      className="text-truncate"
      style={{ maxWidth: "152px", verticalAlign: "middle" }}
    >
      {user.email}
    </td>
    <td>{user.orders?.length || 0}</td>
    <td>{formatDateShort(user.createdAt as string)}</td>
    <td className="text-nowrap align-middle">
      <button
        onClick={() => onShowDetails(user.id as number)}
        className="btn btn-secondary btn-sm me-2"
      >
        <Eye size={18} className="me-2" />
        Ver detalles
      </button>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onDelete(user)}
      >
        <Trash2 size={18} className="me-2" />
        Eliminar
      </button>
    </td>
  </tr>
);

export default UserRow;
