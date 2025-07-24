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
    `name` VARCHAR(150) NOT NULL,
    difficulty VARCHAR(15),
    cook_time INT,
    servings INT,
    `description` VARCHAR(200),
    featured bit default false,
    image_url VARCHAR(500),
	thumbnail_url VARCHAR(500),
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

delimiter //
create procedure set_known_good_state()
begin

	-- Delete because it's a foreign key for recipe 
	DELETE FROM favorite;
    DELETE FROM instruction;
    ALTER TABLE instruction auto_increment = 1;
    DELETE FROM `comment`;
    ALTER TABLE `comment` auto_increment = 1;
    DELETE FROM recipe_ingredient;
    ALTER TABLE recipe_ingredient auto_increment = 1;
    DELETE FROM ingredient;
    ALTER TABLE ingredient auto_increment = 1;
    DELETE FROM recipe_category;
    ALTER TABLE recipe_category auto_increment = 1;
    DELETE FROM category;
    ALTER TABLE category auto_increment = 1;
	DELETE FROM recipe;
    ALTER TABLE recipe auto_increment = 1;
	DELETE FROM `user`;
    ALTER TABLE `user` auto_increment = 1;

	INSERT INTO user (user_id, `role`, first_name, last_name, username, email, `password`) VALUES
		-- USE FOR FIND
        (1, 'ADMIN', 'John', 'Smith', 'jsmith', 'jsmith@example.com', 'smith'),
		(2, 'USER', 'Bob', 'Burn', 'bburn', 'bburn@example.com', 'burn'),
        -- USE FOR UPDATE
		(3, 'ADMIN', 'Charlie', 'Brown', 'cbrown', 'cbrown@example.com', 'brown'),
        (4, 'USER', 'Mary', 'Sue', 'msue', 'msue@example.com', 'sue'),
        -- USE FOR DELETE
		(5, 'ADMIN', 'Grey', 'Johnson', 'gjohnson', 'gjohnson@example.com', 'johnson'),
		(6, 'USER', 'David', 'Dash', 'ddash', 'ddash@example.com', 'dash');
        
    INSERT INTO category (category_id, `name`) VALUES
		-- USE FOR FIND
		(1, "vegan"),
        (2, "vegetarian"),
        -- USE FOR UPDATE
        (3, "keto"),
        (4, "paleo"),
        -- USE FOR DELETE
        (5, "low carb"),
        (6, "raw");
        
	
	INSERT INTO recipe (recipe_id, user_id, `name`, difficulty, cook_time, servings, `description`) VALUES
		-- USE FOR FIND
		(1, 1, "fish soup", "easy", 30, 5, "fish in soup"),
        (2, 2, "scramble eggs", "easy", 10, 2, "Very difficult egg"),
        -- USE FOR UPDATE
        (3, 3, "grill cheese", "intermediate", 5, 1, "easy grill cheese"),
        (4, 4, "sandwhich", "intermediate", 10, 2, "mediocre sandwhich"),
        -- USE FOR DELETE
        (5, 5, "pizza", "advanced", 10, 2, "Very difficult egg"),
        (6, 6, "ice cream", "advanced", 10, 2, "Very difficult egg"),
        -- EXTRA
        (7, 1, "burger", "expert", 10, 2, "Very difficult egg"),
        (8, 2, "tacos", "expert", 5, 1, "easy grill cheese"),
        (9, 1, "nuggets", "easy", 10, 2, "Very difficult egg"),
        (10, 2, "burrito", "expert", 10, 2, "Very difficult egg");
        
	INSERT INTO favorite (user_id, recipe_id) VALUES
		-- USE FOR FIND
		(1, 2),
        (2, 1),
        -- USE FOR UPDATE
        (3, 4),
        (4, 3),
        -- USE FOR DELETE
        (4, 5),
        (5, 4),
        -- EXTRA
        (1, 10),
        (2, 8),
        (1, 9);
        
	  INSERT INTO `comment` (comment_id, user_id, recipe_id, content) VALUES
		-- USE FOR FIND
		(1, 2, 1, "This was hard!"),
        (2, 1, 2, "This was easy!"),
        -- USE FOR UPDATE
        (3, 3, 4, "This was very difficult!"),	
        (4, 4, 3, "This was ok!"),
        -- USE FOR DELETE
        (5, 5, 6, "This taste bad!"),
        (6, 6, 5, "This taste good!"),	
        -- EXTRA
        (7, 1, 8, "Im lost!"),
        (8, 2, 9, "I forgot the ingredients!"),
        (9, 1, 10, "Made it with my eyes closed!"),
        (10, 2, 10, "I ate it!");
	
	INSERT INTO ingredient (ingredient_id, `name`) VALUES
		-- USE FOR FIND
		(1, "egg"),
        (2, "flour"),
        -- USE FOR UPDATE
        (3, "sugar"),
        (4, "salt"),
        -- USE FOR DELETE
        (5, "white bread"),
        (6, "cheese"),
        -- EXTRA
        (7, "salmon"),
        (8, "butter");

	
    INSERT INTO recipe_category(recipe_id, category_id) VALUES
		-- USE FOR FIND
        (1,1),
        (1,2),
        (2,1),
        -- USE FOR UPDATE
        (3,4),
        (4,3),
        -- USE FOR DELETE
        (5,6),
        (6,5);
	
	INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit, quantity) VALUES
		-- USE FOR FIND
		(1, 2, NULL, 3),
        (2, 1, "tbsp", 1),
        -- USE FOR UPDATE
        (3, 3, NULL, 1),
        (4, 4, "slice", 2),
        -- USE FOR DELETE
        (5, 5, "slice", 2),
        (6, 6, "tbsp", 1),
        -- EXTRA
        (1, 7, NULL, 3),
        (2, 8, "lb", 1);
	
    INSERT INTO instruction (instruction_id, recipe_id, step_number, `description`) VALUES
		-- USE FOR FIND
		(1, 1, 1, "Add Water"),
        (2, 2, 1, "Add Soup"),
        -- USE FOR UPDATE
        (3, 3, 1, "Add chicken"),
        (4, 4, 1, "Add beef"),
        -- USE FOR DELETE
        (5, 5, 1, "Add pepper"),
        (6, 6, 1, "Add salt"),
        -- EXTRA
        (7, 1, 2, "Add cucumber"),
        (8, 2, 1, "Add lettuce");
end //
delimiter ;
