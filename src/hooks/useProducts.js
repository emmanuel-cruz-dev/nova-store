import { useEffect, useState } from "react";
import { productService } from "../api/services/product.service";

export const useProducts = (initialPage, initialLimit, status = "true") => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, total } = await productService.getProducts(
          page,
          limit,
          status
        );

        setProducts(data);
        setTotalProducts(total);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, status, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  const goToPage = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const changeLimit = (newLimit) => setLimit(newLimit);

  return {
    products,
    loading,
    error,
    refetch,
    page,
    limit,
    totalProducts,
    goToPage,
    changeLimit,
  };
};

export const useProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);

      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export const useActiveProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getActiveProducts();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProducts();
  }, []);

  return { products, loading, error };
};

export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setProducts([]);
      return;
    }

    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getProductsByCategory(category);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return { products, loading, error };
};

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.deleteProduct(id);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProduct = async (productId, formData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.updateProduct(productId, formData);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};
