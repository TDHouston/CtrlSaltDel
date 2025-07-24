DROP DATABASE IF EXISTS round_table;
CREATE DATABASE round_table;
USE round_table;

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
    `name` VARCHAR(150) NOT NULL,
    difficulty VARCHAR(15),
    cook_time INT,
    servings INT,
    `description` VARCHAR(200),
    featured bit default false,
	image_url VARCHAR(500),
    -- Foreign Keys
    CONSTRAINT fk_user
		FOREIGN KEY (user_id)
        REFERENCES `user`(user_id)
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
    content VARCHAR(255) NOT NULL,
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
    unit VARCHAR(15),
    quantity DECIMAL(3, 2),
    -- Foreign Keys
	CONSTRAINT fk_ri_recipe
		FOREIGN KEY (recipe_id)
        REFERENCES recipe(recipe_id),
	CONSTRAINT fk_ingredient
		FOREIGN KEY (ingredient_id)
        REFERENCES ingredient(ingredient_id),
	UNIQUE(recipe_id, ingredient_id)
);

-- ADD DATA TO USER TABLE
INSERT INTO user (user_id, `role`, first_name, last_name, username, email, `password`) VALUES
	(1, 'ADMIN', 'John', 'Smith', 'jsmith', 'jsmith@example.com', 'smith'),
	(2, 'USER', 'Bob', 'Burn', 'bburn', 'bburn@example.com', 'burn'),
	(3, 'ADMIN', 'Charlie', 'Brown', 'cbrown', 'cbrown@example.com', 'brown'),
	(4, 'USER', 'Mary', 'Sue', 'msue', 'msue@example.com', 'sue'),
	(5, 'ADMIN', 'Grey', 'Johnson', 'gjohnson', 'gjohnson@example.com', 'johnson'),
	(6, 'USER', 'David', 'Dash', 'ddash', 'ddash@example.com', 'dash');
	
-- ADD DATA TO CATEGORY TABLE
INSERT INTO category (category_id, `name`) VALUES
	(1, "vegan"),
	(2, "vegetarian"),
	(3, "keto"),
	(4, "paleo"),
	(5, "low carb"),
	(6, "raw");
	
-- ADD DATA TO RECIPE TABLE
INSERT INTO recipe (recipe_id, user_id, `name`, difficulty, cook_time, servings, `description`, featured) VALUES
	(1, 1, "fish soup", "easy", 30, 5, "fish in soup", true),
	(2, 2, "scramble eggs", "easy", 10, 2, "Very difficult egg", false),
	(3, 3, "grill cheese", "intermediate", 5, 1, "easy grill cheese",false),
	(4, 4, "sandwhich", "intermediate", 10, 2, "mediocre sandwhich",false),
	(5, 5, "pizza", "advanced", 10, 2, "Very difficult egg",true),
	(6, 6, "ice cream", "advanced", 10, 2, "Very difficult egg",false),
	(7, 1, "burger", "expert", 10, 2, "Very difficult egg",false),
	(8, 2, "tacos", "expert", 5, 1, "easy grill cheese",false),
	(9, 1, "nuggets", "easy", 10, 2, "Very difficult egg",true),
	(10, 2, "burrito", "expert", 10, 2, "Very difficult egg",false);

-- ADD DATA TO FAVORITE TABLE
INSERT INTO favorite (user_id, recipe_id) VALUES
	(1, 2),
	(2, 1),
	(3, 4),
	(4, 3),
	(4, 5),
	(5, 4),
	(1, 10),
	(2, 8),
	(1, 9);

-- ADD DATA TO COMMENT TABLE
  INSERT INTO `comment` (comment_id, user_id, recipe_id, content) VALUES
	(1, 2, 1, "This was hard!"),
	(2, 1, 2, "This was easy!"),
	(3, 3, 4, "This was very difficult!"),	
	(4, 4, 3, "This was ok!"),
	(5, 5, 6, "This taste bad!"),
	(6, 6, 5, "This taste good!"),	
	(7, 1, 8, "Im lost!"),
	(8, 2, 9, "I forgot the ingredients!"),
	(9, 1, 10, "Made it with my eyes closed!"),
	(10, 2, 10, "I ate it!");

-- ADD DATA TO INGREDIENT TABLE
INSERT INTO ingredient (ingredient_id, `name`) VALUES
	(1, "egg"),
	(2, "flour"),
	(3, "sugar"),
	(4, "salt"),
	(5, "white bread"),
	(6, "cheese"),
	(7, "salmon"),
	(8, "butter");

-- ADD DATA TO RECIPE_CATEGORY TABLE
INSERT INTO recipe_category(recipe_id, category_id) VALUES
	(1,1),
	(1,2),
	(2,1),
	(3,4),
	(4,3),
	(5,6),
	(6,5);

-- ADD DATA TO RECIPE_INGREDIENT TABLE
INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit, quantity) VALUES
	(1, 2, NULL, 3),
	(2, 1, "tbsp", 1),
	(3, 3, NULL, 1),
	(4, 4, "slice", 2),
	(5, 5, "slice", 2),
	(6, 6, "tbsp", 1),
	(1, 7, NULL, 3),
	(2, 8, "lb", 1);

-- ADD DATA TO INSTRUCTION TABLE
INSERT INTO instruction (instruction_id, recipe_id, step_number, `description`) VALUES
	(1, 1, 1, "Add Water"),
	(2, 2, 1, "Add Soup"),
	(3, 3, 1, "Add chicken"),
	(4, 4, 1, "Add beef"),
	(5, 5, 1, "Add pepper"),
	(6, 6, 1, "Add salt"),
	(7, 1, 2, "Add cucumber"),
	(8, 2, 1, "Add lettuce");
