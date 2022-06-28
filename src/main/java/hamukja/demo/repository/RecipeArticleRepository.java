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
        if(recipeArticle.getId() == null){
            em.persist(recipeArticle);
        }
        else{
            em.merge(recipeArticle);
        }
    }

    public RecipeArticle findOne(Long id){
        return em.find(RecipeArticle.class, id);
    }

    public void delete(RecipeArticle recipeArticle){
        em.remove(recipeArticle);
    }
}
