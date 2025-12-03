import { Button } from "react-bootstrap";
import { ErrorMessageProps } from "../../types";

const ErrorMessage = ({ error, entity, onRetry }: ErrorMessageProps) => {
  let message;

  if (error.message) {
    message = error.message;
  } else if (error.response) {
    message = error.response.data.message;
  } else {
    message = "Algo ha salido mal";
  }

  if (entity) {
    message = `${entity}: ${message}`;
  }

  return (
    <article
      className="alert alert-warning"
      role="alert"
      style={{ maxWidth: "460px" }}
    >
      <p className="text-danger">
        <strong>Atención:</strong> {message}
      </p>
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
    </article>
  );
};

export default ErrorMessage;
