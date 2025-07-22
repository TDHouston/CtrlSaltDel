package capstone.round_table.data;

import capstone.round_table.data.comment.CommentJdbcRepository;
import capstone.round_table.data.favorite.FavoriteJdbcRepository;
import capstone.round_table.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FavoriteJdbcRepositoryTest {
    @Autowired
    FavoriteJdbcRepository repository;

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
    void shouldFindTopFavorites() {
        List<Recipe> actual = repository.findTopFavorites(1);
        assertEquals(1, actual.size());
        assertEquals("fish soup", actual.get(0).getName());
    }

    @Test
    void shouldFindFavoriteCountByRecipeId() {
        int actual = repository.findRecipeFavoriteCount(1);
        assertEquals(2, actual);
    }

    @Test
    void shouldFindUserFavorite() {
        List<Recipe> actual = repository.findUserFavorites(1);
        assertEquals(2, actual.size());
    }
}