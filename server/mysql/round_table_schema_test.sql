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
    -- Unique Constraintcategory_id
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
    difficulty VARCHAR(10),
    upvote INT,
    cook_time INT,
    servings INT,
    `description` VARCHAR(200),
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

delimiter //
create procedure set_known_good_state()
begin
	
    DELETE FROM favorite;
    DELETE FROM category;
    alter table category auto_increment = 1;
    DELETE FROM comment;
    alter table comment auto_increment = 1;
	DELETE FROM recipe;
    alter table recipe auto_increment = 1;
	DELETE FROM user;
    alter table user auto_increment = 1;

	INSERT INTO user (user_id, role, first_name, last_name, username, email, password) VALUES
		(1, 'ADMIN', 'Alice', 'Smith', 'alice', 'alice@example.com', 'hashed_password_1'),
		(2, 'USER', 'Bob', 'Johnson', 'bobbyj', 'bob@example.com', 'hashed_password_2'),
		(3, 'USER', 'Charlie', 'Brown', 'charlieb', 'charlie@example.com', 'hashed_password_3');
	
    INSERT INTO category (category_id, name) VALUES
		(1, "fish"),
        (2, "tomatoes"),
        (3, "eggs"),
        (4, "cheese");
        
	INSERT INTO recipe (recipe_id, user_id, name, difficulty, cook_time, servings, description) VALUES
		(1, 1, "fish soup", "medium", 30, 5, "fish in soup"),
        (2, 1, "scramble eggs", "hard", 10, 2, "Very difficult egg"),
        (3, 3, "grill cheese", "easy", 5, 1, "easy grill cheese");
	
    INSERT INTO comment (comment_id, user_id, recipe_id, content) VALUES
		(1, 1, 1, "This was easy!"),
        (2, 2, 1, "This was hard!"),
        (3, 1, 2, "This was very difficult!");
        
	INSERT INTO favorite (user_id, recipe_id) VALUES
		(1, 1),
        (1, 2),
        (2, 1),
        (2, 2);
        

end //
delimiter ;
