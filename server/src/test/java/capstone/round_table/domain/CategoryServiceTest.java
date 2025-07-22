package capstone.round_table.domain;

import capstone.round_table.data.category.CategoryRepository;
import capstone.round_table.models.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class CategoryServiceTest {

    @Autowired
    CategoryService service;

    @MockBean
    CategoryRepository repository;

    @Test
    void shouldFindAll() {
        when(repository.findAll()).thenReturn(generateCategories());
        List<Category> categoryList = service.findAll();
        assertEquals(2, categoryList.size());
    }

    @Test
    void shouldFindById() {
        when(repository.findById(3)).thenReturn(generateCategory());
        Category category = service.findById(3);
        assertEquals(3, category.getCategoryId());
    }

    @Test
    void shouldNotFindById() {
        when(repository.findById(3)).thenReturn(null);
        Category category = service.findById(13);
        assertNull(category);
    }

    @Test
    void shouldAdd() {
        Category category = generateCategory();
        category.setCategoryId(0);
        when(repository.addCategory(category)).thenReturn(category);
        Result<Category> result = service.addCategory(category);
        assertTrue(result.isSuccess());

    }

    @Test
    void shouldNotAddNullCategory() {
        Result<Category> result = service.addCategory(null);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddSetCategoryId() {
        Category category = generateCategory();
        when(repository.addCategory(category)).thenReturn(category);
        Result<Category> result = service.addCategory(category);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddNoNameCategory() {
        Category category = generateCategory();
        category.setCategoryId(0);
        category.setName("");
        Result<Category> result = service.addCategory(category);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldUpdateCategory() {
        Category category = generateCategory();
        category.setName("updated category");
        when(repository.updateCategory(category)).thenReturn(true);
        Result<Category> result = service.updateCategory(category);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateCategory() {
        Category category = generateCategory();
        category.setCategoryId(0);
        Result<Category> result = service.updateCategory(category);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteCategory(3)).thenReturn(true);
        assertTrue(service.deleteCategory(3));
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteCategory(13)).thenReturn(false);
        assertFalse(service.deleteCategory(13));
    }

    private List<Category> generateCategories() {
        Category category1 = new Category();
        category1.setCategoryId(1);
        category1.setName("Vegan");
        Category category2 = new Category();
        category2.setCategoryId(2);
        category2.setName("Raw");

        return List.of(category1, category2);
    }

    private Category generateCategory() {
        Category category = new Category();
        category.setCategoryId(3);
        category.setName("Keto");
        return category;
    }
}
