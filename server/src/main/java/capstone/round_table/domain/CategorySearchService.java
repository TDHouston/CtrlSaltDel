package capstone.round_table.domain;

import capstone.round_table.data.CategoryElasticRepository;
import capstone.round_table.models.Category;
import capstone.round_table.models.CategoryDocument;
import capstone.round_table.models.Recipe;
import capstone.round_table.models.RecipeDocument;
import org.springframework.stereotype.Service;

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

    public void update() {

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
