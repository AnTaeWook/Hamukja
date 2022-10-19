package hamukja.demo.repository;

import hamukja.demo.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c join fetch c.member join c.post p where p.id = :postId order by c.uploadTime desc")
    List<Comment> findAllByPost(@Param("postId") Long postId);
}
