import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserMenu from "../../layouts/UserMenu";

function AdminNavbar() {
  return (
    <>
      <Navbar.Brand
        as={Link}
        to="/admin"
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
        <span className="badge mt-1 fw-normal">| Admin</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="admin-navbar" />
      <Navbar.Collapse id="admin-navbar">
        <Nav className="ms-auto align-items-center">
          <UserMenu />
        </Nav>
      </Navbar.Collapse>
    </>
  );
}

export default AdminNavbar;
