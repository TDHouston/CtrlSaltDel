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
        return categoryRepository.findAll();
    }

    public Category findById(int categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Result<Category> addCategory(Category category) {
        Result<Category> result = validate(category);

        if (!result.isSuccess()) {
            return result;
        }
        if (category.getCategoryId() != 0) {
            result.addError("Category Id cannot be set", ResultType.INVALID);
            return result;
        }

        Category res = categoryRepository.addCategory(category);
        result.setPayload(res);
        return result;
    }

    public Result<Category> updateCategory(Category category) {
        Result<Category> result = validate(category);

        if (!result.isSuccess()) {
            return result;
        }
        if (category.getCategoryId() == 0) {
            result.addError("Category Id must be set", ResultType.INVALID);
        }
        if (!categoryRepository.updateCategory(category)) {
            String msg = String.format("category: %s, not found", category.getCategoryId());
            result.addError(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteCategory(int categoryId) {
        return categoryRepository.deleteCategory(categoryId);
    }

    private Result<Category> validate(Category category) {
        Result<Category> result = new Result<>();

        if (category == null) {
            result.addError("Category cannot be null", ResultType.INVALID);
            return result;
        }

        if (category.getName().isBlank() || category.getName().isEmpty()) {
            result.addError("Category name is required", ResultType.MISSING_INFO);
        }
        return result;
    }

}
