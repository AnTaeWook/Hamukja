package hamukja.demo.unitTest;

import hamukja.demo.domain.Member;
import hamukja.demo.repository.MemberRepository;
import hamukja.demo.repository.RecipeRepository;
import hamukja.demo.service.RecipeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class RecipeServiceTest {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    RecipeService recipeService;
    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 레시피등록() throws Exception{
        Member member = new Member();
        member.setId("antk7894");
        member.setPassword("dksxodnr9");
        member.setEmail("antk7894@naver.com");

        memberRepository.save(member);

        Long saveId = recipeService.join("삼겹살 볶음밥", "삼겹살과 상추로만 만드는 간단 비빔밥",
                "", member);
        System.out.println(recipeRepository.findOne(saveId).getTitle());
    }

    @Test
    public void 레시피등록_비회원() throws Exception{
        Long saveId = recipeService.join("삼겹살 볶음밥", "삼겹살과 상추로만 만드는 간단 비빔밥",
                "antk7894@naver.com", null);
        System.out.println(recipeRepository.findOne(saveId).getTitle());
    }
}
