package capstone.round_table.data;

import capstone.round_table.data.comment.CommentJdbcRepository;
import capstone.round_table.models.Comment;
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
    // 2 for finding
    // 3 for updating
    // 4 for updating
    // 5 for delete
    // 6 for delete
    // Add for rest

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
        assertEquals(3, actual.size());
    }

    @Test
    void shouldFindByRecipeId() {
        List<Comment> actual = repository.findByUserId(1);
        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertEquals(3, actual.size());
    }

    @Test
    void shouldAddComment() {
        Comment comment = new Comment();
        comment.setUserId(1);
        comment.setRecipeId(1);
        comment.setContent("More comments!");
        Comment actual = repository.addComment(comment);
        assertEquals(11, actual.getCommentId());
    }

    @Test
    void shouldUpdateComment() {
        Comment comment = new Comment();
        comment.setUserId(3);
        comment.setRecipeId(4);
        comment.setCommentId(3);
        comment.setContent("Updated comment!");
        assertTrue(repository.updateComment(comment));
    }

    @Test
    void shouldDeleteComment() {
        assertTrue(repository.deleteComment(5));
    }

}