package hamukja.demo.repository;

import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    @Query("select r from Recommend r where r.member=:member and r.recipe=:recipe")
    Recommend findByMemberAndRecipe(@Param("member") Member member, @Param("recipe") Recipe recipe);
}
