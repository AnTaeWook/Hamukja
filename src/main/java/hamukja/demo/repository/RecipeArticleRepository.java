package hamukja.demo.repository;

import hamukja.demo.domain.RecipeArticle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class RecipeArticleRepository {

    private final EntityManager em;

    public void save(RecipeArticle recipeArticle){
        em.persist(recipeArticle);
    }
}
