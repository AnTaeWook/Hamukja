package hamukja.demo.unitTest;

import hamukja.demo.domain.Member;
import hamukja.demo.repository.MemberRepository;
import hamukja.demo.service.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.aspectj.bridge.MessageUtil.fail;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 회원가입() throws Exception{
        Member member = new Member();
        member.setId("antk7894");
        member.setPassword("dksxodnr9");
        member.setEmail("antk7894@naver.com");

        Member saved = memberService.join(member);

        Assertions.assertThat(saved.getId()).isEqualTo(member.getId());
    }

    @Test(expected = IllegalStateException.class)
    public void 중복회원예외() throws Exception{
        Member member1 = new Member();
        member1.setId("antk7894");

        Member member2 = new Member();
        member2.setId("antk7894");

        memberService.join(member1);
        memberService.join(member2);

        fail("Exception must be occurred!");
    }
}
