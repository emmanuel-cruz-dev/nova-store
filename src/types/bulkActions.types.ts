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
  type: "increase" | "decrease";
  percentage: number;
}

export interface DiscountData {
  type: DiscountType;
  value: number;
}

type BulkActionPayload = {
  isActive: boolean;
  stock: number;
  price: number;
};

export interface BulkUpdatePayload {
  productIds: number[];
  updates: Partial<BulkActionPayload>;
}

export interface BaseBulkActionsToolbarProps {
  selectedCount: number;
  isProcessing: boolean;
  onClearSelection: () => void;
  onDelete: () => void;
}

export interface BulkUserActionsToolbarProps
  extends BaseBulkActionsToolbarProps {
  onChangeRole: () => void;
}

export interface BulkActionsToolbarProps extends BaseBulkActionsToolbarProps {
  onActivate: () => void;
  onDeactivate: () => void;
  onAdjustStock: () => void;
  onApplyDiscount: () => void;
  onAdjustPrice: () => void;
}

export interface BulkDeleteConfirmationModalProps
  extends Omit<BaseBulkActionsToolbarProps, "onClearSelection" | "onDelete"> {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

export interface DiscountModalProps
  extends Omit<BulkDeleteConfirmationModalProps, "onConfirm"> {
  onConfirm: (data: DiscountData) => void;
}
