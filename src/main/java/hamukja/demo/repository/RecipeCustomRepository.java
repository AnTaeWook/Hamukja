package hamukja.demo.repository;

import hamukja.demo.DTO.RecipeSearchCondition;
import hamukja.demo.domain.Recipe;

import java.util.List;

public interface RecipeCustomRepository {

    List<Recipe> findBySearchCondition(RecipeSearchCondition condition);

    Long countBySearchCondition(RecipeSearchCondition condition);
}
