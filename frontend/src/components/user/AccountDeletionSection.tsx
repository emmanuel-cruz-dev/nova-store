import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Trash2, AlertTriangle } from "lucide-react";
import { useAccountDeletion } from "../../hooks";
import AccountDeletionModal from "./AccountDeletionModal";

function AccountDeletionSection({
  userId,
  onLogout,
}: {
  userId: number;
  onLogout: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDeleting,
    resetForm,
  } = useAccountDeletion({
    userId,
    onLogout,
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setShowModal(false);
      resetForm();
    }
  };

  return (
    <>
      <Card className="border-danger shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex align-items-start gap-3">
            <figure className="text-danger mt-1">
              <AlertTriangle size={24} />
            </figure>
            <div className="flex-grow-1">
              <h5 className="text-danger mb-2">Zona de Peligro</h5>
              <p className="custom__text-muted">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor
                asegúrate de estar completamente seguro antes de proceder.
              </p>
            </div>
          </div>
          <div className="d-grid d-sm-flex justify-content-sm-end">
            <Button
              variant="outline-danger"
              onClick={handleOpenModal}
              className="d-flex align-items-center justify-content-center gap-2 px-4 py-2"
            >
              <Trash2 size={18} />
              Eliminar mi cuenta
            </Button>
          </div>
        </Card.Body>
      </Card>

      <AccountDeletionModal
        show={showModal}
        onClose={handleCloseModal}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default AccountDeletionSection;
