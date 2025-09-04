import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Comment from "../components/Comment";
import { API_ENDPOINTS } from "../config/api";

const RECIPE_DEFAULT = {
    name: "Chocolate Cake",
    difficulty: 3,
    cookTime: 45,
    servings: 8,
    description: "A delicious and decadent chocolate cake",
};

const IMG_DEFAULT = "https://cdn-icons-png.flaticon.com/512/1830/1830839.png";

function Recipe() {
    const [recipe, setRecipe] = useState(RECIPE_DEFAULT);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);


    useEffect(() => {
        if (!id) return setRecipe(RECIPE_DEFAULT);
        fetch(API_ENDPOINTS.RECIPES.BY_ID(id))
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(setRecipe)
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/recipe_ingredient')}/${id}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(setIngredients)
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_ENDPOINTS.RECIPES.BASE.replace('/recipes', '/instruction')}/${id}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(setInstructions)
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        
        const headers = {
            "Content-Type": "application/json"
        };
        
        // Add auth header if user is logged in
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        
        console.log("Loading comments from:", API_ENDPOINTS.COMMENTS.BY_RECIPE(id)); // Debug log
        
        fetch(API_ENDPOINTS.COMMENTS.BY_RECIPE(id), { headers })
            .then((res) => {
                console.log("Comments response status:", res.status); // Debug log
                if (!res.ok) {
                    // Don't reject on auth errors for comments - just return empty array
                    if (res.status === 401 || res.status === 403) {
                        return [];
                    }
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((comments) => {
                console.log("Loaded comments:", comments); // Debug log
                setComments(comments);
            })
            .catch((err) => {
                console.error("Error loading comments:", err);
                setComments([]); // Set empty array on error
            });
    }, [id, token]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        
        // Check if user is authenticated
        if (!user || !token) {
            alert("Please log in to leave a comment.");
            return;
        }

        if (!commentContent.trim()) {
            alert("Please enter a comment before submitting.");
            return;
        }

        const comment = {
            userId: user.userId,
            recipeId: parseInt(id),
            content: commentContent.trim(),
        };

        try {
            console.log("Submitting comment to:", API_ENDPOINTS.COMMENTS.BASE); // Debug log
            console.log("Comment payload:", comment); // Debug log
            
            const response = await fetch(API_ENDPOINTS.COMMENTS.BASE, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    alert("Your session has expired. Please log in again.");
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newComment = await response.json();
            console.log("Comment response:", newComment); // Debug log
            
            // Backend returns comment with commentId and author populated
            // The author field will be populated when the comment is loaded from /recipe/{id} endpoint
            // For immediate display, we'll use the current user's information
            const commentToAdd = {
                commentId: newComment.commentId,
                content: newComment.content,
                userId: newComment.userId,
                author: user.username || `${user.firstName} ${user.lastName}`.trim() || "Anonymous",
                recipeId: newComment.recipeId,
                createdAt: new Date().toISOString() // Add timestamp for display
            };

            setComments(prevComments => [...prevComments, commentToAdd]);
            setCommentContent("");
            
        } catch (err) {
            console.error("Comment submission error:", err);
            alert("Failed to submit comment. Please try again.");
        }
    };

    const handleCommentDeleted = (commentId) => {
        setComments(prevComments => 
            prevComments.filter(comment => comment.commentId !== commentId)
        );
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            EASY: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
            MEDIUM: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800", 
            HARD: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
        };
        return colors[difficulty] || colors.MEDIUM;
    };

    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="container max-w-6xl mx-auto px-4 py-8">
                
                {/* Hero Section */}
                <div className="relative mb-12">
                    <div className="relative h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={recipe.imageUrl || IMG_DEFAULT}
                            alt={recipe.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Recipe info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getDifficultyColor(recipe.difficulty)}`}>
                                        {recipe.difficulty}
                                    </span>
                                    <span className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {recipe.servings} servings
                                    </span>
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                    {recipe.name}
                                </h1>
                                
                                <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                                    {recipe.description}
                                </p>
                                
                                {/* Recipe stats */}
                                <div className="flex items-center gap-6 mt-6 text-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{recipe.cookTime} minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    
                    {/* Ingredients Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50 sticky top-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Ingredients
                                </h2>
                            </div>
                            
                            <div className="space-y-3">
                                {ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            <span className="font-semibold text-gray-900 dark:text-white">{ing.quantity} {ing.unit}</span> {ing.ingredientName}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Instructions
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                {instructions.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Comments ({comments.length})
                        </h2>
                    </div>

                    <form onSubmit={handleAddComment} className="mb-8">
                        <textarea
                            id="comment"
                            rows="4"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Share your thoughts about this recipe..."
                            className="w-full p-4 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            required
                        />
                        {user ? (
                            <button
                                type="submit"
                                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Post Comment
                                </div>
                            </button>
                        ) : (
                            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                                <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Please log in to leave a comment
                                </p>
                            </div>
                        )}
                    </form>

                    <div className="space-y-6">
                        {comments.length ? (
                            comments.map((comment, idx) => (
                                <Comment 
                                    key={comment.commentId || idx} 
                                    comment={comment} 
                                    onCommentDeleted={handleCommentDeleted}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No comments yet</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Recipe;
