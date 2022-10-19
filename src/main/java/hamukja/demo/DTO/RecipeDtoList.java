package hamukja.demo.DTO;

import hamukja.demo.domain.Recipe;
import lombok.Data;

import java.util.List;

@Data
public class RecipeDtoList {

    private List<RecipeDTO> recipeDTOList;
    private boolean hasMore;

    public RecipeDtoList(List<RecipeDTO> recipeDTOList, boolean hasMore) {
        this.recipeDTOList = recipeDTOList;
        this.hasMore = hasMore;
    }
}
