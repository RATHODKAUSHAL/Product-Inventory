import { useState, useCallback } from 'react';
import { productsAPI, type Product, type Pagination } from '../services/api';

interface FetchParams {
  [key: string]: any; // query params
}

interface CreateProductData {
  name: string;
  description?: string;
  price?: number;
  // Add more if needed
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      field?: string;
    };
  };
}

interface CreateProductSuccess {
  success: true;
  data: Product;
}

interface CreateProductError {
  success: false;
  error: string;
  field?: string;
}

type CreateProductResult = CreateProductSuccess | CreateProductError;

interface DeleteProductSuccess {
  success: true;
}

interface DeleteProductError {
  success: false;
  error: string;
}

type DeleteProductResult = DeleteProductSuccess | DeleteProductError;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchProducts = useCallback(async (params: FetchParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getAll(params);
      setProducts(response.data.products); // <-- products here
      setPagination(response.data.pagination); // <-- pagination here
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (
    productData: CreateProductData
  ): Promise<CreateProductResult> => {
    try {
      const response = await productsAPI.create(productData);
      return { success: true, data: response.data };
    } catch (err) {
      const error = err as ApiError;
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create product',
        field: error.response?.data?.field,
      };
    }
  };

  const deleteProduct = async (id: string): Promise<DeleteProductResult> => {
    try {
      await productsAPI.delete(id);
      return { success: true };
    } catch (err) {
      const error = err as ApiError;
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete product',
      };
    }
  };

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    deleteProduct,
  };
};
