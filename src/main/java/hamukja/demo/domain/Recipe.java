package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
@Getter @Setter
public class Recipe {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipeId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<RecipeImage> recipeImages = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<RecipeArticle> recipeArticles = new ArrayList<>();

    private String thumbnailPath;

    private String thumbnailName;

    private String title;

    private String desc;

    private String email;

    private LocalDateTime uploadTime;

    // 연관관계 메서드
    public void setMember(Member member) {
        this.member = member;
        member.getRecipes().add(this);
    }

    // 생성 메서드
    public static Recipe createRecipe(Member member) {
        Recipe recipe = new Recipe();
        recipe.setMember(member);
        recipe.setUploadTime(LocalDateTime.now());
        return recipe;
    }
}
