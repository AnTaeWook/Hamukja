package hamukja.demo.DTO;

import hamukja.demo.domain.Post;
import lombok.Data;

@Data
public class PostDto {

    private Long id;
    private String postClass;
    private String title;
    private String region;

    public PostDto(Post post) {
        this.id = post.getId();
        this.postClass = post.getPostClass();
        this.title = post.getTitle();
        this.region = post.getRegion();
    }

}
