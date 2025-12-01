import { useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { productService } from "../api/services/product.service";

export const useProducts = (
  initialPage = 1,
  initialLimit = 10,
  status = "true"
) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { data, error, isLoading, mutate } = useSWR(
    ["products", page, limit, status],
    () => productService.getProducts(page, limit, status),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const goToPage = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const changeLimit = (newLimit) => setLimit(newLimit);

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

export const useProductById = (id) => {
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

export const useProductsByCategory = (category) => {
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
    async (_, { arg: id }) => {
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
  const { trigger, isMutating, error } = useSWRMutation(
    "updateProduct",
    async (_, { arg: { productId, formData } }) => {
      return await productService.updateProduct(productId, formData);
    },
    {
      onSuccess: (data, { arg: { productId } }) => {
        mutate(["product", productId]);
        mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    }
  );

  return {
    updateProduct: (productId, formData) => trigger({ productId, formData }),
    loading: isMutating,
    error,
  };
};

export const useCreateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "createProduct",
    async (_, { arg: formData }) => {
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
