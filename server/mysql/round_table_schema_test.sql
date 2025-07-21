DROP DATABASE IF EXISTS round_table_test;
CREATE DATABASE round_table_test;
USE round_table_test;


-- USER TABLE
CREATE TABLE `user` (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    `role` VARCHAR(10) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    -- Unique Constraint
    CONSTRAINT uc_user UNIQUE (username, email)
);

-- CATEGORY TABLE
CREATE TABLE category (
	category_id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    -- Unique Constraint
    UNIQUE(`name`)
);

-- INGREDIENT TABLE
CREATE TABLE ingredient (
	ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    -- Unique Constraint
    UNIQUE(`name`)
);

-- RECIPE TABLE
CREATE TABLE recipe (
	recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    difficulty VARCHAR(10),
    cook_time INT,
    servings INT,
    `description` VARCHAR(200),
    upvotes INT,
    -- Foreign Keys
    CONSTRAINT fk_user
		FOREIGN KEY (user_id)
        REFERENCES `user`(user_id),
	CONSTRAINT fk_category
		FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

-- FAVORITE TABLE
CREATE TABLE favorite (
	user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    -- Foreign Keys
	CONSTRAINT fk_fave_user
		FOREIGN KEY (user_id)
        REFERENCES `user`(user_id),
	CONSTRAINT fk_fave_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id)
);

-- COMMENT TABLE
CREATE TABLE `comment` (
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    -- Foreign Keys
	CONSTRAINT fk_comment_user
		FOREIGN KEY (user_id)
        REFERENCES `user`(user_id),
	CONSTRAINT fk_comment_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id)
);

-- INSTRUCTION TABLE
CREATE TABLE instruction (
	instruction_id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    step_number INT NOT NULL,
    `description` VARCHAR(250),
    -- Foreign Key
    CONSTRAINT fk_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id)
);

-- RECIPE_CATEGORY TABLE
CREATE TABLE recipe_category (
	recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    -- Foreign Keys
    CONSTRAINT fk_rc_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id),
	CONSTRAINT fk_rc_category
		FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

-- RECIPE_INGREDIENT TABLE
CREATE TABLE recipe_ingredient (
	recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    unit VARCHAR(15) NOT NULL,
    quantity DECIMAL(3, 2),
    -- Foreign Keys
	CONSTRAINT fk_ri_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id),
	CONSTRAINT fk_ingredient
		FOREIGN KEY (ingredient_id)
        REFERENCES ingredient(ingredient_id)
);

