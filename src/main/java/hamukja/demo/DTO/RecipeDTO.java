package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeDTO {
    private Long id;
    private String title;
    private String desc;
    private String thumbnailPath;

    public static RecipeDTO create(Long id, String title, String desc, String thumbnailPath){
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setId(id);
        recipeDTO.setTitle(title);
        recipeDTO.setDesc(desc);
        recipeDTO.setThumbnailPath(thumbnailPath);
        return recipeDTO;
    }
}
