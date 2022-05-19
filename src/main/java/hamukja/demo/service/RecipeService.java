package hamukja.demo.service;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Transactional
    public Long join(String title, String desc, String email, Member member){
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
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void addThumbnail(Long id, String filePath, String fileName){
        Recipe recipe = recipeRepository.findOne(id);
        recipe.setThumbnailPath(filePath);
        recipe.setThumbnailName(fileName);
        recipeRepository.save(recipe);
    }

    public Recipe findOne(Long id) { return  recipeRepository.findOne(id); }

    public List<Recipe> findByTime(){
        return recipeRepository.findByTime();
    }

}
