import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";
import { API_ENDPOINTS } from "../config/api";


function Home() {
  const [communityRecipes, setCommunityRecipes] = useState([]);
  const [adminRecipes, setAdminRecipes] = useState([]);
  const [moderatorRecipes, setModeratorRecipes] = useState([]);

  useEffect(() => {
    const picks = JSON.parse(localStorage.getItem("moderatorPicks")) || [];

    fetch(API_ENDPOINTS.RECIPES.BASE)
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((r) => picks.includes(r.recipeId));
        setModeratorRecipes(featured);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(API_ENDPOINTS.RECIPES.BASE)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) =>
        data.sort((a, b) => b.favorited - a.favorited).slice(0, 5)
      )
      .then(setCommunityRecipes)
      .catch((err) => console.error("Community fetch error:", err));
  }, []);

  useEffect(() => {
    fetch(API_ENDPOINTS.RECIPES.BASE)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => data.filter((r) => r.featured === true).slice(0, 3))
      .then(setAdminRecipes)
      .catch((err) => console.error("Admin fetch error:", err));
  }, []);

  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      
      {/* Hero Section - Completely Redesigned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-pink-900/20" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                ✨ Welcome to Round Table
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Recipes
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our vibrant community of food lovers. Share your culinary creations, discover new flavors, and cook together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/explore"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Recipes
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                to="/recipe/add"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Share Your Recipe
              </Link>
            </div>
          </div>

          {/* Featured Carousel - Enhanced */}
          <div className="relative">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              🔥 Trending in the Community
            </h2>
            
            {communityRecipes.length > 0 ? (
              <Carousel
                autoplay
                loop
                className="rounded-3xl shadow-2xl overflow-hidden"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    {new Array(length).fill("").map((_, i) => (
                      <button
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/60"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    onClick={handlePrev}
                    className="!absolute top-1/2 left-6 -translate-y-1/2 z-50 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full p-3 border border-white/20"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    onClick={handleNext}
                    className="!absolute top-1/2 right-6 -translate-y-1/2 z-50 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full p-3 border border-white/20"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </IconButton>
                )}
              >
                {communityRecipes.map((recipe) => (
                  <div
                    key={recipe.recipeId || recipe.id}
                    className="relative w-full h-[500px] lg:h-[600px] overflow-hidden"
                  >
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-end p-8 lg:p-12">
                      <div className="w-full max-w-2xl text-white">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            ❤️ {recipe.favorited} favorites
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            ⏱️ {recipe.cookTime} min
                          </span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                          {recipe.name}
                        </h2>
                        
                        <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                          {recipe.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-gray-300">
                            by <span className="font-semibold text-white">{recipe.author}</span>
                          </p>
                          
                          <Link
                            to={`/recipe/${recipe.recipeId}`}
                            className="group px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                          >
                            View Recipe
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No featured recipes yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Check back soon for community favorites!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Recipes Shared</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Community Members</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Recipe Favorites</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10k+</h3>
              <p className="text-gray-600 dark:text-gray-400">Comments & Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Moderator Picks - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              ⭐ Moderator's Choice
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Handpicked Favorites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover exceptional recipes curated by our trusted community leaders
            </p>
          </div>

          {moderatorRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moderatorRecipes.map((recipe) => (
                <Link
                  to={`/recipe/${recipe.recipeId}`}
                  key={recipe.recipeId}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700/50"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                      recipe.difficulty === 'EASY' ? 'bg-green-100/90 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' :
                      recipe.difficulty === 'HARD' ? 'bg-red-100/90 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700' :
                      'bg-yellow-100/90 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
                    }`}>
                      {recipe.difficulty}
                    </div>

                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                      ⭐ Featured
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {recipe.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {recipe.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{recipe.cookTime}min</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="font-medium">{recipe.favorited}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        by <span className="font-medium text-gray-700 dark:text-gray-300">{recipe.author}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Featured Recipes Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Our moderators are curating the best recipes from our community. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section - New */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Join thousands of home cooks sharing their favorite recipes and discovering new culinary adventures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Join the Community
            </Link>
            
            <Link
              to="/explore"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
            >
              Start Exploring
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
