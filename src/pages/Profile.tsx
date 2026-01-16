import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../stores";
import {
  ProfileMainContent,
  ProfileSidebar,
  ProductsTable,
  UsersTable,
  OrdersSection,
  AdminOrdersTable,
  FavoritesSection,
} from "../components";
import { adminMenuItems, userMenuItems } from "../data/menuItems";

function Profile() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const { section = "profile" } = useParams();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    if (isAdmin) {
      return adminMenuItems;
    }

    return userMenuItems;
  }, [isAdmin]);

  const setActiveSection = (newSection: string) => {
    navigate(`/profile/${newSection}`);
  };

  const renderSection = () => {
    switch (section) {
      case "profile":
        return <ProfileMainContent />;
      case "favorites":
        return <FavoritesSection />;
      case "orders":
        return <OrdersSection userId={user?.id!} />;
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
            activeSection={section}
          />
        </Col>

        <Col lg={9}>{renderSection()}</Col>
      </Row>
    </Container>
  );
}

export default Profile;
