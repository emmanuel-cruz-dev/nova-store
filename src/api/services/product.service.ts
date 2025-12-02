import { AxiosError } from "axios";
import axios from "../axiosConfig";
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

export const productService = {
  getProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
  createProduct,
};
