package hamukja.demo.DTO;

import hamukja.demo.domain.Comment;
import lombok.Data;

@Data
public class CommentDto {

    private String memberId;
    private String contents;

    public CommentDto(Comment comment) {
        this.memberId = comment.getMember().getId();
        this.contents = comment.getContents();
    }

}
