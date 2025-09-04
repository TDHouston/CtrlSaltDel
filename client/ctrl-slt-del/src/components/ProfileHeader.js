import React from "react";

function ProfileHeader({ user, userStats, isLoading }) {
    const getUserInitials = () => {
        if (!user) return "U";
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.username?.charAt(0).toUpperCase() || "U";
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            case 'USER':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-300">
                <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4 w-3/4"></div>
                        <div className="flex space-x-4">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {/* Cover Area with Gradient */}
            <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-t-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-12 relative z-10">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-gray-800 shadow-lg">
                            {getUserInitials()}
                        </div>
                        {user?.role === "ADMIN" && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 mt-4 sm:mt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                    {user?.firstName} {user?.lastName}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    @{user?.username}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                    {user?.email}
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user?.role)}`}>
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {userStats?.recipeCount || 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Recipes
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {userStats?.favoriteCount || 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Favorites
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {userStats?.totalLikes || 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Likes
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {userStats?.joinedDays || 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Days
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;