package capstone.round_table.data;

import capstone.round_table.models.Comment;
import capstone.round_table.repository.comment.CommentJdbcRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CommentJdbcRepositoryTest {

    @Autowired
    CommentJdbcRepository repository;

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
    void shouldFindAll() {
        List<Comment> actual = repository.findAll();
        assertTrue(actual.size() >= 3);
    }

    @Test
    void shouldFindByUserId() {
        List<Comment> actual = repository.findByUserId(1);
        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertEquals("This was easy!", actual.get(0).getContent());
    }

    @Test
    void shouldFindByRecipeId() {
        List<Comment> actual = repository.findByUserId(1);
        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertEquals("This was easy!", actual.get(0).getContent());
    }

}