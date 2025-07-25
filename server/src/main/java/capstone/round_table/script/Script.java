package capstone.round_table.script;

import capstone.round_table.data.RecipeElasticRepository;
import capstone.round_table.data.mappers.RecipeMapper;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/script")
public class Script {
    private final JdbcTemplate jdbcTemplate;
    private final RecipeElasticRepository recipeElasticRepository;

    public Script(JdbcTemplate jdbcTemplate, RecipeElasticRepository recipeElasticRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.recipeElasticRepository = recipeElasticRepository;
    }

    public List<Recipe> getAllRecipeFromSQL() {
        final String sql = "select r.recipe_id, r.user_id, r.name as recipe_name, r.difficulty, r.cook_time, r.servings, r.description, r.featured, r.image_url from recipe r;";
        return jdbcTemplate.query(sql, new RecipeMapper());
    }

    @GetMapping
    public String convert() {
        List<Recipe> result = getAllRecipeFromSQL();
        for (Recipe recipe : result) {
            RecipeDocument rd = convertToDocument(recipe);
            recipeElasticRepository.save(rd);
        }
        return "OK";
    }

    private RecipeDocument convertToDocument(Recipe recipe) {
        RecipeDocument document = new RecipeDocument();
        document.setRecipeId(recipe.getRecipeId());
        document.setUserId(recipe.getUserId());
        document.setName(recipe.getName());
        document.setDescription(recipe.getDescription());
        document.setCookTime(recipe.getCookTime());
        document.setDifficulty(recipe.getDifficulty());
        document.setImageUrl(recipe.getImageUrl());
        return document;
    }


}
