package hamukja.demo.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


    private String title;
    private String region;
    private String postClass;
    private String article;
    private LocalDateTime uploadTime;
    private String imagePath;
    private String imageName;

    public Post(String title, String region, String postClass, String article, LocalDateTime uploadTime, String imagePath, String imageName) {
        this.title = title;
        this.region = region;
        this.postClass = postClass;
        this.article = article;
        this.uploadTime = uploadTime;
        this.imagePath = imagePath;
        this.imageName = imageName;
    }

    public void setMember(Member member) {
        this.member = member;
        member.getPosts().add(this);
    }

}
