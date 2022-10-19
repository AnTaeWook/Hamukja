package hamukja.demo.controller;

import hamukja.demo.DTO.*;
import hamukja.demo.domain.Comment;
import hamukja.demo.domain.Post;
import hamukja.demo.repository.CommentRepository;
import hamukja.demo.service.FileProcessService;
import hamukja.demo.service.MemberService;
import hamukja.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final FileProcessService fileProcessService;

    @GetMapping("/hamukja/post")
    public PostDtoList getPosts(@RequestParam("postClass") String postClass, @RequestParam("keyword") String keyword,
                                  @RequestParam("page") Long page) {
        PostSearchCondition postSearchCondition = new PostSearchCondition(postClass, keyword, page);
        List<Post> posts = postService.findPostWithCondition(postSearchCondition);

        Long size = postService.count(postSearchCondition);
        return new PostDtoList(posts.stream().map(PostDto::new).collect(Collectors.toList()), (page + 1) * 10 < size);
    }

    @GetMapping("/hamukja/post/{id}")
    public PostPageDto getPost(@PathVariable("id") Long id) {
        return new PostPageDto(postService.find(id));
    }

    @GetMapping("/hamukja/comment/{id}")
    public List<CommentDto> getComments(@PathVariable("id") Long id) {
        return commentRepository.findAllByPost(id).stream().map(CommentDto::new).collect(Collectors.toList());
    }

    @PostMapping("/hamukja/post")
    public void uploadPost(PostReceiveDto postReceiveDto, @RequestParam(value = "postImage", required = false) MultipartFile postImage) {
        postService.save(postReceiveDto, postImage);
    }

    @PostMapping("/hamukja/post/comment")
    @Transactional
    public void comment(CommentReceiveDto commentReceiveDto) {
        commentRepository.save(new Comment(memberService.findOne(commentReceiveDto.getMemberId()), postService.find(commentReceiveDto.getPostId()),
                commentReceiveDto.getContents()));
    }

    @DeleteMapping("/hamukja/post/{id}")
    public void delete(@PathVariable Long id){
        Post post = postService.find(id);
        if (post.getImagePath().length() > 0) {
            fileProcessService.deleteImage(post.getImagePath());
        }
        postService.delete(id);
    }

}
