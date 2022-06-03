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
    public Long join(String title, String desc, String email, Member member, String fileName, String filePath){
        Recipe recipe;
        if(member == null){
            recipe = Recipe.createRecipe();
            recipe.setEmail(email);
        }
        else{
            recipe = Recipe.createRecipe(member);
            recipe.setEmail(member.getEmail());
        }
        recipe.setTitle(title);
        recipe.setDesc(desc);
        recipe.setThumbnailName(fileName);
        recipe.setThumbnailPath(filePath);
        return recipeRepository.save(recipe);
    }

    public Recipe findOne(Long id) { return  recipeRepository.findOne(id); }

    public List<Recipe> findByTime(){
        return recipeRepository.findByTime();
    }

}
