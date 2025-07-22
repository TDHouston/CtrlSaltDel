package capstone.round_table.data;


import capstone.round_table.data.KnownGoodState;
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
    // 2 for finding
    // 3 for updating
    // 4 for updating
    // 5 for delete
    // 6 for delete
    // Add for rest

    @Test
    void shouldFindTopFavorites() {
        List<Recipe> actual = repository.findTopFavorites(3);
        actual.stream().forEach(r -> System.out.println(r.getName()));
        assertEquals(3, actual.size());
    }

    @Test
    void shouldFindFavoriteCountByRecipeId() {
        int actual = repository.findRecipeFavoriteCount(1);
        assertEquals(1, actual);
    }

    @Test
    void shouldFindUserFavorite() {
        List<Recipe> actual = repository.findUserFavorites(1);
        assertEquals(3, actual.size());
    }

    @Test
    void shouldAddFavorite() {
        assertTrue(repository.addFavorites(2,2));
    }

    @Test
    void shouldDeleteFavorite() {
        assertTrue(repository.deleteFavorites(5,4));
    }
}