import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { productService } from "../../api/services/product.service";
import {
  Product,
  StockAdjustmentData,
  PriceAdjustmentData,
  DiscountData,
} from "../../types";

export function useBulkActions(onSuccess: () => void) {
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActivate = useCallback(
    async (productIds: number[]) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkUpdateStatus(productIds, true);

        if (result.success) {
          toast.success(`${result.count} productos activados correctamente`);
        } else {
          toast.warning(
            `${result.count} de ${productIds.length} productos activados. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al activar productos");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  const bulkDeactivate = useCallback(
    async (productIds: number[]) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkUpdateStatus(productIds, false);

        if (result.success) {
          toast.success(`${result.count} productos desactivados correctamente`);
        } else {
          toast.warning(
            `${result.count} de ${productIds.length} productos desactivados. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al desactivar productos");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  const bulkDelete = useCallback(
    async (productIds: number[]) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkDelete(productIds);

        if (result.success) {
          toast.success(`${result.count} productos eliminados correctamente`);
        } else {
          toast.warning(
            `${result.count} de ${productIds.length} productos eliminados. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al eliminar productos");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  const bulkAdjustStock = useCallback(
    async (products: Product[], adjustmentData: StockAdjustmentData) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkUpdateStock(
          products,
          adjustmentData
        );

        if (result.success) {
          toast.success(
            `Stock actualizado en ${result.count} productos correctamente`
          );
        } else {
          toast.warning(
            `Stock actualizado en ${result.count} de ${products.length} productos. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al ajustar stock");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  const bulkApplyDiscount = useCallback(
    async (products: Product[], discountData: DiscountData) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkApplyDiscount(
          products,
          discountData
        );

        if (result.success) {
          toast.success(
            `Descuento aplicado a ${result.count} productos correctamente`
          );
        } else {
          toast.warning(
            `Descuento aplicado a ${result.count} de ${products.length} productos. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al aplicar descuento");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  const bulkAdjustPrice = useCallback(
    async (products: Product[], adjustmentData: PriceAdjustmentData) => {
      setIsProcessing(true);
      try {
        const result = await productService.bulkAdjustPrices(
          products,
          adjustmentData
        );

        if (result.success) {
          toast.success(
            `Precios ajustados en ${result.count} productos correctamente`
          );
        } else {
          toast.warning(
            `Precios ajustados en ${result.count} de ${products.length} productos. Algunos fallaron.`
          );
        }
        onSuccess();
      } catch (error) {
        toast.error("Error al ajustar precios");
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [onSuccess]
  );

  return {
    isProcessing,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    bulkAdjustStock,
    bulkApplyDiscount,
    bulkAdjustPrice,
  };
}
