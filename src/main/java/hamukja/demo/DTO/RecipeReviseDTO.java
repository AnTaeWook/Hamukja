package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipeReviseDTO {
    private String title;
    private String desc;
    private String thumbnailPath;
    private List<String> articles;
    private List<String> imagePaths;

    public static RecipeReviseDTO create(String title, String desc, String thumbnailPath,
                                         List<String> articles, List<String> imagePaths){
        RecipeReviseDTO recipeReviseDTO = new RecipeReviseDTO();
        recipeReviseDTO.setTitle(title);
        recipeReviseDTO.setDesc(desc);
        recipeReviseDTO.setThumbnailPath(thumbnailPath);
        recipeReviseDTO.setArticles(articles);
        recipeReviseDTO.setImagePaths(imagePaths);
        return recipeReviseDTO;
    }
}
