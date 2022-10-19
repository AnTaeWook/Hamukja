package hamukja.demo.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PostDtoList {

    private List<PostDto> postDtoList;
    private boolean hasMore;

    public PostDtoList(List<PostDto> postDtoList, boolean hasMore) {
        this.postDtoList = postDtoList;
        this.hasMore = hasMore;
    }
}
