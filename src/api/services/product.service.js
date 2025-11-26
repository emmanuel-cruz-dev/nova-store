import axios from "../axiosConfig";

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

const getProducts = async (page, limit, status = "true") => {
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

const updateProduct = async (productId, formData) => {
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

export const productService = {
  getProducts,
  getProductById,
  getActiveProducts,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
};
