import { Placeholder } from "react-bootstrap";

function UsersTableRowSkeleton() {
  return (
    <tr>
      <td className="align-middle text-center">
        <Placeholder animation="wave">
          <Placeholder style={{ width: 16, height: 16 }} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Placeholder animation="wave">
            <Placeholder
              style={{ width: 32, height: 32 }}
              className="rounded-circle"
            />
          </Placeholder>
          <Placeholder animation="wave" className="flex-grow-1">
            <Placeholder xs={8} className="rounded" />
          </Placeholder>
        </div>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={10} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={3} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={6} className="rounded" />
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

export default UsersTableRowSkeleton;
