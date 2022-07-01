package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipe")
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

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<Recommend> recommends = new ArrayList<>();

    private String thumbnailPath;

    private String thumbnailName;

    private String title;

    private String desc;

    private String email;

    private LocalDateTime uploadTime;

    private int recommendations;

    // 생성 메서드
    public static Recipe create(String title, String desc, Member member, String fileName, String filePath) {
        Recipe recipe = new Recipe();
        recipe.setMember(member);
        recipe.setEmail(member.getEmail());
        recipe.setUploadTime(LocalDateTime.now());
        recipe.setTitle(title);
        recipe.setDesc(desc);
        recipe.setThumbnailName(fileName);
        recipe.setThumbnailPath(filePath);
        recipe.setRecommendations(0);
        return recipe;
    }

    // 연관관계 메서드
    public void setMember(Member member) {
        this.member = member;
        member.getRecipes().add(this);
    }

    // 추천수 증감
    public void increaseRec(){
        recommendations += 1;
    }

    public void decreaseRec(){
        if(recommendations > 0){
            recommendations -= 1;
        }
    }

}
