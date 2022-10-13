package hamukja.demo.controller;

import hamukja.demo.DTO.*;
import hamukja.demo.domain.Comment;
import hamukja.demo.domain.Post;
import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.RecipeImage;
import hamukja.demo.repository.CommentRepository;
import hamukja.demo.service.FileProcessService;
import hamukja.demo.service.MemberService;
import hamukja.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    public List<PostDto> getPosts(@RequestParam("postClass") String postClass, @RequestParam("keyword") String keyword) {
        return postService.findPostWithCondition(new PostSearchCondition(postClass, keyword)).stream().map(PostDto::new).collect(Collectors.toList());
    }

    @GetMapping("/hamukja/post/{id}")
    public PostPageDto getPost(@PathVariable("id") Long id) {
        return new PostPageDto(postService.find(id));
    }

    @GetMapping("/hamukja/comment/{id}")
    public List<CommentDto> getComments(@PathVariable("id") Long id) {
        return commentRepository.findAllByPost(postService.find(id)).stream().map(CommentDto::new).collect(Collectors.toList());
    }

    @PostMapping("/hamukja/post")
    public void uploadPost(PostReceiveDto postReceiveDto) {
        postService.save(postReceiveDto);
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
