package hamukja.demo.DTO;

import lombok.Data;

@Data
public class PostSearchCondition {

    private String postClass;
    private String keyword;

    public PostSearchCondition(String postClass, String keyword) {
        this.postClass = postClass;
        this.keyword = keyword;
    }
}
