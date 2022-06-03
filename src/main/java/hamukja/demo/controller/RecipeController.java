package hamukja.demo.controller;

import hamukja.demo.DTO.RecipeDTO;
import hamukja.demo.DTO.RecipePageDTO;
import hamukja.demo.domain.*;
import hamukja.demo.service.*;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final FileProcessService fileProcessService;

    @PostMapping("/hamukja/recipe/new")
    public int create(@RequestParam("title")String title,
                      @RequestParam("desc")String desc,
                      @RequestParam("memberId")String memberId,
                      @RequestParam("email")String email,
                      @RequestParam(value = "thumbnail", required = false)MultipartFile thumbnail,
                      @RequestParam(value = "stepArticles", required = false)List<String> stepArticles,
                      @RequestParam(value = "stepImages", required = false)List<MultipartFile> stepImages,
                      @RequestParam(value = "stepImagesLabels", required = false)List<Integer> stepImagesLabels) throws IOException {

        String noImage = "https://antk7894-s3-bucket.s3.ap-northeast-2.amazonaws.com/Hamukja/noThumbnail.PNG";
        String filePath = noImage;
        String fileName = "noImage";
        if(thumbnail != null){
            fileName = thumbnail.getOriginalFilename();
            filePath = fileProcessService.uploadImage(thumbnail, FileFolder.RECIPE_IMAGES);
        }
        Member member = memberService.findOne(memberId);
        Long recipeId = recipeService.join(title, desc, email, member, fileName, filePath);

        int imageIdx = 0;
        for(int i = 1; i <= stepArticles.size(); i++){
            recipeArticleService.join(recipeId, i, stepArticles.get(i - 1));
            if(stepImagesLabels != null) {
                if (stepImagesLabels.contains(i)) {
                    fileName = stepImages.get(imageIdx).getOriginalFilename();
                    filePath = fileProcessService.uploadImage(stepImages.get(imageIdx), FileFolder.RECIPE_IMAGES);
                    recipeImageService.join(recipeId, i, fileName, filePath);
                    imageIdx += 1;
                } else {
                    recipeImageService.join(recipeId, i, "noImage", noImage);
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
            recipeDTOS.add(RecipeDTO.create(r.getId(), r.getTitle(), r.getDesc(), r.getThumbnailPath()));
        }
        return recipeDTOS;
    }

    @GetMapping("/hamukja/recipe/{id}")
    public RecipePageDTO recipePage(@PathVariable Long id){

        Recipe recipe = recipeService.findOne(id);
        List<RecipeArticle> recipeArticles = recipe.getRecipeArticles();
        List<RecipeImage> recipeImages = recipe.getRecipeImages();
        List<String> articles = new ArrayList<>();
        List<String> imagePaths = new ArrayList<>();

        for(RecipeArticle r : recipeArticles){
            articles.add(r.getArticle());
        }
        for(RecipeImage r : recipeImages){
            imagePaths.add(r.getPath());
        }

        return RecipePageDTO.create(recipe.getTitle(), articles, imagePaths);
    }
}
