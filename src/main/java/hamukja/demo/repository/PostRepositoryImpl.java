package hamukja.demo.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hamukja.demo.DTO.PostSearchCondition;
import hamukja.demo.domain.Post;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static hamukja.demo.domain.QPost.*;
import static org.springframework.util.StringUtils.*;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostCustomRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Post> findPostWithCondition(PostSearchCondition condition) {
        return queryFactory
                .selectFrom(post)
                .where(
                        postClassEq(condition.getPostClass()),
                        titleOrRegionContains(condition.getKeyword())
                )
                .orderBy(post.uploadTime.desc())
                .fetch();
    }

    private BooleanExpression postClassEq(String postClass) {
        return hasText(postClass) ? post.postClass.eq(postClass) : null;
    }

    private BooleanExpression titleContains(String keyword) {
        return hasText(keyword) ? post.title.contains(keyword) : null;
    }

    private BooleanExpression regionContains(String keyword) {
        return hasText(keyword) ? post.region.contains(keyword) : null;
    }

    private BooleanExpression titleOrRegionContains(String keyword) {
        return hasText(keyword) ? titleContains(keyword).or(regionContains(keyword)) : null;
    }


}
