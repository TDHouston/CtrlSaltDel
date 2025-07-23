package capstone.round_table.domain;

import capstone.round_table.data.comment.CommentRepository;
import capstone.round_table.models.Comment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CommentServiceTest {

    @Autowired
    CommentService service;

    @MockBean
    CommentRepository repository;


    @Test
    void shouldFindAll() {
        when(repository.findAll()).thenReturn(generateComments());
        List<Comment> comments = service.findAll();
        assertEquals(3, comments.size());
    }

    @Test
    void shouldFindCommentsByUserId() {
        List<Comment> userComment = generateComments().stream().filter(comment -> comment.getUserId() == 1).toList();
        when(repository.findByUserId(1)).thenReturn(userComment);
        List<Comment> comments = service.findByUserId(1);
        assertEquals(2, comments.size());
    }

    @Test
    void shouldFindCommentsByRecipeId() {
        List<Comment> recipeComment = generateComments().stream().filter(comment -> comment.getRecipeId() == 1).toList();
        when(repository.findByRecipeId(1)).thenReturn(recipeComment);
        List<Comment> comments = service.findByRecipeId(1);
        assertEquals(2, comments.size());
    }

    @Test
    void shouldAddComment() {
        Comment comment = generateComment();
        comment.setCommentId(0);
        when(repository.addComment(comment)).thenReturn(comment);
        Result<Comment> actual = service.addComment(comment);
        assertTrue(actual.isSuccess());
    }

    @Test
    void shouldNotAddNullComment() {
        Result<Comment> actual = service.addComment(null);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotAddSetIdComment() {
        Comment comment = generateComment();
        when(repository.addComment(comment)).thenReturn(comment);
        Result<Comment> actual = service.addComment(comment);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotAddUserIdNotSetComment() {
        Comment comment = generateComment();
        comment.setUserId(0);
        when(repository.addComment(comment)).thenReturn(comment);
        Result<Comment> actual = service.addComment(comment);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotAddRecipeIdNotSetComment() {
        Comment comment = generateComment();
        comment.setRecipeId(0);
        when(repository.addComment(comment)).thenReturn(comment);
        Result<Comment> actual = service.addComment(comment);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotAddEmptyComment() {
        Comment comment = generateComment();
        comment.setContent("");
        when(repository.addComment(comment)).thenReturn(comment);
        Result<Comment> actual = service.addComment(comment);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldUpdate() {
        Comment comment = generateComment();
        comment.setContent("updated");
        when(repository.updateComment(comment)).thenReturn(true);
        Result<Comment> actual = service.updateComment(comment);
        assertTrue(actual.isSuccess());
    }

    @Test
    void shouldNotUpdate() {
        Comment comment = generateComment();
        comment.setCommentId(0);
        Result<Comment> actual = service.updateComment(comment);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteComment(3)).thenReturn(true);
        assertTrue(service.deleteComment(3));
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteComment(13)).thenReturn(false);
        assertFalse(service.deleteComment(13));
    }

    private List<Comment> generateComments() {
        Comment comment1 = new Comment();
        comment1.setCommentId(1);
        comment1.setUserId(1);
        comment1.setContent("Great Dish");
        comment1.setRecipeId(1);

        Comment comment2 = new Comment();
        comment2.setCommentId(2);
        comment2.setUserId(1);
        comment2.setContent("Ok Dish");
        comment2.setRecipeId(2);

        Comment comment3 = new Comment();
        comment3.setCommentId(3);
        comment3.setUserId(2);
        comment3.setContent("Nice");
        comment3.setRecipeId(1);

        return List.of(comment1, comment2, comment3);
    }

    private Comment generateComment() {
        Comment comment = new Comment();
        comment.setCommentId(4);
        comment.setUserId(1);
        comment.setContent("Terrific Dish");
        comment.setRecipeId(4);

        return comment;
    }


}
