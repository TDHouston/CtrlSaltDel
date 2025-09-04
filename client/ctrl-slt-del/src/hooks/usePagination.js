import { useState } from 'react';

const usePagination = (data, itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination data directly (not in a function to avoid closure issues)
  let paginationData;
  
  if (!data || !Array.isArray(data)) {
    paginationData = {
      currentItems: [],
      currentPage,
      totalPages: 0,
      totalItems: 0,
      startIndex: 0,
      endIndex: 0,
    };
  } else {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = data.slice(startIndex, endIndex);

    paginationData = {
      currentItems,
      currentPage,
      totalPages,
      totalItems,
      startIndex: startIndex + 1, // Convert to 1-based for display
      endIndex,
    };
  }

  // Navigation functions
  const goToPage = (page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < paginationData.totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    goToPage(1);
  };

  const goToLastPage = () => {
    goToPage(paginationData.totalPages);
  };

  // Reset to first page when data changes
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const { totalPages } = paginationData;
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return {
    ...paginationData,
    setCurrentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    getPageNumbers,
    hasNextPage: currentPage < paginationData.totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export default usePagination;