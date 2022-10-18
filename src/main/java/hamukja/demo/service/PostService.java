package hamukja.demo.service;

import hamukja.demo.DTO.PostReceiveDto;
import hamukja.demo.DTO.PostSearchCondition;
import hamukja.demo.domain.FileFolder;
import hamukja.demo.domain.Post;
import hamukja.demo.repository.MemberRepository;
import hamukja.demo.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final FileProcessService fileProcessService;

    public Post find(Long id) {
        return postRepository.findById(id).get();
    }

    public List<Post> findAll() {
        return postRepository.findAllByOrderByUploadTimeDesc();
    }

    public List<Post> findPostWithCondition(PostSearchCondition condition) {
        return postRepository.findPostWithCondition(condition);
    }

    @Transactional
    public Long save(PostReceiveDto postReceiveDto, MultipartFile postImage) {

        String fileName = postImage != null ? postImage.getOriginalFilename() : "";
        String filePath = postImage != null ? fileProcessService.uploadImage(postImage, FileFolder.RECIPE_IMAGES) : "";

        Post post = new Post(postReceiveDto.getTitle(), postReceiveDto.getRegion(), postReceiveDto.getPostClass(),
                postReceiveDto.getArticle(), LocalDateTime.now(), filePath, fileName);
        post.setMember(memberRepository.findById(postReceiveDto.getMemberId()).get());
        return postRepository.save(post).getId();
    }

    @Transactional
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

}
