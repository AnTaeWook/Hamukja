package hamukja.demo.controller;

import hamukja.demo.DTO.RecipeDTO;
import hamukja.demo.DTO.RecipePageDTO;
import hamukja.demo.domain.Member;
import hamukja.demo.domain.Recipe;
import hamukja.demo.domain.RecipeArticle;
import hamukja.demo.domain.RecipeImage;
import hamukja.demo.service.MemberService;
import hamukja.demo.service.RecipeArticleService;
import hamukja.demo.service.RecipeImageService;
import hamukja.demo.service.RecipeService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private final MemberService memberService;
    private final RecipeArticleService recipeArticleService;
    private final RecipeImageService recipeImageService;
    private String directoryPath = "src/main/resources/static";

    @PostMapping("/hamukja/recipe/new")
    public int create(@RequestParam("title")String title,
                      @RequestParam("desc")String desc,
                      @RequestParam("memberId")String memberId,
                      @RequestParam("email")String email,
                      @RequestParam(value = "thumbnail", required = false)MultipartFile thumbnail,
                      @RequestParam(value = "stepArticles", required = false)List<String> stepArticles,
                      @RequestParam(value = "stepImages", required = false)List<MultipartFile> stepImages,
                      @RequestParam(value = "stepImagesLabels", required = false)List<Integer> stepImagesLabels) throws IOException {

        Member member = memberService.findOne(memberId);
        Long recipeId = recipeService.join(title, desc, email, member);
        if(thumbnail != null) {
            String filePath = directoryPath + "/" + recipeId;
            String fileName = "thumbnail_" + thumbnail.getOriginalFilename();
            saveFile(thumbnail, filePath, fileName);
            recipeService.addThumbnail(recipeId, filePath, fileName);
        }
        int imageIdx = 0;
        for(int i = 1; i <= stepArticles.size(); i++){
            recipeArticleService.join(recipeId, i, stepArticles.get(i - 1));
            if(stepImagesLabels != null) {
                if (stepImagesLabels.contains(i)) {
                    String filePath = directoryPath + "/" + recipeId;
                    String fileName = "stepImage_step_" + i + "_" + stepImages.get(imageIdx).getOriginalFilename();
                    saveFile(stepImages.get(imageIdx), filePath, fileName);
                    recipeImageService.join(recipeId, i, fileName, filePath);
                    imageIdx += 1;
                } else {
                    recipeImageService.join(recipeId, i, null, null);
                }
            }
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
            imageRoot = "src/main/resources/static/noThumbnail.PNG";
        }
        else{
            imageRoot = recipe.getThumbnailPath() + "/" + recipe.getThumbnailName();
        }

        Resource resource = new FileSystemResource(imageRoot);

        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        filePath = Paths.get(imageRoot);
        header.add("Content-Type", Files.probeContentType(filePath));
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

    @GetMapping("/hamukja/recipe/{id}")
    public RecipePageDTO recipePage(@PathVariable Long id){

        Recipe recipe = recipeService.findOne(id);
        List<RecipeArticle> recipeArticles = recipe.getRecipeArticles();
        List<String> articles = new ArrayList<>();

        for(RecipeArticle r : recipeArticles){
            articles.add(r.getArticle());
        }

        return RecipePageDTO.create(recipe.getTitle(), articles);
    }

    @GetMapping("/hamukja/step-image/{id}/{step}")
    public ResponseEntity<Resource> stepImage(@PathVariable Long id, @PathVariable int step) throws IOException {
        Recipe recipe = recipeService.findOne(id);
        List<RecipeImage> recipeImageList = recipe.getRecipeImages();
        RecipeImage recipeImage = recipeImageList.get(step);

        String imageRoot = "";
        if(recipeImage.getName() == null){
            imageRoot = "src/main/resources/static/noThumbnail.PNG";
        }
        else{
            imageRoot = recipeImage.getPath() + "/" + recipeImage.getName();
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
