import { AxiosError } from "axios";
import axios from "../config/axiosConfig";
import { CreateProductDTO } from "../../types";

const getAllProducts = async () => {
  try {
    const response = await axios.get(`/products`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

const getProducts = async (page: number, limit: number, status = "true") => {
  try {
    const baseUrl = `/products?page=${page}&limit=${limit}`;
    const url = status === "all" ? baseUrl : `${baseUrl}&isActive=${status}`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    const total = await getAllProducts();

    return {
      data: response.data,
      total: total.length,
    };
  } catch (error: unknown) {
    console.error("Error fetching products", error);

    if (error instanceof Error) {
      throw error;
    } else if (error instanceof AxiosError) {
      throw new Error(`Server error: ${error.response?.status}`);
    } else {
      throw error;
    }
  }
};

const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`/products/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};

const getActiveProducts = async () => {
  try {
    const response = await axios.get(`/products?isActive=true`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

const getProductsByCategory = async (category: string) => {
  try {
    const url =
      category === "all"
        ? "/products?isActive=true"
        : `/products?category=${category}&isActive=true`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`/products/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

const updateProduct = async (productId: number, formData: CreateProductDTO) => {
  try {
    const response = await axios.put(`/products/${productId}`, formData);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

const createProduct = async (formData: CreateProductDTO) => {
  try {
    const response = await axios.post(`/products`, formData);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

const bulkUpdateStatus = async (productIds: number[], isActive: boolean) => {
  let successCount = 0;

  for (const id of productIds) {
    try {
      await axios.put(`/products/${id}`, { isActive });
      successCount++;
    } catch (err) {
      console.error(`Error updating product ${id}`, err);
    }
  }

  return {
    success: successCount === productIds.length,
    count: successCount,
  };
};

const bulkDelete = async (productIds: number[]) => {
  let successCount = 0;

  for (const id of productIds) {
    try {
      await axios.delete(`/products/${id}`);
      successCount++;
    } catch (error) {
      console.error(`Error deleting product ${id}`, error);
    }
  }

  return {
    success: successCount === productIds.length,
    count: successCount,
  };
};

const bulkUpdateStock = async (
  products: any[],
  adjustmentData: { type: string; value: number }
) => {
  let successCount = 0;

  for (const product of products) {
    try {
      let newStock = product.stock;

      if (adjustmentData.type === "increase") {
        newStock = product.stock + adjustmentData.value;
      } else if (adjustmentData.type === "decrease") {
        newStock = Math.max(0, product.stock - adjustmentData.value);
      } else if (adjustmentData.type === "set") {
        newStock = adjustmentData.value;
      }

      await axios.put(`/products/${product.id}`, { stock: newStock });
      successCount++;
    } catch (err) {
      console.error(`Error updating stock for product ${product.id}`, err);
    }
  }

  return {
    success: successCount === products.length,
    count: successCount,
  };
};

const bulkApplyDiscount = async (
  products: any[],
  discountData: { type: string; value: number }
) => {
  let successCount = 0;

  for (const product of products) {
    try {
      let newPrice = product.price;

      if (discountData.type === "percentage") {
        newPrice = product.price * (1 - discountData.value / 100);
      } else if (discountData.type === "fixed") {
        newPrice = Math.max(0, product.price - discountData.value);
      }

      await axios.put(`/products/${product.id}`, {
        price: Number(newPrice.toFixed(2)),
      });
      successCount++;
    } catch (err) {
      console.error(`Error applying discount to product ${product.id}`, err);
    }
  }

  return {
    success: successCount === products.length,
    count: successCount,
  };
};

const bulkAdjustPrices = async (
  products: any[],
  adjustmentData: { type: string; percentage: number }
) => {
  let successCount = 0;

  for (const product of products) {
    try {
      let newPrice = product.price;

      if (adjustmentData.type === "increase") {
        newPrice = product.price * (1 + adjustmentData.percentage / 100);
      } else if (adjustmentData.type === "decrease") {
        newPrice = product.price * (1 - adjustmentData.percentage / 100);
      }

      await axios.put(`/products/${product.id}`, {
        price: Number(newPrice.toFixed(2)),
      });
      successCount++;
    } catch (err) {
      console.error(`Error adjusting price for product ${product.id}`, err);
    }
  }

  return {
    success: successCount === products.length,
    count: successCount,
  };
};

export const productService = {
  getAllProducts,
  getProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
  createProduct,
  bulkUpdateStatus,
  bulkDelete,
  bulkUpdateStock,
  bulkApplyDiscount,
  bulkAdjustPrices,
};
