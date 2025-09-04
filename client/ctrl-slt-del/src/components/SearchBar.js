import { useState } from 'react';
import { Input, Button, Select, Option, IconButton } from '@material-tailwind/react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filters,
  updateFilter,
  clearSearch,
  hasActiveFilters,
  categories = [],
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const cookTimeOptions = [
    { label: 'Under 30 min', value: '30' },
    { label: 'Under 60 min', value: '60' },
    { label: 'Under 90 min', value: '90' },
    { label: 'Under 120 min', value: '120' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Main Search Bar */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-t-gray-400 pl-10 w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <IconButton
            variant={showFilters ? "filled" : "outlined"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="min-w-[40px] dark:border-gray-600 dark:text-white"
          >
            <FunnelIcon className="h-4 w-4" />
          </IconButton>

          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="sm"
              onClick={clearSearch}
              className="flex items-center gap-1 whitespace-nowrap dark:border-gray-600 dark:text-white"
            >
              <XMarkIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty
              </label>
              <Select
                value={filters.difficulty}
                onChange={(value) => updateFilter('difficulty', value)}
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <Option value="">All Levels</Option>
                {difficulties.map((difficulty) => (
                  <Option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <Select
                value={filters.category}
                onChange={(value) => updateFilter('category', value)}
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <Option value="">All Categories</Option>
                {categories.map((category) => (
                  <Option key={category.categoryId} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Cook Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Cook Time
              </label>
              <Select
                value={filters.maxCookTime}
                onChange={(value) => updateFilter('maxCookTime', value)}
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <Option value="">Any Duration</Option>
                {cookTimeOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              Search: "{searchTerm}"
            </span>
          )}
          {filters.difficulty && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {filters.difficulty.charAt(0) + filters.difficulty.slice(1).toLowerCase()}
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
              {filters.category}
            </span>
          )}
          {filters.maxCookTime && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
              Under {filters.maxCookTime} min
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;