package hamukja.demo.repository;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.Recommend;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecommendRepository {

    private final EntityManager em;

    public void save(Recommend recommend) throws Exception{
        em.persist(recommend);
    }

    public void delete(Member member, Recipe recipe){
        Recommend recommend = em.createQuery("select r from Recommend r where r.member=:member and r.recipe=:recipe", Recommend.class)
                .setParameter("member", member).setParameter("recipe", recipe).getSingleResult();
        em.remove(recommend);
    }
}
