import { ReactElement } from "react";
import { Placement } from "react-bootstrap/esm/types";

export interface PaginationItemProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
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
  loading?: boolean;
}

export interface BannerItemProps {
  images: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FeatureProps {
  id: number;
  icon: any;
  title: string;
  subtitle: string;
}

export interface MenuItem {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export interface BannerSlide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imagePosition?: "left" | "right";
}

export interface CustomTooltipProps {
  text: string;
  children: ReactElement;
  placement?: Placement;
  delay?: { show: number; hide: number };
}

export type CheckboxState = "checked" | "unchecked" | "indeterminate";
