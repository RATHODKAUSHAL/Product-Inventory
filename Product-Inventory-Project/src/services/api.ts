import axios, { type AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define interfaces for your data models (adjust fields as per your backend)
export interface Product {
  _id: string;
  name: string;
  description?: string;
  categories: Category[];
  quantity: number;
  createdAt: string;
  // add more fields as needed
}

export interface Category {
  _id: string;
  name: string;
  color?: string;
  // add more fields as needed
}


export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// This is the actual data shape returned by GET /products
export interface ProductsResponseData {
  products: Product[];
  pagination: Pagination;
}

type Params = Record<string, any>;

export const productsAPI = {
  // Fix: Use ProductsResponseData as the response type
  getAll: (params: Params = {}): Promise<AxiosResponse<ProductsResponseData>> =>
    api.get('/product', { params }),

  getById: (id: string): Promise<AxiosResponse<Product>> =>
    api.get(`/product/${id}`),

  create: (data: Partial<Product>): Promise<AxiosResponse<Product>> =>
    api.post('/product', data),

  delete: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/product/${id}`),
};

export const categoriesAPI = {
  getAll: (): Promise<AxiosResponse<Category[]>> =>
    api.get('/categories'),
};

export default api;