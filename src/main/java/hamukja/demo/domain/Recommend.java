package hamukja.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "onceRecommend",
                columnNames = {"memberId", "recipeId"}
        )
})
@Getter @Setter
public class Recommend {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void setMember(Member member){
        this.member = member;
        member.getRecommends().add(this);
    }

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getRecommends().add(this);
    }
}
