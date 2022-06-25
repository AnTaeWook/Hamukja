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
        Recipe recipe;
        recipe = Recipe.createRecipe(member);
        recipe.setEmail(member.getEmail());
        recipe.setTitle(title);
        recipe.setDesc(desc);
        recipe.setThumbnailName(fileName);
        recipe.setThumbnailPath(filePath);
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void update(Recipe recipe, String title, String desc, String fileName, String filePath, boolean isUpdated){
        if(recipe.getTitle() != title){
            recipe.setTitle(title);
        }
        if(recipe.getDesc() != desc){
            recipe.setDesc(desc);
        }
        if(isUpdated){
            recipe.setThumbnailName(fileName);
            recipe.setThumbnailPath(filePath);
        }
        recipeRepository.save(recipe);
    }

    @Transactional
    public void delete(Recipe recipe){
        recipeRepository.delete(recipe);
    }

    public Recipe findOne(Long id) { return  recipeRepository.findOne(id); }

    public List<Recipe> findByTime(){
        return recipeRepository.findByTime();
    }

}
