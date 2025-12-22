import { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";
import {
  ProfileMainContent,
  ProfileSidebar,
  ProductsTable,
  UsersTable,
  OrdersTable,
  AdminOrdersTable,
} from "../components";
import { adminMenuItems, userMenuItems } from "../data/menuItems";

function Profile() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const [activeSection, setActiveSection] = useState("profile");

  const menuItems = useMemo(() => {
    if (isAdmin) {
      return adminMenuItems;
    }

    return userMenuItems;
  }, [isAdmin]);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileMainContent />;
      case "orders":
        return <OrdersTable />;
      case "all-orders":
        return <AdminOrdersTable />;
      case "products":
        return <ProductsTable />;
      case "users":
        return <UsersTable />;
      default:
        return <ProfileMainContent />;
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4" id="profile">
      <Row>
        <Col lg={3} className="mb-4">
          <ProfileSidebar
            menuItems={menuItems}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </Col>

        <Col lg={9}>{renderSection()}</Col>
      </Row>
    </Container>
  );
}

export default Profile;
