import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "../stores";
import { useCart } from "../hooks";
import UserMenu from "./UserMenu";

function NavigationBar() {
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/nova-store.svg"
            style={{ width: "30px", height: "30px" }}
            width={30}
            height={30}
            alt="Logo de NovaStore"
            loading="lazy"
          />
          NovaStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/" aria-label="Inicio">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" aria-label="Productos">
              Productos
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link
                as={Link}
                to="/cart"
                className="cart__items-container"
                aria-label="Carrito"
                title="Ir al carrito"
              >
                <ShoppingCart size={20} className="me-2" />
                {getCartItemsCount() > 0 && (
                  <p className="cart__items-badge">{getCartItemsCount()}</p>
                )}
              </Nav.Link>
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
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
