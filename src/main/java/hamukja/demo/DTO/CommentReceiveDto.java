package hamukja.demo.DTO;

import lombok.Data;

@Data
public class CommentReceiveDto {

    private String memberId;
    private Long postId;
    private String contents;

}
