package capstone.round_table.domain;

import capstone.round_table.data.CategoryElasticRepository;
import capstone.round_table.models.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategorySearchService {
    private final CategoryElasticRepository categoryElasticRepository;

    public CategorySearchService(CategoryElasticRepository categoryElasticRepository) {
        this.categoryElasticRepository = categoryElasticRepository;
    }

    public CategoryDocument add(Category category) {
        CategoryDocument document = convertToDocument(category);
        return categoryElasticRepository.save(document);
    }



    public List<String> convertToCDList(List<RecipeCategory> recipeCategories) {
        List<String> result = new ArrayList<>();
        for (RecipeCategory recipeCategory : recipeCategories) {
            int categoryId = recipeCategory.getCategoryId();
            CategoryDocument document = findById(categoryId);
            result.add(document.getName());
        }
        return result;
    }

    public CategoryDocument findById(int categoryId) {
        return categoryElasticRepository.findById(categoryId).orElse(null);
    }

    public List<CategoryDocument> findByName(String name) {
        return categoryElasticRepository.findByNameContaining(name);
    }

    private CategoryDocument convertToDocument(Category category) {
        CategoryDocument document = new CategoryDocument();
        document.setCategoryId(category.getCategoryId());
        document.setName(category.getName());
        return document;
    }

}
