package capstone.round_table.data;

import capstone.round_table.models.Category;
import capstone.round_table.repository.category.CategoryJdbcRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class CategoryJdbcRepositoryTest {

    @Autowired
    CategoryJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    // 1 for finding
    // 2 for updating
    // 3 for delete
    // 4 for add

    @Test
    void shouldFindAllCategory() {
        List<Category> actual = repository.findAll();
        assertTrue(actual.size() >= 4);
    }

    @Test
    void shouldFindByCategoryId() {
        Category actual = repository.findById(1);
        assertEquals("fish", actual.getName());
    }

}
