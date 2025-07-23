// dummyData.js

export const users = [
  {
    user_id: 1,
    role: "user",
    first_name: "Julian",
    last_name: "Houston",
    username: "julianh",
    email: "julian@example.com",
    password: "hashedPassword1"
  },
  {
    user_id: 2,
    role: "admin",
    first_name: "Admin",
    last_name: "One",
    username: "admin1",
    email: "admin@example.com",
    password: "hashedPassword2"
  }
];

export const recipes = [
  {
    recipe_id: 1,
    user_id: 1,
    category_id: 1,
    name: "Crispy Chicken",
    difficulty: "Medium",
    cook_time: 30,
    servings: 4,
    description: "Delicious crispy chicken with a sweet chili dipping sauce!",
    upvotes: 100
  },
  {
    recipe_id: 2,
    user_id: 1,
    category_id: 2,
    name: "Tofu Stir-Fry",
    difficulty: "Hard",
    cook_time: 45,
    servings: 2,
    description: "Garlic tofu stir-fry with green beans and onions",
    upvotes: 200
  }
];

export const categories = [
  { category_id: 1, name: "Chicken" },
  { category_id: 2, name: "Vegetarian" },
  { category_id: 3, name: "Dessert" }
];

export const recipeCategories = [
  { recipe_id: 1, category_id: 1 },
  { recipe_id: 2, category_id: 2 }
];

export const ingredients = [
  { ingredient_id: 1, name: "Chicken Breast" },
  { ingredient_id: 2, name: "Soy Sauce" },
  { ingredient_id: 3, name: "Broccoli" },
  { ingredient_id: 4, name: "Flour" },
  { ingredient_id: 5, name: "Garlic" }
];

export const recipeIngredients = [
  { recipe_id: 1, ingredient_id: 1, unit: "g", quantity: 200 },
  { recipe_id: 1, ingredient_id: 4, unit: "g", quantity: 100 },
  { recipe_id: 2, ingredient_id: 2, unit: "tbsp", quantity: 2 },
  { recipe_id: 2, ingredient_id: 3, unit: "g", quantity: 150 },
  { recipe_id: 2, ingredient_id: 5, unit: "clove", quantity: 3 }
];

export const instructions = [
  { instruction_id: 1, recipe_id: 1, step_number: 1, description: "Season the chicken." },
  { instruction_id: 2, recipe_id: 1, step_number: 2, description: "Coat chicken with flour and fry until golden brown." },
  { instruction_id: 3, recipe_id: 2, step_number: 1, description: "Stir-fry tofu until golden." },
  { instruction_id: 4, recipe_id: 2, step_number: 2, description: "Add vegetables and sauce, cook until tender." }
];

export const favorites = [
  { user_id: 1, recipe_id: 2 },
  { user_id: 2, recipe_id: 1 }
];

export const comments = [
  { comment_id: 1, user_id: 1, recipe_id: 2, content: "This was amazing!" },
  { comment_id: 2, user_id: 2, recipe_id: 1, content: "Loved the crispiness." }
];
