package hamukja.demo.unitTest;

import hamukja.demo.domain.Member;
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

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RecipeRepositoryTest {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    MemberRepository memberRepository;

    @Test
    @Transactional
    @Rollback(false)
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
        Long savedId = recipeRepository.save(recipe);

        Recipe findRecipe = recipeRepository.findOne(savedId);

        Assertions.assertThat(findRecipe.getId()).isEqualTo(recipe.getId());
    }

    @Test
    @Transactional
    @Rollback(false)
    public void testRecipeInOrder() {
        Member member = new Member();
        member.setId("antk7894");
        member.setPassword("dksxodnr9");
        member.setEmail("antk7894@naver.com");
        memberRepository.save(member);

        Recipe recipe = Recipe.createRecipe(member);
        recipe.setEmail(member.getEmail());
        recipe.setTitle("맛있는 계란밥");
        recipe.setDesc("간단하게 만들 수 있는 계란 비빔밥");
        System.out.print(recipe.getId());
        Long savedId = recipeRepository.save(recipe);

        Recipe recipe2 = Recipe.createRecipe(member);
        recipe2.setEmail(member.getEmail());
        recipe2.setTitle("상추 샐러드");
        recipe2.setDesc("냉장고에 있는 야채들로 만들 수 있는 샐러드");
        Long savedId2 = recipeRepository.save(recipe2);

        List<Recipe> findRecipes = recipeRepository.findByTime();

        for(Recipe R : findRecipes){
            System.out.println(R.getTitle());
            System.out.println(R.getDesc());
        }
    }

}
