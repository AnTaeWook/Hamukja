package hamukja.demo;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Post;
import hamukja.demo.domain.Recipe;
import hamukja.demo.service.MemberService;
import hamukja.demo.service.PostService;
import hamukja.demo.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class Init {

    private final initRecipesAndPosts recipesAndPosts;

    @PostConstruct
    public void initialize() {
        recipesAndPosts.init();
    }

    @Component
    static class initRecipesAndPosts {
        @PersistenceContext
        EntityManager em;

        private static final String noImage = "https://antk7894-s3-bucket.s3.ap-northeast-2.amazonaws.com/Hamukja/noThumbnail.PNG";

        @Transactional
        public void init() {
            Member member = new Member();
            member.setId("user");
            member.setPassword("user");
            member.setEmail("sample@email.com");
            em.persist(member);

            String[] classes = {"exchange", "share", "groupBuying"};

            for (int i = 0; i < 100; i++) {
                Recipe recipe = Recipe.create("recipe" + i, "about recipe...", member, "file" + i, noImage);
                recipe.setRecommendations(100 - i);
                em.persist(recipe);
                Post post = new Post("post" + i, "town" + i, classes[i % 3],
                        "this post is for ...", LocalDateTime.now(), "", "");
                post.setMember(member);
                em.persist(post);
            }
        }
    }

}
