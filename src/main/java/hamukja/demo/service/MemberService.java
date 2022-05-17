package hamukja.demo.service;

import hamukja.demo.domain.Member;
import hamukja.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public String join(Member member){
        validateDuplicateId(member);    //중복 ID 검사
        return memberRepository.save(member);
    }

    private void validateDuplicateId(Member member){
        if(memberRepository.find(member.getId()) != null){
            throw new IllegalStateException("이미 존재하는 ID입니다.");
        }
    }

    public Member findOne(String memberId){
        return memberRepository.find(memberId);
    }

}
