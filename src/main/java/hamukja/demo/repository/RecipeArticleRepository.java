package hamukja.demo.repository;

import hamukja.demo.domain.RecipeArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeArticleRepository extends JpaRepository<RecipeArticle, Long> {
}
