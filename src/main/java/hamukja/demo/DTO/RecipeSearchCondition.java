package hamukja.demo.DTO;

import lombok.Data;

@Data
public class RecipeSearchCondition {

    private String sortingRule;
    private String keyword;
    private Long slice;

    public RecipeSearchCondition(String sortingRule, String keyword, Long slice) {
        this.sortingRule = sortingRule;
        this.keyword = keyword;
        this.slice = slice;
    }
}
