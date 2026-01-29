import { ReactNode } from "react";
import { Table } from "react-bootstrap";

const UserTableWrapper = ({ children }: { children: ReactNode }) => (
  <div className="card rounded-3 shadow-sm overflow-hidden">
    <Table
      className="mb-0"
      striped
      bordered
      hover
      responsive
      style={{ minWidth: "680px" }}
    >
      {children}
    </Table>
  </div>
);

export default UserTableWrapper;
