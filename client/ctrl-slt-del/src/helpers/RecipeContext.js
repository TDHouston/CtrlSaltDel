import { createContext, useEffect, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState(null);
    const url = "http://localhost:8080/api/recipes";

    const getAllRecipe = () => {
        fetch(url)
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
