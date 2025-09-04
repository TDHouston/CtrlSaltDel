import React from "react";

function UserStats({ stats, isLoading }) {
    const statItems = [
        {
            label: "Total Recipes",
            value: stats?.recipeCount || 0,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            textColor: "text-blue-600 dark:text-blue-400"
        },
        {
            label: "Favorite Recipes",
            value: stats?.favoriteCount || 0,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            color: "from-red-500 to-pink-600",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            textColor: "text-red-600 dark:text-red-400"
        },
        {
            label: "Total Likes Received",
            value: stats?.totalLikes || 0,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
            ),
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            textColor: "text-green-600 dark:text-green-400"
        },
        {
            label: "Days Active",
            value: stats?.joinedDays || 0,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            textColor: "text-purple-600 dark:text-purple-400"
        }
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2 w-24"></div>
                                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16"></div>
                            </div>
                            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item, index) => (
                <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                {item.label}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-200">
                                {item.value.toLocaleString()}
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${item.bgColor} ${item.textColor} group-hover:scale-110 transition-transform duration-200`}>
                            {item.icon}
                        </div>
                    </div>
                    
                    {/* Progress indicator for recipes */}
                    {index === 0 && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Recipes created</span>
                                <span>{item.value >= 10 ? 'Expert' : item.value >= 5 ? 'Intermediate' : 'Beginner'}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                                    style={{ width: `${Math.min((item.value / 10) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Favorites indicator */}
                    {index === 1 && item.value > 0 && (
                        <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <svg className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Food enthusiast
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UserStats;