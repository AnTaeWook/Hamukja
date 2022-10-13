package hamukja.demo.repository;

import hamukja.demo.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, PostCustomRepository {

    List<Post> findAllByOrderByUploadTimeDesc();

    List<Post> findByPostClass(String postClass);

    List<Post> findByRegionLike(String region);
}
