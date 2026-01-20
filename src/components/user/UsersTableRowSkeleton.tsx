import { Placeholder } from "react-bootstrap";

function UsersTableRowSkeleton() {
  return (
    <tr>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={4} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={6} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={8} className="rounded" />
        </Placeholder>
      </td>
      <td>
        <Placeholder animation="wave">
          <Placeholder xs={12} className="rounded" />
        </Placeholder>
      </td>
    </tr>
  );
}

export default UsersTableRowSkeleton;
