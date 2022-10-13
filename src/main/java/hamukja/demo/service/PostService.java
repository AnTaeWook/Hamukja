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

    public List<Post> findAllByClass(String postClass) {
        return postRepository.findByPostClass(postClass);
    }

    public List<Post> findAllByRegion(String region) {
        return postRepository.findByRegionLike(region);
    }

    public List<Post> findPostWithCondition(PostSearchCondition condition) {
        return postRepository.findPostWithCondition(condition);
    }

    @Transactional
    public Long save(PostReceiveDto postReceiveDto) {

        String fileName = postReceiveDto.getPostImage() != null ? postReceiveDto.getPostImage().getOriginalFilename() : "";
        String filePath = postReceiveDto.getPostImage() != null ? fileProcessService.uploadImage(postReceiveDto.getPostImage(), FileFolder.RECIPE_IMAGES) : "";

        Post post = new Post(postReceiveDto.getTitle(), postReceiveDto.getRegion(), postReceiveDto.getPostClass(),
                postReceiveDto.getArticle(), LocalDateTime.now(), filePath, fileName);
        post.setMember(memberRepository.find(postReceiveDto.getMemberId()));
        return postRepository.save(post).getId();
    }

    @Transactional
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

}
