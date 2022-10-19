package hamukja.demo.unitTest;

import hamukja.demo.DTO.RecipeSearchCondition;
import hamukja.demo.domain.Member;
import hamukja.demo.domain.Post;
import hamukja.demo.domain.Recipe;
import hamukja.demo.repository.MemberRepository;
import hamukja.demo.repository.RecipeRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class RecipeRepositoryTest {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    MemberRepository memberRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    @Transactional
    public void testRecipe(){
        Member member = new Member();
        member.setId("antk7894");
        member.setPassword("dksxodnr9");
        member.setEmail("antk7894@naver.com");
        memberRepository.save(member);

        Recipe recipe = Recipe.createRecipe(member);
        recipe.setEmail(member.getEmail());
        recipe.setTitle("맛있는 계란밥");
        recipe.setDesc("간단하게 만들 수 있는 계란 비빔밥");
        Recipe savedRecipe = recipeRepository.save(recipe);

        Recipe findRecipe = recipeRepository.findById(savedRecipe.getId()).get();

        Assertions.assertThat(findRecipe.getId()).isEqualTo(recipe.getId());
    }
}
