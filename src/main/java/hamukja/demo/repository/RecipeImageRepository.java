package hamukja.demo.repository;

import hamukja.demo.domain.RecipeImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeImageRepository extends JpaRepository<RecipeImage, Long> {

}
