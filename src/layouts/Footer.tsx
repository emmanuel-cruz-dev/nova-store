import { useAuthStore } from "../stores";
import { AdminFooter, CustomerFooter } from "../components";
import "./Footer.css";

function Footer() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  return (
    <footer className="footer bg-black text-white py-md-2" id="footer">
      {isAdmin ? <AdminFooter /> : <CustomerFooter />}
    </footer>
  );
}

export default Footer;
