package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipePageDTO {
    private String memberId;
    private String title;
    private List<String> articles;
    private List<String> imagePaths;
    private int recommendations;

    public static RecipePageDTO create(String memberId, String title, List<String> articles, List<String> imagePaths, int recommendations){
        RecipePageDTO recipePageDTO = new RecipePageDTO();
        recipePageDTO.setMemberId(memberId);
        recipePageDTO.setTitle(title);
        recipePageDTO.setArticles(articles);
        recipePageDTO.setImagePaths(imagePaths);
        recipePageDTO.setRecommendations(recommendations);
        return recipePageDTO;
    }
}
