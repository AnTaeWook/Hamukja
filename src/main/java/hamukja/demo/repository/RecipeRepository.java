package hamukja.demo.repository;

import hamukja.demo.domain.Recipe;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecipeRepository {

    private final EntityManager em;

    public Long save(Recipe recipe){
        if(recipe.getId() == null){
            em.persist(recipe);
        }
        else{
            em.merge(recipe);
        }
        return recipe.getId();
    }

    public Recipe findOne(Long id) {
        return em.find(Recipe.class, id);
    }

    public List<Recipe> findByTime() {
        return em.createQuery("select r from Recipe r order by r.uploadTime desc",
                Recipe.class).getResultList();
    }
}
