import { Placeholder } from "react-bootstrap";

function ProductTableRowSkeleton() {
  return (
    <tr>
      <td className="align-middle text-center">
        <Placeholder animation="wave">
          <Placeholder style={{ width: 16, height: 16 }} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={10} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={5} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={6} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <div className="align-middle">
          <Placeholder animation="wave" style={{ marginRight: 4 }}>
            <Placeholder xs={2} className="rounded" />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder
              style={{ width: 14, height: 14 }}
              className="rounded-circle"
            />
          </Placeholder>
        </div>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder
            style={{ width: 48, height: 12 }}
            className="rounded-pill"
          />
        </Placeholder>
      </td>
      <td>
        <div className="d-flex gap-2">
          <Placeholder animation="wave">
            <Placeholder
              style={{ width: 90, height: 24 }}
              className="rounded"
            />
          </Placeholder>
          <Placeholder animation="wave">
            <Placeholder
              style={{ width: 90, height: 24 }}
              className="rounded"
            />
          </Placeholder>
        </div>
      </td>
    </tr>
  );
}

export default ProductTableRowSkeleton;
