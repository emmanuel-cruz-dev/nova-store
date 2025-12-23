import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { CheckCircle, X } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useCheckoutStore } from "../../stores/checkoutStore";
import { CheckoutSteps, CheckoutSummary } from "..";

function CheckoutModal() {
  const { user } = useAuthStore();
  const { showModal, handleCloseModal } = useCheckoutStore();

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Body
        className="text-center position-relative"
        style={{ paddingBlock: "1.5rem" }}
      >
        <button
          onClick={handleCloseModal}
          className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
        <figure className="mb-4">
          <CheckCircle size={64} className="text-success" />
        </figure>

        <h2 className="mb-2" style={{ fontSize: "1.75rem" }}>
          ¡Compra realizada con éxito!
        </h2>
        <p className="text-muted mb-2">
          {user && (
            <>
              ¡Gracias por tu compra,{" "}
              <span style={{ textTransform: "capitalize" }}>
                {user.firstName}
              </span>
              !{" "}
            </>
          )}
          Todo salió bien. Podés seguir el estado desde{" "}
          <Link to="/profile/orders" className="text-decoration-none">
            tus órdenes
          </Link>
          .
        </p>

        <CheckoutSummary />
        <CheckoutSteps />
        <Button
          variant="primary"
          onClick={handleCloseModal}
          style={{ padding: "0.5rem 3rem" }}
        >
          Entendido
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutModal;
