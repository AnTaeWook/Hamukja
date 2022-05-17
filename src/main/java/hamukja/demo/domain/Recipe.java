package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipes")
@Getter @Setter
public class Recipe {

    @Id @GeneratedValue
    @Column(name = "recipeId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    private String title;

    private String desc;

    private String email;

    private LocalDateTime uploadTime;

//    연관관계 메서드
    public void setMember(Member member) {
        this.member = member;
        member.getRecipes().add(this);
    }
}
