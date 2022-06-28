package hamukja.demo.service;

import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.RecipeImage;
import hamukja.demo.repository.RecipeImageRepository;
import hamukja.demo.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeImageService {

    private final RecipeImageRepository recipeImageRepository;
    private final RecipeRepository recipeRepository;

    public void join(Long recipeId, int step, String name, String path){
        Recipe recipe = recipeRepository.findOne(recipeId);
        RecipeImage recipeImage = RecipeImage.create(recipe, step, name, path);
        recipeImageRepository.save(recipeImage);
    }

    @Transactional
    public void delete(RecipeImage recipeImage){
        recipeImageRepository.delete(recipeImage);
    }

    @Transactional
    public void update(Long id, String fileName, String filePath){
        RecipeImage recipeImage = recipeImageRepository.findOne(id);
        recipeImage.setName(fileName);
        recipeImage.setPath(filePath);
        recipeImageRepository.save(recipeImage);
    }

    public RecipeImage findOne(Long id){
        return recipeImageRepository.findOne(id);
    }
}
