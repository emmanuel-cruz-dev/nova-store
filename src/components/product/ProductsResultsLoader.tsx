import { Placeholder } from "react-bootstrap";

function ProductsResultsLoader() {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Placeholder animation="wave">
        <Placeholder style={{ width: 160, height: 16 }} className="rounded" />
      </Placeholder>
    </div>
  );
}

export default ProductsResultsLoader;
