import { useState, useContext, useEffect, useMemo } from "react";
import { Select, Option } from "@material-tailwind/react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SkeletonGrid from "../components/SkeletonGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import { RecipeContext } from "../helpers/RecipeContext";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";
import { API_ENDPOINTS } from "../config/api";

const sorters = [
    "Favorites (high to low)",
    "Favorites (low to high)",
    "Cook time (low to high)",
    "Cook time (high to low)",
    "Recently Added",
];

function Explore() {
    const [sortBy, setSortBy] = useState("Favorites (high to low)");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { recipes } = useContext(RecipeContext);

    // Search configuration
    const searchKeys = [
        'name',
        'description', 
        'author',
        'categories.name'
    ];

    const {
        searchTerm,
        setSearchTerm,
        filters,
        updateFilter,
        filteredData,
        clearSearch,
        hasActiveFilters,
    } = useSearch(recipes, searchKeys);

    // Fetch categories for filter dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/categories')}`);
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const sortItems = (items) => {
        if (!items || !Array.isArray(items)) {
            return [];
        }
        
        const sortedItems = [...items];
        
        switch (sortBy) {
            case "Favorites (high to low)":
                return sortedItems.sort((a, b) => b.favorited - a.favorited);
            case "Favorites (low to high)":
                return sortedItems.sort((a, b) => a.favorited - b.favorited);
            case "Cook time (low to high)":
                return sortedItems.sort((a, b) => a.cookTime - b.cookTime);
            case "Cook time (high to low)":
                return sortedItems.sort((a, b) => b.cookTime - a.cookTime);
            case "Recently Added":
                return sortedItems.sort((a, b) => b.recipeId - a.recipeId);
            default:
                return sortedItems.sort((a, b) => b.favorited - a.favorited);
        }
    };

    const sortedRecipes = useMemo(() => sortItems(filteredData), [filteredData, sortBy]);
    
    // Pagination
    const paginationData = usePagination(sortedRecipes, 8); // Reduced for better pagination visibility
    

    // Reset pagination when search/filters change
    useEffect(() => {
        paginationData.resetPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, filters, sortBy]);



    return (
        <div className="container relative mx-auto px-4 py-8">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                    What's cooking?
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Discover amazing recipes from our community
                </p>
            </header>

            {/* Search Bar */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                updateFilter={updateFilter}
                clearSearch={clearSearch}
                hasActiveFilters={hasActiveFilters}
                categories={categories}
            />

            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {paginationData.totalItems > 0 && (
                            <>Showing {paginationData.startIndex}-{paginationData.endIndex} of {paginationData.totalItems} recipe{paginationData.totalItems !== 1 ? 's' : ''}</>
                        )}
                        {hasActiveFilters && paginationData.totalItems > 0 && ` (filtered from ${recipes?.length || 0})`}
                    </span>
                </div>
                
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sort by:
                    </label>
                    <div className="w-48">
                        <Select
                            value={sortBy}
                            onChange={(value) => setSortBy(value)}
                            className="min-w-0"
                        >
                            {sorters.map((sort) => (
                                <Option key={sort} value={sort}>
                                    {sort}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div>
                    <SkeletonGrid count={12} />
                </div>
            ) : paginationData.currentItems?.length === 0 ? (
                <div className="text-center py-16">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No recipes found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {hasActiveFilters 
                            ? "Try adjusting your search or filters to see more results."
                            : "No recipes available at the moment."
                        }
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearSearch}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            ) : (
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginationData.currentItems && paginationData.currentItems.map((recipe) => (
                            <div key={recipe.recipeId} className="w-full">
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <Pagination {...paginationData} />
                </section>
            )}
        </div>
    );
}

export default Explore;