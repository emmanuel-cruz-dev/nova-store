import { Container, Alert, Button } from "react-bootstrap";
import { RefreshCw } from "lucide-react";
import { useDashboard } from "../../hooks";

function DashboardError() {
  const { refresh } = useDashboard();

  return (
    <Container fluid className="py-4">
      <Alert variant="danger">
        <Alert.Heading>Error al cargar el dashboard</Alert.Heading>
        <p>
          No se pudieron cargar las estadísticas. Por favor, intenta nuevamente.
        </p>
        <Button variant="outline-danger" size="sm" onClick={() => refresh()}>
          <RefreshCw size={16} className="me-1" />
          Reintentar
        </Button>
      </Alert>
    </Container>
  );
}

export default DashboardError;
