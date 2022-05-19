package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipePageDTO {
    private String title;
    private List<String> articles;

    public static RecipePageDTO create(String title, List<String> articles){
        RecipePageDTO recipePageDTO = new RecipePageDTO();
        recipePageDTO.setTitle(title);
        recipePageDTO.setArticles(articles);
        return recipePageDTO;
    }
}
