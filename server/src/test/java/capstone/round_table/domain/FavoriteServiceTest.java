package capstone.round_table.domain;

import capstone.round_table.data.favorite.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class FavoriteServiceTest {
    @Autowired
    FavoriteServiceTest service;

    @MockBean
    FavoriteRepository repository;
}
