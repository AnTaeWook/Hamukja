package hamukja.demo.service;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Transactional
    public Long join(String title, String desc, Member member, String fileName, String filePath){
        Recipe recipe = Recipe.create(title, desc, member, fileName, filePath);
        return recipeRepository.save(recipe).getId();
    }

    @Transactional
    public void update(Recipe recipe, String title, String desc, String fileName, String filePath, boolean isUpdated){
        if(!recipe.getTitle().equals(title)){
            recipe.setTitle(title);
        }
        if(!recipe.getDesc().equals(desc)){
            recipe.setDesc(desc);
        }
        if(isUpdated){
            recipe.setThumbnailName(fileName);
            recipe.setThumbnailPath(filePath);
        }
    }

    @Transactional
    public void delete(Recipe recipe){
        recipeRepository.delete(recipe);
    }

    @Transactional
    public void recommend(Long id, boolean isRecommend){
        Recipe recipe = recipeRepository.findById(id).get();
        if(isRecommend){
            recipe.increaseRec();
        }
        else{
            recipe.decreaseRec();
        }
        recipeRepository.save(recipe);
    }

    public Recipe findOne(Long id) { return  recipeRepository.findById(id).get(); }

    public List<Recipe> findByTime(){
        return recipeRepository.findAllByOrderByUploadTimeDesc();
    }

    public List<Recipe> findByRecommend() {
        return recipeRepository.findAllByOrderByRecommendationsDesc();
    }

    public List<Recipe> findByWord(String word){
        return recipeRepository.findByTitleContains(word);
    }

}
