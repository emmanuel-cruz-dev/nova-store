import { Navbar, Container } from "react-bootstrap";
import { useAuthStore } from "../stores";
import { AdminNavbar, CustomerNavbar } from "../components";
import { hasAdminAccess } from "../utils";

function NavigationBar() {
  const { user } = useAuthStore();
  const isAdmin = hasAdminAccess(user?.role);

  return (
    <Navbar bg="black" variant="dark" expand="lg" fixed="top">
      <Container>{isAdmin ? <AdminNavbar /> : <CustomerNavbar />}</Container>
    </Navbar>
  );
}

export default NavigationBar;
