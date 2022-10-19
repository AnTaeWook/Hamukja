package hamukja.demo.DTO;

import hamukja.demo.domain.Recipe;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeDTO {
    private Long id;
    private String title;
    private String desc;
    private String thumbnailPath;

    public RecipeDTO(Recipe recipe) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.desc = recipe.getDesc();
        this.thumbnailPath = recipe.getThumbnailPath();
    }
}
