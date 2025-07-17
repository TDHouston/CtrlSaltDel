# Proposal Outline

# Problem Statement

- Cooking and baking, despite being essential life skills, can be daunting for people who have never so much as touched a stove. Although there are blogs and general cooking sites, searching and filtering recipes tailored to an user’s specific needs - for instance, vegetarian, gluten-free, low-sugar, beginner-friendly, etc. - can be complex for first-time users.
- Furthermore, home cooks looking to share family recipes with the world don’t have great options. Many sites require manual recipe approval and setting up a personal cooking or baking blog for sharing recipes requires a lot of effort, especially if internet traffic is a concern.
- By creating an application where users can submit recipes and vote on recipes, administrators can feature recipes, and recipes can be tagged and filtered by a variety of relevant categories, home cooks and bakers will find an user-friendly platform on which to share their recipes, and those looking to make their first forays into the culinary world will find themselves with an easily-navigable interface to find the recipes of their dreams!

# Technical Solution

## Overview:

- We will build a web application that allows users to create, edit, and delete recipes, view others’ recipes and comment on them, search for recipes/ingredients, and upvote other recipes. Administrators will be able to create, edit, and delete categories, choose recipes to feature on the home page, and delete users and recipes to promote a safe environment.

## Key features:

- Users can create accounts; create and share recipes; edit and delete their recipes; search for recipes by criteria like “chicken” or “beginner-friendly soup”; upvote and comment on others’ recipes
- Administrators can create, edit, and delete categories; choose recipes to be featured on the home page; view all user information; ban users and delete recipes

## User Scenarios:

- Emma has always wanted to get into baking, but is celiac and has very particular tastes. Finding recipes for sweets that cater to her dietary needs and preferences can be a huge headache. She uses the website to find recipes that fit her exact wants and needs.
- Evan recently discovered his love of cooking and wants somewhere he can share his recipes and get feedback on them. He doesn’t want to have to submit his recipe for reviewal to have it posted, and he doesn’t have enough time to set up and maintain a blog. He uploads his recipe on the website and receives comments and upvotes on his recipe, which helps him refine his cooking skills.

## Tech Stack:

- Frontend: React, TailwindCSS
- Backend: Spring Boot
- Database: MySQL
- Authentication: JWT

# Glossary

- **Administrator:** Someone who is in charge of moderating content on the site. They have privileges related to content moderation.
- **User:** Someone who has an account on the site. They can upload recipes, edit and delete recipes they have created, and favorite recipes. They can also comment on and upvote others’ recipes.
- **Viewer:** Anyone who browses to the site. Isn’t necessarily a user.
- **Recipe:** A distinct instruction + ingredient list for preparing a specific dish. Recipes belong to users.

# High-Level Requirements

- Manage 4-7 database tables
  - We plan to have tables for recipes, users, and tables representing specific features of recipes such as ingredients and upvotes
- MySQL for data management
  - We plan to use MySQL as our relational database system. We will design and normalize our schema for efficiency and scalability.
- Spring Boot, MVC, JDBC, Testing, React
  - We will use Spring Boot to implement the backend following the MVC pattern. We will use JDBC for database connections and transaction and write full test suites for the data and domain layers. We will build the frontend using React as our framework for functionality and responsiveness.
- HTML, CSS, React UI
  - We will create the UI with React, and use HTML and CSS to make our site clean, responsive, intuitive, and accessible.
- Sensible Layering and pattern choices
  - We will follow best practices for application architecture, utilizing layered design patterns. This includes separating the logic into distinct layers such as controller, service, and repository. I will ensure that the backend follows the Single Responsibility Principle and that the code is easy to maintain and scale.
- Full test suite for data and domain layers
  - I will implement a comprehensive test suite for the project. This will include unit tests for the domain layer (services and models) and the data layer (repositories and database interactions). I will also write integration tests to ensure that the application components work together as expected.
- At least 2 roles
  - We will implement role-based access using Spring Security, and create 2 roles: users and admins. Users can upload recipes, edit and delete their own recipes, and comment on and upvote others’ recipes. Administrators can moderate content such as categories, featured recipes, and users.

# User Stories

- Goal: As a user, I want to be able to upload recipes.
- Plan: We will design a form where an user can upload a recipe, including information like ingredients, steps, and categories.
- Precondition: User must be logged in with USER or ADMIN role.
- Postcondition: Recipe will be added, but admin can delete recipe at will.

- Goal: As a user, I want to be able to comment on others’ recipes.
- Plan: We will create a form on recipe pages that allows users to add comments.
- Precondition: User must be logged in with USER or ADMIN role.
- Postcondition: Comment will be added, but admin can delete comment.

- Goal: As a user, I want to be able to upvote recipes I enjoy.
- Plan: We will create a feature that allows users to upvote recipes, which will be stored and displayed.
- Precondition: User must be logged in with USER or ADMIN role.
- Postcondition: Upvote is stored and recipe displays new upvote total.

- Goal: As a user, I want to be able to favorite recipes to view later.
- Plan: We will create a feature that allows users to easily add recipes they enjoy to their favorites list, which will be displayed on their profile page.
- Precondition: User must be logged in with USER or ADMIN role.
- Postcondition: None

- Goal: As a user, I want to be able to edit my recipes.
- Plan: We will add a feature to allow users to edit recipes they have posted, and make it easily accessible.
- Precondition: User must be logged in with USER or ADMIN role and have posted at least one recipe.
- Postcondition:

- Goal: As a user, I want to be able to delete a recipe I no longer wish to share.
- Plan: We will add a feature to allow users to delete recipes they have posted, and make it easily accessible.
- Precondition: User must be logged in with USER or ADMIN role and have posted at least one recipe.
- Postcondition: None

- Goal: As a viewer, I want to be able to search for recipes easily and according to my specific dietary preferences.
- Plan: We will implement elastic search and add a search bar to the navigation bar.
- Precondition: None
- Postcondition: None

- Goal: As an administrator, I want to be able to pick recipes to be featured on the front page.
- Plan: We will implement a feature that only administrators can toggle whether recipes are featured or not, and configure the front page to display featured recipes.
- Precondition: Administrator must be logged in as ADMINISTRATOR.
- Postcondition: None

- Goal: As an administrator, I want to be able to moderate categories on the site.
- Plan: We will implement a feature where administrators can upload, edit, and deleting existing categories.
- Precondition: Administrator must be logged in as ADMINISTRATOR.
- Postcondition: None

- Goal: As an administrator, I want to be able to delete comments if needed.
- Plan: We will give administrators the capability to remove comments.
- Precondition: Administrator must be logged in as ADMINISTRATOR.
- Postcondition: None

- Goal: As an administrator, I want to be able to remove users from the site.
- Plan: We will give users the ability to delete user accounts.
- Precondition: Administrator must be logged in as ADMINISTRATOR.
- Postcondition: None

# Learning Goals

- We want to learn how to host a site with a database on AWS.

  - We will host the site using AWS so it’ll be accessible to anyone on the internet.
  - We’ll start with official documentation like https://aws.amazon.com/free/webapps/ and branch out to tutorials if needed.
  - We anticipate struggling to ensure our frontend and backend are both running and connected. There is lots of documentation and there are lots of resources to help us if we get stuck.
  - If we can access the site online from our browser we’ve succeeded!

- We want to learn how to implement elastic search into an application.
  - We want users to have the ability to search for recipes by ingredient, dietary preference, or any other criteria they want.
  - We’ll start with the Elastic Search API and reference tutorials as needed, such as: https://medium.com/@abhishekranjandev/step-by-step-guide-to-using-elasticsearch-in-a-spring-boot-application-477ba7773dea
  - We anticipate struggling to dynamically load search results. We plan to use dummy data to test and figure this out.
  - If we can search for recipes by criteria and get meaningful results we will consider this goal achieved.

# Class Diagram

# Class List

## React Components

### Pages:

- Home
  - Displays top-voted recipes + admin-featured recipes
- Login/Signup
- User page
  - Has options for users to view favorite recipes, view their posted recipes, view user info
  - Admin can access admin abilities to view/edit/add/delete categories and view user info
- Explore page (to store list of all recipes + where search results appear)
- Detailed recipe page
  - Includes all information about a single recipe, plus comments + box to add comment
  - Includes button for users to add to favorites list
  - Includes button for admins to add to featured recipe page
- Create/edit recipe page
  - If editing: pre-fills information with existing recipe details
- About Us page
- 404 page

### Components:

- Recipe card
  - Small, neat recipe “blurb” - Includes title, recipe author, categories
  - Clicking on recipe card leads to detailed recipe page
  - What appears on home page/in search results when recipe needs to be displayed in smaller form
- Navigation bar
  - Not logged in: Home page, login/signup, search bar
  - Logged in: Home page, user page, explore page, search bar
- Comment
  - Includes comment author + comment contents; to display beneath recipe info on detailed recipe page
- Footer

# Tasks
