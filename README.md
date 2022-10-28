# 👨‍🍳레시피 공유 웹 어플리케이션 해먹자👩‍🍳
<br/><br/>

### ☝5단계 이하의 레시피들을 공유하고 열람하여 요리의 진입장벽 저하
### ✌식자재 커뮤니티를 통해 남는 식자재, 혼자 구매하기엔 많고 비싼 음식등의 고민해결
<br/><br/>

## 메인
![main](https://user-images.githubusercontent.com/55526071/177815708-4e97dc1f-6572-47ce-a339-122139b7e7d6.png)
<br/>

## 레시피 목록
![recipes](https://user-images.githubusercontent.com/55526071/177815812-0f73f43a-02cd-4c23-bf93-2ef60815daa2.png)
<br/>

## 레시피 열람
![recipe](https://user-images.githubusercontent.com/55526071/177815883-b4c6444c-7ab6-427d-957d-c573da89daaf.png)
<br/>

## 레시피 작성
![create](https://user-images.githubusercontent.com/55526071/177815959-93104364-eb61-4ef7-9a52-6daaf44b0374.png)
<br/>

## 커뮤니티
![community](https://user-images.githubusercontent.com/55526071/177816012-80de03f9-cae8-4f50-9323-31d315b6442b.png)
<br/>

---
## RESTful API 컨트롤러(정렬방식 및 키워드 기준 레시피 목록 조회)
``` java
    @GetMapping("/hamukja/recipe")
    public RecipeDtoList searchRecipe(@RequestParam("sortingRule") String sortingRule, @RequestParam("keyword") String keyword,
                                      @RequestParam("slice") Long slice) {
        RecipeSearchCondition recipeSearchCondition = new RecipeSearchCondition(sortingRule, keyword, slice);
        List<Recipe> recipes = recipeService.findBySearchCondition(recipeSearchCondition);

        Long size = recipeService.count(recipeSearchCondition);
        return new RecipeDtoList(recipes.stream().map(RecipeDTO::new).collect(Collectors.toList()), (slice + 1) * 5 < size);
    }
```
<br/>

## 사용된 프레임워크 및 라이브러리
* SERVER : Spring Boot(Spring Boot Web, Junit, lombok)
* CLIENT : React(Axios, Redux, React bootstrap, react-router-dom)
* DBMS : H2
* JPQL BUILDER : Query DSL
