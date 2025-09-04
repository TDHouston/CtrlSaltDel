import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

export const useUserStats = (user, token) => {
    const [stats, setStats] = useState({
        recipeCount: 0,
        favoriteCount: 0,
        totalLikes: 0,
        joinedDays: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user?.userId || !token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Calculate days since joining
                const joinDate = new Date(user.createdAt || Date.now());
                const today = new Date();
                const joinedDays = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));

                // Fetch user's recipes count
                const recipesResponse = await fetch(API_ENDPOINTS.RECIPES.BY_USER(user.userId), {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const recipes = recipesResponse.ok ? await recipesResponse.json() : [];

                // Fetch user's favorites count
                const favoritesResponse = await fetch(
                    `${API_ENDPOINTS.USER.BASE.replace('/user', '/favorite')}/${user.userId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                const favorites = favoritesResponse.ok ? await favoritesResponse.json() : [];

                // Calculate total likes (placeholder - would need API endpoint)
                const totalLikes = recipes.reduce((sum, recipe) => sum + (recipe.likes || 0), 0);

                setStats({
                    recipeCount: recipes.length,
                    favoriteCount: favorites.length,
                    totalLikes,
                    joinedDays
                });

            } catch (err) {
                console.error('Error fetching user stats:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, token]);

    return { stats, loading, error };
};