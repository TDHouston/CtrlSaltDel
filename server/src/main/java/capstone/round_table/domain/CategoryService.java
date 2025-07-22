package capstone.round_table.domain;

import capstone.round_table.data.category.CategoryRepository;
import capstone.round_table.models.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return List.of();
    }

    public Category findById(int categoryId) {
        return null;
    }

    public Result<Category> addCategory(Category category) {
        return null;
    }

    public Result<Category> updateCategory(Category category) {
        return null;
    }

    public Result<Category> deleteCategory(int categoryID) {
        return null;
    }

    private Result<Category> validate(Category category) {
        return null;
    }

}
