import { LucideIcon } from "lucide-react";
import { FC, SVGProps, ReactElement, ReactNode } from "react";
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
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface MenuItem {
  id: string;
  icon: FC<SVGProps<SVGSVGElement>>;
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
