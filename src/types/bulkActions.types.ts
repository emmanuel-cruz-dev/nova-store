import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export type BulkAction =
  | "activate"
  | "deactivate"
  | "delete"
  | "adjustStock"
  | "applyDiscount"
  | "adjustPrice";

export type AdjustmentType = "increase" | "decrease" | "set";

export type DiscountType = "percentage" | "fixed";

export interface BulkOperationResult {
  success: boolean;
  updatedCount: number;
  failedCount: number;
  message: string;
}

export interface StockAdjustmentData {
  type: AdjustmentType;
  value: number;
}

export interface PriceAdjustmentData {
  type: AdjustmentType;
  percentage: number;
}

export interface DiscountData {
  type: DiscountType;
  value: number;
}

export interface BulkUpdatePayload {
  productIds: number[];
  updates: Partial<{
    isActive: boolean;
    stock: number;
    price: number;
  }>;
}

export interface ActionModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
  title: string;
  icon: LucideIcon;
  selectedCount: number;
  isProcessing: boolean;
  confirmText?: string;
  children: ReactNode;
  isValid: boolean;
}

interface BaseActionModalProps {
  show: boolean;
  onHide: () => void;
  selectedCount: number;
  isProcessing: boolean;
}

export interface DiscountModalProps extends BaseActionModalProps {
  onConfirm: (data: DiscountData) => void;
}

export interface PriceAdjustmentModalProps extends BaseActionModalProps {
  onConfirm: (data: PriceAdjustmentData) => void;
}

export interface StockAdjustmentModalProps extends BaseActionModalProps {
  onConfirm: (data: StockAdjustmentData) => void;
}

export interface BulkDeleteConfirmationModalProps extends BaseActionModalProps {
  onConfirm: () => void;
}

interface BaseToolbarProps {
  selectedCount: number;
  isProcessing: boolean;
  onClearSelection: () => void;
  onDelete: () => void;
}

export interface BulkActionsToolbarProps extends BaseToolbarProps {
  onActivate: () => void;
  onDeactivate: () => void;
  onAdjustStock: () => void;
  onApplyDiscount: () => void;
  onAdjustPrice: () => void;
}

export interface BulkUserActionsToolbarProps extends BaseToolbarProps {
  onChangeRole: () => void;
}
