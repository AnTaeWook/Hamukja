package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class RecipeImage {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    private int step;

    private String name;

    private String path;

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
        recipe.getRecipeImages().add(this);
    }

    public static RecipeImage create(Recipe recipe, int step, String name, String path){
        RecipeImage recipeImage = new RecipeImage();
        recipeImage.setRecipe(recipe);
        recipeImage.setStep(step);
        recipeImage.setName(name);
        recipeImage.setPath(path);
        return recipeImage;
    }
}
