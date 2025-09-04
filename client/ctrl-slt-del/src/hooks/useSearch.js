import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

const useSearch = (data, searchKeys, options = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    category: '',
    maxCookTime: '',
  });

  // Configure Fuse.js options
  const fuseOptions = {
    keys: searchKeys,
    threshold: 0.3, // 0.0 = exact match, 1.0 = match anything
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ...options,
  };

  // Create Fuse instance
  const fuse = useMemo(() => {
    if (!data || data.length === 0) return null;
    return new Fuse(data, fuseOptions);
  }, [data, fuseOptions]);

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    if (!data) return [];

    let results = data;

    // Apply text search
    if (searchTerm && fuse) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults.map(result => result.item);
    }

    // Apply additional filters
    results = results.filter(item => {
      // Filter by difficulty
      if (filters.difficulty && item.difficulty !== filters.difficulty) {
        return false;
      }

      // Filter by category
      if (filters.category && item.categories) {
        const hasCategory = item.categories.some(
          cat => cat.name?.toLowerCase() === filters.category.toLowerCase()
        );
        if (!hasCategory) return false;
      }

      // Filter by cook time
      if (filters.maxCookTime && item.cookTime > parseInt(filters.maxCookTime)) {
        return false;
      }

      return true;
    });

    return results;
  }, [data, searchTerm, filters, fuse]);

  // Helper functions
  const clearSearch = () => {
    setSearchTerm('');
    setFilters({
      difficulty: '',
      category: '',
      maxCookTime: '',
    });
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    updateFilter,
    filteredData,
    clearSearch,
    hasActiveFilters: searchTerm || Object.values(filters).some(Boolean),
  };
};

export default useSearch;