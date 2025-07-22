package capstone.round_table.domain;

import capstone.round_table.data.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class CommentServiceTest {

    @Autowired
    CommentServiceTest service;

    @MockBean
    CommentRepository repository;

}
