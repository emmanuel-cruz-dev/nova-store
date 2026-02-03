import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../stores";
import {
  ProfileMainContent,
  ProfileSidebar,
  OrdersSection,
  FavoritesSection,
} from "../components";
import { userMenuItems } from "../data/menuItems";

function Account() {
  const { user } = useAuthStore();
  const { section = "profile" } = useParams();
  const navigate = useNavigate();

  const menuItems = useMemo(() => userMenuItems, []);

  const setActiveSection = (newSection: string) => {
    navigate(`/account/${newSection}`);
  };

  const renderSection = () => {
    switch (section) {
      case "profile":
        return <ProfileMainContent />;
      case "favorites":
        return <FavoritesSection />;
      case "orders":
        return <OrdersSection userId={user?.id || 0} />;
      default:
        return <ProfileMainContent />;
    }
  };

  return (
    <Container
      fluid
      className="bg-light py-4"
      id="account"
      style={{ maxWidth: "1280px" }}
    >
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

export default Account;
