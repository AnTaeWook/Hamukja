package hamukja.demo.controller;

import hamukja.demo.DTO.RecipeDTO;
import hamukja.demo.DTO.RecipePageDTO;
import hamukja.demo.DTO.RecipeReviseDTO;
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

    private static String noImage = "https://antk7894-s3-bucket.s3.ap-northeast-2.amazonaws.com/Hamukja/noThumbnail.PNG";

    @PostMapping("/hamukja/recipe/new")
    public int create(@RequestParam("title")String title,
                      @RequestParam("desc")String desc,
                      @RequestParam("memberId")String memberId,
                      @RequestParam(value = "thumbnail", required = false)MultipartFile thumbnail,
                      @RequestParam(value = "stepArticles", required = false)List<String> stepArticles,
                      @RequestParam(value = "stepImages", required = false)List<MultipartFile> stepImages) throws IOException {

        String filePath = noImage;
        String fileName = "noImage";
        if(thumbnail != null){
            fileName = thumbnail.getOriginalFilename();
            filePath = fileProcessService.uploadImage(thumbnail, FileFolder.RECIPE_IMAGES);
        }
        Member member = memberService.findOne(memberId);
        Long recipeId = recipeService.join(title, desc, member, fileName, filePath);

        for(int i = 1; i <= stepArticles.size(); i++){
            recipeArticleService.join(recipeId, i, stepArticles.get(i - 1));
            if(stepImages.get(i - 1).getSize() <= 0){
                recipeImageService.join(recipeId, i, "noImage", noImage);
            }
            else{
                fileName = stepImages.get(i - 1).getOriginalFilename();
                filePath = fileProcessService.uploadImage(stepImages.get(i - 1), FileFolder.RECIPE_IMAGES);
                recipeImageService.join(recipeId, i, fileName, filePath);
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

        return RecipePageDTO.create(recipe.getMember().getId(), recipe.getTitle(), articles, imagePaths);
    }

    @GetMapping("/hamukja/recipe-for-revise/{id}")
    public RecipeReviseDTO recipeForRevise(@PathVariable Long id){
        Recipe recipe = recipeService.findOne(id);
        String thumbnailPath = (recipe.getThumbnailName().equals("noImage")) ? "noImage" : recipe.getThumbnailPath();
        List<String> articles = new ArrayList<>();
        List<String> imagePaths = new ArrayList<>();

        for(RecipeArticle r : recipe.getRecipeArticles()){
            articles.add(r.getArticle());
        }
        for(RecipeImage r : recipe.getRecipeImages()){
            if(!r.getName().equals("noImage")){
                imagePaths.add(r.getPath());
            }
            else {
                imagePaths.add("noImage");
            }
        }

        return RecipeReviseDTO.create(recipe.getTitle(), recipe.getDesc(), thumbnailPath,
                articles, imagePaths);
    }

    @PutMapping("/hamukja/recipe/{id}")
    public void update(@PathVariable Long id,
                       @RequestParam("title")String title,
                       @RequestParam("desc")String desc,
                       @RequestParam(value = "thumbnail", required = false)MultipartFile thumbnail,
                       @RequestParam(value = "stepArticles", required = false)List<String> stepArticles,
                       @RequestParam(value = "stepImages", required = false)List<MultipartFile> stepImages,
                       @RequestParam("mods")List<Boolean> mods) throws IOException{

        Recipe recipe = recipeService.findOne(id);
        String filePath = noImage;
        String fileName = "noImage";
        if(mods.get(0) && !recipe.getThumbnailPath().equals(filePath)){
            fileProcessService.deleteImage(recipe.getThumbnailPath());
        }
        if(thumbnail != null){
            fileName = thumbnail.getOriginalFilename();
            filePath = fileProcessService.uploadImage(thumbnail, FileFolder.RECIPE_IMAGES);
        }
        recipeService.update(recipe, title, desc, fileName, filePath, mods.get(0));

        for(int i = 0; i < Math.min(stepArticles.size(), recipe.getRecipeArticles().size()); i++){
            filePath = noImage;
            fileName = "noImage";
            if(!stepArticles.get(i).equals(recipe.getRecipeArticles().get(i).getArticle())){
                recipeArticleService.update(recipe.getRecipeArticles().get(i).getId(), stepArticles.get(i));
            }
            if(mods.get(i + 1) && !recipe.getRecipeImages().get(i).getPath().equals(filePath)){
                fileProcessService.deleteImage(recipe.getRecipeImages().get(i).getPath());
            }
            if(stepImages.get(i).getSize() > 0){
                fileName = stepImages.get(i).getOriginalFilename();
                filePath = fileProcessService.uploadImage(stepImages.get(i), FileFolder.RECIPE_IMAGES);
            }
            if(mods.get(i + 1)){
                recipeImageService.update(recipe.getRecipeImages().get(i).getId(), fileName, filePath);
            }
        }

        if(stepArticles.size() > recipe.getRecipeArticles().size()){
            for(int i = recipe.getRecipeArticles().size() + 1; i <= stepArticles.size(); i++){
                filePath = noImage;
                fileName = "noImage";
                recipeArticleService.join(recipe.getId(), i, stepArticles.get(i - 1));
                if(stepImages.get(i - 1).getSize() > 0){
                    fileName = stepImages.get(i - 1).getOriginalFilename();
                    filePath = fileProcessService.uploadImage(stepImages.get(i - 1), FileFolder.RECIPE_IMAGES);
                }
                recipeImageService.join(recipe.getId(), i, fileName, filePath);
            }
        }
        else if(stepArticles.size() < recipe.getRecipeArticles().size()){
            for(int i = recipe.getRecipeArticles().size() - 1; i >= stepArticles.size(); i--) {
                recipeArticleService.delete(recipe.getRecipeArticles().get(i));
                if (!recipe.getRecipeImages().get(i).getPath().equals(noImage)) {
                    fileProcessService.deleteImage(recipe.getRecipeImages().get(i).getPath());
                }
                recipeImageService.delete(recipe.getRecipeImages().get(i));
            }
            System.out.println(recipe.getRecipeArticles().size());
            System.out.println(recipe.getRecipeImages().size());
        }
    }

    @DeleteMapping("/hamukja/recipe/{id}")
    public void delete(@PathVariable Long id){
        Recipe recipe = recipeService.findOne(id);
        if(!recipe.getThumbnailPath().equals(noImage)){
            fileProcessService.deleteImage(recipe.getThumbnailPath());
        }
        List<RecipeImage> recipeImages = recipe.getRecipeImages();
        for(RecipeImage recipeImage : recipeImages){
            if(!recipeImage.getPath().equals(noImage)){
                fileProcessService.deleteImage(recipeImage.getPath());
            }
        }
        recipeService.delete(recipe);
    }
}
