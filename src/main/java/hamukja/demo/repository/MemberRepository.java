package hamukja.demo.repository;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public String save(Member member){
        em.persist(member);
        return member.getId();
    }

    public Member find(String id){
        return em.find(Member.class, id);
    }

}
