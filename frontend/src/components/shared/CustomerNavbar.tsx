import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "../../stores";
import { useCart } from "../../hooks";
import { CustomTooltip } from "../index";
import UserMenu from "../../layouts/UserMenu";

function CustomerNavbar() {
  const { isAuthenticated, user } = useAuthStore();
  const { getCartItemsCount } = useCart();

  return (
    <>
      <Navbar.Brand
        as={Link}
        to="/"
        className="d-flex align-items-center fw-bold text-primary"
      >
        <img
          className="me-2"
          src="/nova-store.ico"
          style={{ width: "30px", height: "30px" }}
          width={256}
          height={256}
          alt="Logo de NovaStore"
          loading="lazy"
        />
        Nova<span className="text-white fw-normal">Store</span>
      </Navbar.Brand>

      <div className="d-flex align-items-center gap-2">
        {isAuthenticated && (
          <Nav.Link
            as={Link}
            to="/cart"
            className="cart__items-container text-light d-lg-none me-2"
            aria-label="Carrito"
          >
            <ShoppingCart size={24} className="me-2" />
            {getCartItemsCount() > 0 && (
              <p className="cart__items-badge">{getCartItemsCount()}</p>
            )}
          </Nav.Link>
        )}
        <Navbar.Toggle aria-controls="main-navbar" />
      </div>

      <Navbar.Collapse id="main-navbar">
        <Nav className="ms-auto align-items-center gap-2">
          <Nav.Link as={Link} to="/" aria-label="Inicio">
            Inicio
          </Nav.Link>
          <Nav.Link as={Link} to="/products" aria-label="Productos">
            Productos
          </Nav.Link>

          {isAuthenticated && (
            <CustomTooltip text="Ir al carrito">
              <Nav.Link
                as={Link}
                to="/cart"
                className="cart__items-container d-none d-lg-flex"
                aria-label="Carrito"
              >
                <ShoppingCart size={20} className="me-2" />
                {getCartItemsCount() > 0 && (
                  <p className="cart__items-badge">{getCartItemsCount()}</p>
                )}
              </Nav.Link>
            </CustomTooltip>
          )}

          {isAuthenticated && user ? (
            <UserMenu />
          ) : (
            <Nav.Link as={Link} to="/login">
              Iniciar sesión
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </>
  );
}

export default CustomerNavbar;
