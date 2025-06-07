import React, { useState, useEffect } from 'react';
import Select, {  type StylesConfig } from 'react-select';
import { Search, Filter } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface Category {
  _id: string;
  name: string;
  color?: string;
}

interface CategoryOption {
  value: string;
  label: string;
  color?: string;
}

interface SearchAndFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (categories: CategoryOption[]) => void;
  searchValue: string;
  selectedCategories: CategoryOption[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearchChange,
  onCategoryChange,
  searchValue,
  selectedCategories,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(searchValue || '');
  const { categories } = useCategories();

  const categoryOptions: CategoryOption[] = categories.map((cat: Category) => ({
    value: cat._id,
    label: cat.name,
    color: cat.color,
  }));

  const customSelectStyles: StylesConfig<CategoryOption, true> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
      borderRadius: '0.5rem',
      minHeight: '2.75rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#9CA3AF',
      },
    }),
    multiValue: (provided, { data }) => ({
      ...provided,
      backgroundColor: (data.color ?? '#000') + '20',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided, { data }) => ({
      ...provided,
      color: data.color ?? '#000',
      fontWeight: '500',
    }),
    multiValueRemove: (provided, { data }) => ({
      ...provided,
      color: data.color ?? '#000',
      '&:hover': {
        backgroundColor: (data.color ?? '#000') + '40',
        color: data.color ?? '#000',
      },
    }),
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Search & Filter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Search by name or description..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Categories
          </label>
          <Select
            isMulti
            value={selectedCategories}
            onChange={(selectedOptions) =>
              onCategoryChange(selectedOptions ? [...selectedOptions] : [])
            }
            options={categoryOptions}
            styles={customSelectStyles}
            placeholder="Select categories to filter..."
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            className="react-select-container"
            classNamePrefix="react-select"
            isClearable
            inputId="categories"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
