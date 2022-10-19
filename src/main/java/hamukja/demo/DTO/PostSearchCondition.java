package hamukja.demo.DTO;

import lombok.Data;

@Data
public class PostSearchCondition {

    private String postClass;
    private String keyword;
    private Long page;

    public PostSearchCondition(String postClass, String keyword, Long page) {
        this.postClass = postClass;
        this.keyword = keyword;
        this.page = page;
    }
}
