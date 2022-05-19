package hamukja.demo.repository;

import hamukja.demo.domain.RecipeImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class RecipeImageRepository {

    private final EntityManager em;

    public void save(RecipeImage recipeImage){
        em.persist(recipeImage);
    }
}
