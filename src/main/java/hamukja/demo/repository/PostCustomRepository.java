package hamukja.demo.repository;

import hamukja.demo.DTO.PostSearchCondition;
import hamukja.demo.domain.Post;

import java.util.List;

public interface PostCustomRepository {

    List<Post> findPostWithCondition(PostSearchCondition condition);

    Long countBySearchCondition(PostSearchCondition condition);
}
