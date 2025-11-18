import axios from "../axiosConfig";

const getProducts = async (page, limit, status = "true") => {
  try {
    const baseUrl = `/products?page=${page}&limit=${limit}`;
    const url = status === "all" ? baseUrl : `${baseUrl}&isActive=${status}`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);

    if (error.response) {
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Network error: Could not reach server");
    } else {
      throw error;
    }
  }
};

const getProductById = async (id) => {
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

const getProductsByCategory = async (category) => {
  try {
    const url =
      category === "all" ? "/products" : `/products?category=${category}`;
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

const deleteProduct = async (id) => {
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

export const productService = {
  getProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory,
  deleteProduct,
};
