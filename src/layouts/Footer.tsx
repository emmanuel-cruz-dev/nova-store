import { useAuthStore } from "../stores";
import { AdminFooter, CustomerFooter } from "../components";
import { hasAdminAccess } from "../utils";
import "./Footer.css";

function Footer() {
  const { user } = useAuthStore();
  const isAdmin = hasAdminAccess(user?.role);

  return (
    <footer className="footer bg-black text-white py-md-2" id="footer">
      {isAdmin ? <AdminFooter /> : <CustomerFooter />}
    </footer>
  );
}

export default Footer;
