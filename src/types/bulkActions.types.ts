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

export interface BulkUpdatePayload {
  productIds: number[];
  updates: Partial<{
    isActive: boolean;
    stock: number;
    price: number;
  }>;
}
