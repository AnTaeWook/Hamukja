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
        if(recipeImage.getId() == null){
            em.persist(recipeImage);
        }
        else{
            em.merge(recipeImage);
        }
    }

    public RecipeImage findOne(Long id){
        return em.find(RecipeImage.class, id);
    }

    public void delete(RecipeImage recipeImage){
        em.remove(recipeImage);
    }
}
