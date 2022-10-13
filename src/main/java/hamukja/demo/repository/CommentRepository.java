package hamukja.demo.repository;

import hamukja.demo.domain.Comment;
import hamukja.demo.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c join fetch c.member where c.post = :post order by c.uploadTime desc")
    List<Comment> findAllByPost(@Param("post") Post post);
}
