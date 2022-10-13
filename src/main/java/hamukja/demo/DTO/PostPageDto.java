package hamukja.demo.DTO;

import hamukja.demo.domain.Post;
import lombok.Data;

@Data
public class PostPageDto {

    private String title;
    private String memberId;
    private String postClass;
    private String region;
    private String article;
    private String imagePath;

    public PostPageDto(Post post) {
        this.title = post.getTitle();
        this.memberId = post.getMember().getId();
        this.postClass = post.getPostClass();
        this.region = post.getRegion();
        this.article = post.getArticle();
        this.imagePath = post.getImagePath();
    }

}
