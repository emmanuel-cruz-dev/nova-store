import { useAuthStore } from "../stores";
import { AdminFooter, CustomerFooter } from "../components";
import { hasAdminAccess } from "../utils";
import "./Footer.css";

function Footer() {
  const { user } = useAuthStore();
  const isAdmin = hasAdminAccess(user?.role);

  return (
    <footer
      className="footer text-white py-md-2"
      id="footer"
      style={{
        background: "linear-gradient(360deg, #000000 20%, #001122 100%)",
      }}
    >
      {isAdmin ? <AdminFooter /> : <CustomerFooter />}
    </footer>
  );
}

export default Footer;
