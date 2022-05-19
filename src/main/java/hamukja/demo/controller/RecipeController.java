package hamukja.demo.controller;

import hamukja.demo.DTO.RecipeDTO;
import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.service.MemberService;
import hamukja.demo.service.RecipeService;

import lombok.RequiredArgsConstructor;

import org.apache.tomcat.util.file.ConfigurationSource;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private final MemberService memberService;
    private String directoryPath = "C:\\SpringBoot\\Hamukja\\src\\main\\resources\\static";

    @PostMapping("/hamukja/recipe/new")
    public int create(@RequestParam("title")String title,
                      @RequestParam("desc")String desc,
                      @RequestParam("memberId")String memberId,
                      @RequestParam("email")String email,
                      @RequestParam(value = "thumbnail", required = false)MultipartFile thumbnail) throws IOException {

        Member member = memberService.findOne(memberId);
        Long recipeId = recipeService.join(title, desc, email, member);
        if(thumbnail != null) {
            String filePath = directoryPath + "\\" + recipeId;
            String fileName = "thumbnail_" + thumbnail.getOriginalFilename();
            saveFile(thumbnail, filePath, fileName);
            recipeService.addThumbnail(recipeId, filePath, fileName);
        }
        return 0;
    }

    @GetMapping("/hamukja/recipes")
    public List<RecipeDTO> recipeDTOList(){
        List<Recipe> recipes = recipeService.findByTime();
        if(recipes.size() <= 0){
            return null;
        }
        List<RecipeDTO> recipeDTOS = new ArrayList<>();
        for(Recipe r : recipes){
            recipeDTOS.add(RecipeDTO.create(r.getId(), r.getTitle(), r.getDesc()));
        }
        return recipeDTOS;
    }

    @GetMapping("/hamukja/thumbnail/{id}")
    public ResponseEntity<Resource> thumbnail(@PathVariable Long id) throws IOException {
        Recipe recipe = recipeService.findOne(id);

        String imageRoot = "";
        if(recipe.getThumbnailName() == null){
            imageRoot = "C:\\SpringBoot\\Hamukja\\src\\main\\resources\\static\\noThumbnail.PNG";
        }
        else{
            imageRoot = recipe.getThumbnailPath() + "\\" + recipe.getThumbnailName();
        }

        Resource resource = new FileSystemResource(imageRoot);

        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        filePath = Paths.get(imageRoot);
        header.add("Content-Type", Files.probeContentType(filePath));
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

    private void saveFile(MultipartFile file,String directoryPath, String fileName) throws IOException {
        Path directory = Paths.get(directoryPath).toAbsolutePath().normalize();

        // directory 해당 경로까지 디렉토리를 모두 만든다.
        Files.createDirectories(directory);

        // 파일명에 '..' 문자가 들어 있다면 오류를 발생하고 아니라면 진행(해킹및 오류방지)
        Assert.state(!fileName.contains(".."), "Name of file cannot contain '..'");

        //파일을 저장할 경로를 Path 객체로 받는다.
        Path targetPath=directory.resolve(fileName).normalize();

        //파일이 이미 존재하는지 확인
        //Assert.state(!Files.exists(targetPath), fileName + " File already exists.");
        file.transferTo(targetPath);
    }
}
