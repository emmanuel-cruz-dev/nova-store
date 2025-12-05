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

export interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  text: string;
}

export interface DeleteConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  loading: boolean;
}

export interface BannerItemProps {
  images: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}
