package hamukja.demo.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;



@Data
public class PostReceiveDto {

    private String memberId;
    private String title;
    private String region;
    private String postClass;
    private String article;

}
