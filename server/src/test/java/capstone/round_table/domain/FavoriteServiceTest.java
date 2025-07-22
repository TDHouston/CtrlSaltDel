package capstone.round_table.domain;

import capstone.round_table.data.favorite.FavoriteRepository;
import capstone.round_table.models.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class FavoriteServiceTest {
    @Autowired
    FavoriteService service;

    @MockBean
    FavoriteRepository repository;

    @Test
    void shouldFindTopFavorites() {
        when(repository.findTopFavorites(3)).thenReturn(generateRecipes());
        List<Recipe> actual = service.findTopFavorites(3);
        assertEquals(3, actual.size());
    }

    @Test
    void shouldFindUserFavorite() {
        when(repository.findUserFavorites(3)).thenReturn(generateRecipes().stream().filter(recipe -> recipe.getUserId() == 1).toList());
        List<Recipe> actual = service.findUserFavorites(3);
        assertEquals(2, actual.size());
    }

    @Test
    void shouldFindRecipeFavoriteCount() {
        when(repository.findRecipeFavoriteCount(2)).thenReturn(2);
        assertEquals(2, service.findRecipeFavoriteCount(2));
    }

    @Test
    void shouldAddFavorite() {
        when(repository.addFavorites(1,1)).thenReturn(true);
        Result<Boolean> actual = service.addFavorites(1, 1);
        assertTrue(actual.isSuccess());
    }

    @Test
    void shouldNotAddUserIdNotSetFavorite() {
        Result<Boolean> actual = service.addFavorites(0, 1);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotAddRecipeIdNotSetFavorite() {
        Result<Boolean> actual = service.addFavorites(1, 0);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldDeleteFavorite() {
        when(repository.deleteFavorites(1,1)).thenReturn(true);
        Result<Boolean> actual = service.deleteFavorites(1,1);
        assertTrue(actual.isSuccess());
    }

    @Test
    void shouldNotDeleteUserIdNotSetFavorite() {
        Result<Boolean> actual = service.deleteFavorites(0,1);
        assertFalse(actual.isSuccess());
    }

    @Test
    void shouldNotDeleteRecipeIdNotSetFavorite() {
        Result<Boolean> actual = service.deleteFavorites(1,0);
        assertFalse(actual.isSuccess());
    }

    private List<Recipe> generateRecipes() {
        Recipe recipe1 = new Recipe();
        recipe1.setName("Good Dish");
        recipe1.setUserId(1);
        recipe1.setRecipeId(1);
        Recipe recipe2 = new Recipe();
        recipe2.setName("Best Dish");
        recipe2.setUserId(1);
        recipe1.setRecipeId(2);
        Recipe recipe3 = new Recipe();
        recipe3.setName("Excellent Dish");
        recipe3.setUserId(2);
        recipe1.setRecipeId(2);
        return List.of(recipe1, recipe2, recipe3);
    }

}
