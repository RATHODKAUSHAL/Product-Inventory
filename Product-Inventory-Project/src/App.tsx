import React, { useState, useEffect, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchAndFilter from './components/SearchAndFilter';
import Pagination from './components/Pagination';
import Toast from './components/Toast';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface CategoryOption {
  value: string;
  label: string;
}

interface ToastData {
  message: string;
  type: 'success' | 'error';
}

interface ProductDataForSubmit {
  name: string;
  description: string;
  quantity: number;
  categories: string[]; // Array of category IDs
}

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    deleteProduct,
  } = useProducts();

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleProductSubmit = async (
    productData: ProductDataForSubmit
  ): Promise<{ success: boolean; error?: string }> => {
    setIsFormLoading(true);
    const result = await createProduct(productData);
    setIsFormLoading(false);

    if (result.success) {
      showToast('Product added successfully!');
      fetchProducts({
        page: 1,
        search: searchValue,
        categories: selectedCategories.map(cat => cat.value).join(','),
      });
      setCurrentPage(1);
    } else {
      showToast(result.error ?? 'Failed to add product', 'error');
    }

    return result;
  };

  const handleProductDelete = async (id: string) => {
    const result = await deleteProduct(id);
    if (result.success) {
      showToast('Product deleted successfully!');
      fetchProducts({
        page: currentPage,
        search: searchValue,
        categories: selectedCategories.map(cat => cat.value).join(','),
      });
    } else {
      showToast(result.error ?? 'Failed to delete product', 'error');
    }
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((categories: CategoryOption[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const params = {
      page: currentPage,
      search: searchValue,
      categories: selectedCategories.map(cat => cat.value).join(','),
    };
    fetchProducts(params);
  }, [currentPage, searchValue, selectedCategories, fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <Navbar/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Add Product Form */}
          <section>
            <ProductForm onSubmit={handleProductSubmit} loading={isFormLoading} />
          </section>

          {/* Search and Filter */}
          <section>
            <SearchAndFilter
              searchValue={searchValue}
              selectedCategories={selectedCategories}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
            />
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Product List */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Products ({pagination.totalProducts})
              </h2>
            </div>
            <ProductList
              products={products}
              loading={loading}
              onDelete={handleProductDelete}
            />
          </section>

          {/* Pagination */}
          <section>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer/>
    </div>
  );
};

export default App;
