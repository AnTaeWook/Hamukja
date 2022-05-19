package hamukja.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.io.InputStream;

@Getter
@Setter
public class RecipeDTO {
    private Long id;
    private String title;
    private String desc;

    public static RecipeDTO create(Long id, String title, String desc){
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setId(id);
        recipeDTO.setTitle(title);
        recipeDTO.setDesc(desc);
        return recipeDTO;
    }
}
