package hamukja.demo.unitTest;

import hamukja.demo.domain.Member;
import hamukja.demo.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    @Transactional
    public void testMember() {
        Member member = new Member();
        member.setId("antk7894");
        member.setPassword("dksxodnr9");
        member.setEmail("antk7894@naver.com");
        Member saved = memberRepository.save(member);

        Member findMember = memberRepository.findById(saved.getId()).get();

        Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
        Assertions.assertThat(findMember.getPassword()).isEqualTo(member.getPassword());

//        동일 ID로 회원 가입 불가
//        Member member2 = new Member();
//        member2.setId("antk7894");
//        member.setPassword("dksxodnr8");
//        member.setEmail("antk7895@naver.com");
//        String savedId2 = memberRepository.save(member2);
    }
}
