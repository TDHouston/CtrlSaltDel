import { createContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState(null);
    const getAllRecipe = () => {
        fetch(API_ENDPOINTS.RECIPES.BASE)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(
                        `Unexpected status code ${response.status}`
                    );
                }
            })
            .then((data) => setRecipes(data));
    };

    useEffect(() => {
        getAllRecipe();
    }, []);

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes, getAllRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
}
