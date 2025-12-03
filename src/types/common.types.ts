export interface PaginationItemProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export interface ErrorMessageProps {
  error: any;
  entity?: string;
  onRetry?: () => void;
}
