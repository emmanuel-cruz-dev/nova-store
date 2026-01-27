import { Link } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { User, ClipboardList, Heart, LogOut } from "lucide-react";
import { useAuthStore } from "../stores";
import { CustomTooltip } from "../components";
import { hasAdminAccess } from "../utils";

function UserMenu() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const isAdmin = hasAdminAccess(user.role);
  const baseRoute = isAdmin ? "/admin" : "/account";

  return (
    <Dropdown align="end">
      <CustomTooltip text="Abrir menú de usuario">
        <Dropdown.Toggle
          variant="link"
          className="p-0 d-flex align-items-center text-white text-decoration-none"
        >
          <Image
            src={user.avatar}
            alt={`Foto de ${user.firstName} ${user.lastName}`}
            roundedCircle
            width={36}
            height={36}
            className="border border-light"
            style={{ objectFit: "cover" }}
          />
        </Dropdown.Toggle>
      </CustomTooltip>

      <Dropdown.Menu className="bg-dark text-white shadow">
        <Dropdown.Item
          as={Link}
          to={baseRoute}
          className="d-flex align-items-center gap-2 text-white"
        >
          <Image
            src={user.avatar}
            alt={`Foto de ${user.firstName} ${user.lastName}`}
            roundedCircle
            style={{ objectFit: "cover" }}
            width={22}
            height={22}
          />
          <span className="fw-medium">
            {user.firstName} {user.lastName}
          </span>
        </Dropdown.Item>

        <Dropdown.Divider />

        {!isAdmin && (
          <>
            <Dropdown.Item
              as={Link}
              to={`${baseRoute}/profile`}
              className="d-flex align-items-center gap-2 text-white"
            >
              <User size={16} />
              Perfil
            </Dropdown.Item>

            <Dropdown.Item
              as={Link}
              to={`${baseRoute}/orders`}
              className="d-flex align-items-center gap-2 text-white"
            >
              <ClipboardList size={16} />
              Mis órdenes
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/account/favorites"
              className="d-flex align-items-center gap-2 text-white"
            >
              <Heart size={16} />
              Favoritos
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}

        <Dropdown.Item
          as="button"
          type="button"
          onClick={logout}
          className="d-flex align-items-center gap-2 text-white bg-transparent border-0 w-100"
        >
          <LogOut size={16} />
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;
