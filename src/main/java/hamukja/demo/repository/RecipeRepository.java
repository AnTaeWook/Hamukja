package hamukja.demo.repository;

import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.Recommend;
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

    public void delete(Recipe recipe){
        em.remove(recipe);
    }

    public Recipe findOne(Long id) {
        return em.find(Recipe.class, id);
    }

    public List<Recipe> findByTime() {
        return em.createQuery("select r from Recipe r order by r.uploadTime desc",
                Recipe.class).getResultList();
    }

    public List<Recipe> findByRecommend() {
        return em.createQuery("select r from Recipe r order by r.recommendations desc, r.uploadTime desc",
                Recipe.class).getResultList();
    }

    public List<Recipe> findByWord(String word) {
        String likeWord = "%" + word + "%";
        return em.createQuery("select r from Recipe r where r.title like :word", Recipe.class)
                .setParameter("word", likeWord).getResultList();
    }
}
