import { useLanguage } from '@/lib/i18n-config';
import { useState } from 'react';

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    options: {
      value: string;
      label: string;
    }[];
    multiple?: boolean;
  }[];
  onFilterChange: (filterId: string, values: string[]) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export default function FilterBar({
  filters,
  onFilterChange,
  searchPlaceholder,
  onSearch,
}: FilterBarProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // Toggle filter dropdown
  const toggleFilter = (filterId: string) => {
    setOpenFilterId(openFilterId === filterId ? null : filterId);
  };

  // Handle filter option selection
  const handleFilterOptionChange = (filterId: string, value: string, checked: boolean) => {
    const currentValues = activeFilters[filterId] || [];
    let newValues: string[];
    
    const filter = filters.find(f => f.id === filterId);
    const isMultiple = filter?.multiple !== false;
    
    if (isMultiple) {
      // Multiple selection
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(v => v !== value);
      }
    } else {
      // Single selection
      newValues = checked ? [value] : [];
    }
    
    const newActiveFilters = {
      ...activeFilters,
      [filterId]: newValues,
    };
    
    setActiveFilters(newActiveFilters);
    onFilterChange(filterId, newValues);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
    filters.forEach(filter => {
      onFilterChange(filter.id, []);
    });
  };

  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).reduce(
    (count, values) => count + values.length,
    0
  );

  return (
    <div className="bg-white shadow px-4 py-3 sm:px-6 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search input */}
        {onSearch && (
          <div className="w-full sm:max-w-xs">
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="search" className="sr-only">
                {searchPlaceholder || t('actions.search')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={searchPlaceholder || t('actions.search')}
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>
        )}

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-700">{t('actions.filter')}:</span>
          
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                type="button"
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  (activeFilters[filter.id]?.length || 0) > 0
                    ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.label}
                {(activeFilters[filter.id]?.length || 0) > 0 && (
                  <span className="ml-1 bg-indigo-100 text-indigo-600 py-0.5 px-1.5 rounded-full text-xs">
                    {activeFilters[filter.id].length}
                  </span>
                )}
                <svg
                  className={`ml-2 h-5 w-5 ${openFilterId === filter.id ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {/* Filter dropdown */}
              {openFilterId === filter.id && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {filter.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <input
                          id={`filter-${filter.id}-${option.value}`}
                          name={`filter-${filter.id}`}
                          type={filter.multiple === false ? 'radio' : 'checkbox'}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={(activeFilters[filter.id] || []).includes(option.value)}
                          onChange={(e) => handleFilterOptionChange(filter.id, option.value, e.target.checked)}
                        />
                        <label
                          htmlFor={`filter-${filter.id}-${option.value}`}
                          className="ml-3 block text-sm text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Clear filters button */}
          {totalActiveFilters > 0 && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={clearAllFilters}
            >
              {t('actions.clearFilters')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
