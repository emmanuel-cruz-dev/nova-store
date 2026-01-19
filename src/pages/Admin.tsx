import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  ProfileSidebar,
  ProfileMainContent,
  ProductsTable,
  UsersTable,
  AdminOrdersTable,
  Dashboard,
} from "../components";
import { adminMenuItems } from "../data/menuItems";

function Admin() {
  const { section = "dashboard" } = useParams();
  const navigate = useNavigate();

  const menuItems = useMemo(() => adminMenuItems, []);

  const setActiveSection = (newSection: string) => {
    navigate(`/admin/${newSection}`);
  };

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <ProfileMainContent />;
      case "products":
        return <ProductsTable />;
      case "orders":
        return <AdminOrdersTable />;
      case "users":
        return <UsersTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4" id="admin">
      <Row>
        <Col lg={3} className="mb-4">
          <ProfileSidebar
            menuItems={menuItems}
            setActiveSection={setActiveSection}
            activeSection={section}
          />
        </Col>

        <Col lg={9}>{renderSection()}</Col>
      </Row>
    </Container>
  );
}

export default Admin;
