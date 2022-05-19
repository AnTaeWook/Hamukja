package hamukja.demo.service;

import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.RecipeArticle;
import hamukja.demo.repository.RecipeArticleRepository;
import hamukja.demo.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeArticleService {

    private final RecipeArticleRepository recipeArticleRepository;
    private final RecipeRepository recipeRepository;

    public void join(Long recipeId, int step, String article){
        Recipe recipe = recipeRepository.findOne(recipeId);
        RecipeArticle recipeArticle = RecipeArticle.create(recipe, step, article);
        recipeArticleRepository.save(recipeArticle);
    }
}
