package capstone.round_table.domain;

import capstone.round_table.data.favorite.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class FavoriteService {
    @Autowired
    FavoriteService service;

    @MockBean
    FavoriteRepository repository;
}
