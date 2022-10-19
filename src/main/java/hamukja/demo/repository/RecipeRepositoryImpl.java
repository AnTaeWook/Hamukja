package hamukja.demo.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hamukja.demo.DTO.RecipeSearchCondition;
import hamukja.demo.domain.Recipe;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;

import static hamukja.demo.domain.QRecipe.*;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
public class RecipeRepositoryImpl implements RecipeCustomRepository {

    private final JPAQueryFactory queryFactory;

    private final HashMap<String, OrderSpecifier> orderRuleMap = new HashMap<>(){{
        put("order-by-time", recipe.uploadTime.desc());
        put("order-by-recommend", recipe.recommendations.desc());
    }};

    @Override
    public List<Recipe> findBySearchCondition(RecipeSearchCondition condition) {
        return queryFactory
                .selectFrom(recipe)
                .where(
                        titleContains(condition.getKeyword())
                )
                .orderBy(orderRuleMap.get(condition.getSortingRule()))
                .offset(condition.getSlice() * 5)
                .limit(5)
                .fetch();
    }

    @Override
    public Long countBySearchCondition(RecipeSearchCondition condition) {
        return queryFactory
                .select(recipe.count())
                .from(recipe)
                .where(
                        titleContains(condition.getKeyword())
                )
                .fetchOne();
    }

    private BooleanExpression titleContains(String keyword) {
        return hasText(keyword) ? recipe.title.contains(keyword) : null;
    }
}
