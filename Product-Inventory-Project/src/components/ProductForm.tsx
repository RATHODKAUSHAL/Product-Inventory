import { useState, type FormEvent } from 'react';
import Select, { type MultiValue, type StylesConfig } from 'react-select';
import { Plus, Loader2 } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface CategoryOption {
  value: string;
  label: string;
  color?: string;
}

interface ProductFormData {
  name: string;
  description: string;
  quantity: string;
  categories: CategoryOption[];
}

interface ProductFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    quantity: number;
    categories: string[];
  }) => Promise<{ success: boolean; field?: string; error?: string }>;
  loading?: boolean;
}

interface Errors {
  name?: string;
  description?: string;
  quantity?: string;
  categories?: string;
  general?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    quantity: '',
    categories: []
  });

  const [errors, setErrors] = useState<Errors>({});
  const { categories } = useCategories();

  const categoryOptions: CategoryOption[] = categories.map(cat => ({
    value: cat._id,
    label: cat.name,
    color: cat.color
  }))

  const customSelectStyles: StylesConfig<CategoryOption, true> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: errors.categories ? '#EF4444' : state.isFocused ? '#3B82F6' : '#D1D5DB',
      borderRadius: '0.5rem',
      minHeight: '2.75rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: errors.categories ? '#EF4444' : '#9CA3AF'
      }
    }),
    multiValue: (provided, { data }) => ({
      ...provided,
      backgroundColor: data.color + '20',
      borderRadius: '0.375rem'
    }),
    multiValueLabel: (provided, { data }) => ({
      ...provided,
      color: data.color,
      fontWeight: '500'
    }),
    multiValueRemove: (provided, { data }) => ({
      ...provided,
      color: data.color,
      '&:hover': {
        backgroundColor: data.color + '40',
        color: data.color
      }
    })
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name cannot exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    } else if (!Number.isInteger(parseFloat(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a whole number';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      categories: formData.categories.map(cat => cat.value)
    };

    const result = await onSubmit(productData);

    if (result.success) {
      setFormData({
        name: '',
        description: '',
        quantity: '',
        categories: []
      });
      setErrors({});
    } else {
      if (result.field) {
        setErrors({ [result.field]: result.error } as Errors);
      } else {
        setErrors({ general: result.error });
      }
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
            maxLength={100}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          <p className="mt-1 text-xs text-gray-500">{formData.name.length}/100 characters</p>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter quantity"
            min={0}
          />
          {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product description"
            maxLength={500}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 characters</p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
            Categories *
          </label>
          <Select
            isMulti
            value={formData.categories}
            onChange={(selectedOptions) => handleInputChange('categories', selectedOptions as MultiValue<CategoryOption> || [])}
            options={categoryOptions}
            styles={customSelectStyles}
            placeholder="Select categories..."
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
