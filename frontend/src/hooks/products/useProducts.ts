import { useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { productService } from "../../api";
import {
  CreateProductDTO,
  Product,
  ProductResponse,
  ErrorType,
} from "../../types";

export const useProducts = (
  initialPage = 1,
  initialLimit = 10,
  status = "true"
) => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const { data, error, isLoading, mutate } = useSWR<ProductResponse, ErrorType>(
    ["products", page, limit, status],
    () => productService.getProducts(page, limit, status),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const goToPage = (newPage: number) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const changeLimit = (newLimit: number) => setLimit(newLimit);

  return {
    products: data?.data || [],
    totalProducts: data?.total || 0,
    loading: isLoading,
    error,
    refetch: mutate,
    page,
    limit,
    goToPage,
    changeLimit,
  };
};

export const useProductById = (id: number) => {
  const { data, error, isLoading } = useSWR(
    id ? ["product", id] : null,
    () => productService.getProductById(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    product: data || null,
    loading: isLoading,
    error,
  };
};

export const useActiveProducts = () => {
  const { data, error, isLoading } = useSWR(
    "activeProducts",
    productService.getActiveProducts,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
};

export const useProductsByCategory = (category: string) => {
  const { data, error, isLoading } = useSWR(
    category ? ["productsByCategory", category] : null,
    () => productService.getProductsByCategory(category),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
};

export const useDeleteProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "deleteProduct",
    async (_, { arg: id }: { arg: number }) => {
      return await productService.deleteProduct(id);
    },
    {
      onSuccess: () => {
        mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    }
  );

  return {
    deleteProduct: trigger,
    loading: isMutating,
    error,
  };
};

export const useUpdateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Product,
    ErrorType,
    string,
    { productId: number; formData: CreateProductDTO }
  >(
    "updateProduct",
    async (
      _,
      {
        arg: { productId, formData },
      }: { arg: { productId: number; formData: CreateProductDTO } }
    ) => {
      const result = await productService.updateProduct(productId, formData);
      mutate(["product", productId]);
      mutate((key) => Array.isArray(key) && key[0] === "products");
      return result;
    }
  );

  return {
    updateProduct: (productId: number, formData: CreateProductDTO) =>
      trigger({ productId, formData }),
    loading: isMutating,
    error,
  };
};

export const useCreateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Product,
    ErrorType,
    string,
    CreateProductDTO
  >(
    "createProduct",
    async (_, { arg: formData }: { arg: CreateProductDTO }) => {
      return await productService.createProduct(formData);
    },
    {
      onSuccess: () => {
        mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    }
  );

  return {
    createProduct: trigger,
    loading: isMutating,
    error,
  };
};
