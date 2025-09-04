const SkeletonCard = () => {
  return (
    <div className="recipe-card flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="md:w-48 w-full">
        <div className="bg-gray-200 w-full h-64 md:h-full md:rounded-l-xl rounded-t-xl" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div className="space-y-3">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          
          {/* Author skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>

          {/* Meta info skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-2/5" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mt-4">
          <div className="h-9 bg-gray-200 rounded w-40" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;