import { IconButton, Button } from '@material-tailwind/react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon 
} from '@heroicons/react/24/outline';

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  hasNextPage,
  hasPreviousPage,
  getPageNumbers,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 px-4">
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing {startIndex}-{endIndex} of {totalItems} results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page */}
        <IconButton
          variant="outlined"
          size="sm"
          onClick={goToFirstPage}
          disabled={!hasPreviousPage}
          className="hidden sm:flex"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </IconButton>

        {/* Previous page */}
        <IconButton
          variant="outlined"
          size="sm"
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </IconButton>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "filled" : "outlined"}
              size="sm"
              onClick={() => goToPage(pageNum)}
              className={`min-w-[2.5rem] ${
                currentPage === pageNum
                  ? "bg-gray-900 dark:bg-gray-700 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </Button>
          ))}
        </div>

        {/* Next page */}
        <IconButton
          variant="outlined"
          size="sm"
          onClick={goToNextPage}
          disabled={!hasNextPage}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </IconButton>

        {/* Last page */}
        <IconButton
          variant="outlined"
          size="sm"
          onClick={goToLastPage}
          disabled={!hasNextPage}
          className="hidden sm:flex"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </IconButton>
      </div>

      {/* Mobile-friendly page info */}
      <div className="text-sm text-gray-600 dark:text-gray-300 sm:hidden">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;