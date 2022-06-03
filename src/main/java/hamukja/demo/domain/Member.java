package hamukja.demo.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id
    @Column(name = "memberId")
    private String id;

    private String password;

    private String email;

    @OneToMany(mappedBy = "member")
    private List<Recipe> recipes = new ArrayList<>();
}
