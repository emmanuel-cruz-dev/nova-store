import { Alert, Button } from "react-bootstrap";

const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => {
  return (
    <Alert variant="danger">
      <p className="text-danger">{message}</p>
      {onRetry && (
        <footer className="mt-3">
          <Button
            className="btn-sm btn-warning"
            onClick={onRetry}
            type="button"
          >
            Reintentar
          </Button>
        </footer>
      )}
    </Alert>
  );
};

export default ErrorMessage;
