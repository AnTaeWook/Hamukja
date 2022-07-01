package hamukja.demo.service;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.Recommend;
import hamukja.demo.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommendService {

    private final RecommendRepository recommendRepository;

    @Transactional
    public void join(Member member, Recipe recipe) throws Exception {
        Recommend recommend = new Recommend();
        recommend.setMember(member);
        recommend.setRecipe(recipe);
        recommendRepository.save(recommend);
    }

    @Transactional
    public void delete(Member member, Recipe recipe){
        recommendRepository.delete(member, recipe);
    }
}
