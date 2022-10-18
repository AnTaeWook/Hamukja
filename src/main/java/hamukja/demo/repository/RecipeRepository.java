package hamukja.demo.repository;

import hamukja.demo.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findAllByOrderByUploadTimeDesc();

    List<Recipe> findAllByOrderByRecommendationsDesc();

    List<Recipe> findByTitleContains(String word);
}
