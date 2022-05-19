package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class RecipeArticle {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    private int step;

    private String article;

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
        recipe.getRecipeArticles().add(this);
    }

    public static RecipeArticle create(Recipe recipe, int step, String article){
        RecipeArticle recipeArticle = new RecipeArticle();
        recipeArticle.setRecipe(recipe);
        recipeArticle.setStep(step);
        recipeArticle.setArticle(article);
        return recipeArticle;
    }
}
