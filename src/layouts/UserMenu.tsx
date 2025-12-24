import { Link } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { User, LogOut, ClipboardList, Heart } from "lucide-react";
import { useAuthStore } from "../stores";

function UserMenu() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="p-0 d-flex align-items-center text-white text-decoration-none"
      >
        <Image
          src={user.avatar}
          roundedCircle
          width={36}
          height={36}
          className="border border-light"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-dark text-white shadow">
        <Dropdown.Item
          as={Link}
          to="/profile"
          className="d-flex align-items-center gap-2 text-white"
        >
          <Image src={user.avatar} roundedCircle width={22} height={22} />
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
          to="/profile/favorites"
          className="d-flex align-items-center gap-2 text-white"
        >
          <Heart size={16} />
          Favoritos
        </Dropdown.Item>

        <Dropdown.Item
          as={Link}
          to="/profile/orders"
          className="d-flex align-items-center gap-2 text-white"
        >
          <ClipboardList size={16} />
          Órdenes
        </Dropdown.Item>

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
