package capstone.round_table.data.category;

import capstone.round_table.models.Category;

import java.util.List;

public interface CategoryRepository {
    List<Category> findAll();

    Category findById(int categoryId);

    Category addCategory(Category category);

    boolean updateCategory(Category category);

    boolean deleteCategory(int categoryId);
}
