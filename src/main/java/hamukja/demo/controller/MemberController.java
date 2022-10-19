package hamukja.demo.controller;

import hamukja.demo.domain.Member;
import hamukja.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/hamukja/sign-up")
    public String create(@RequestParam("id")String id,
                         @RequestParam("pw")String password,
                        @RequestParam("email")String email){
        Member member = new Member();
        member.setId(id);
        member.setPassword(password);
        member.setEmail(email);
        memberService.join(member);
        return id;
    }

    @PostMapping("/hamukja/sign-in")
    public String signIn(@RequestParam("id") String id,
                         @RequestParam("pw") String password) {
        if (memberService.findOne(id) == null) {
            return "<Error>notExistId";
        } else if (!memberService.findOne(id).getPassword().equals(password)) {
            return "<Error>wrongPassword";
        }
        return id;
    }

}
