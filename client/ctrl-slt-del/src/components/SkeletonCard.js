const SkeletonCard = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700/50 animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-56">
        <div className="bg-gray-200 dark:bg-gray-700 w-full h-full" />
        {/* Difficulty badge skeleton */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          
          {/* Author skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
        </div>

        {/* Recipe Stats skeleton */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
            </div>
            
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6" />
            </div>
          </div>

          {/* Save button skeleton */}
          <div className="w-16 h-7 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;