import { Pagination } from "react-bootstrap";

function PaginationItem({ currentPage, totalPages, onPageChange, isLoading }) {
  if (totalPages <= 1) return null;

  const items = [];

  items.push(
    <Pagination.First
      key="first"
      disabled={currentPage === 1 || isLoading}
      onClick={() => onPageChange(1)}
    />
  );

  items.push(
    <Pagination.Prev
      key="prev"
      disabled={currentPage === 1 || isLoading}
      onClick={() => onPageChange(currentPage - 1)}
    />
  );

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  }
  if (currentPage > totalPages - 3) {
    startPage = Math.max(1, totalPages - 4);
  }

  if (startPage > 1) {
    items.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        disabled={isLoading}
        onClick={() => onPageChange(1)}
      >
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        disabled={isLoading}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
    }
    items.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === currentPage}
        disabled={isLoading}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  items.push(
    <Pagination.Next
      key="next"
      disabled={currentPage === totalPages || isLoading}
      onClick={() => onPageChange(currentPage + 1)}
    />
  );

  items.push(
    <Pagination.Last
      key="last"
      disabled={currentPage === totalPages || isLoading}
      onClick={() => onPageChange(totalPages)}
    />
  );

  return (
    <article className="d-flex justify-content-center mt-5 fw-medium">
      <Pagination>{items}</Pagination>
    </article>
  );
}

export default PaginationItem;
