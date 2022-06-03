package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipePageDTO {
    private String title;
    private List<String> articles;
    private List<String> imagePaths;

    public static RecipePageDTO create(String title, List<String> articles, List<String> imagePaths){
        RecipePageDTO recipePageDTO = new RecipePageDTO();
        recipePageDTO.setTitle(title);
        recipePageDTO.setArticles(articles);
        recipePageDTO.setImagePaths(imagePaths);
        return recipePageDTO;
    }
}
