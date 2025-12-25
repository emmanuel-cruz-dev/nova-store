import { Link } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { User, LogOut, ClipboardList, Heart, Box, Users } from "lucide-react";
import { useAuthStore } from "../stores";
import { CustomTooltip } from "../components";

function UserMenu() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

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
          to="/profile"
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

        <Dropdown.Item
          as={Link}
          to="/profile"
          className="d-flex align-items-center gap-2 text-white"
        >
          <User size={16} />
          Perfil
        </Dropdown.Item>

        <Dropdown.Item
          as={Link}
          to={user.role === "admin" ? "/profile/all-orders" : "/profile/orders"}
          className="d-flex align-items-center gap-2 text-white"
        >
          <ClipboardList size={16} />
          Órdenes
        </Dropdown.Item>

        {user.role === "customer" ? (
          <Dropdown.Item
            as={Link}
            to="/profile/favorites"
            className="d-flex align-items-center gap-2 text-white"
          >
            <Heart size={16} />
            Favoritos
          </Dropdown.Item>
        ) : (
          <>
            <Dropdown.Item
              as={Link}
              to="/profile/products"
              className="d-flex align-items-center gap-2 text-white"
            >
              <Box size={16} />
              Productos
            </Dropdown.Item>

            <Dropdown.Item
              as={Link}
              to="/profile/users"
              className="d-flex align-items-center gap-2 text-white"
            >
              <Users size={16} />
              Usuarios
            </Dropdown.Item>
          </>
        )}

        <Dropdown.Divider />

        <Dropdown.Item
          as="button"
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
