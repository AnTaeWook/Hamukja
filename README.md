# 👨‍🍳레시피 공유 웹 어플리케이션 해먹자👩‍🍳
<br/><br/>

### ☝5단계 이하의 레시피들을 공유하고 열람하여 요리의 진입장벽 저하
### ✌식자재 커뮤니티를 통해 남는 식자재, 혼자 구매하기엔 많고 비싼 음식등의 고민해결
<br/><br/>

## 메인
![main](https://user-images.githubusercontent.com/55526071/199666396-51c04926-1300-4de4-9613-f1f37822ec7f.PNG)
<br/>

## 레시피 목록
![recipeList](https://user-images.githubusercontent.com/55526071/199666428-dfedf6cb-e5f8-41fc-ad51-e9e3aba3fc8d.PNG)
<br/>

## 레시피 작성
![make](https://user-images.githubusercontent.com/55526071/199666449-6d674343-2621-49e8-8ac5-b2a4c55bc507.PNG)
<br/>

## 커뮤니티
![comm](https://user-images.githubusercontent.com/55526071/199666454-e8e375b9-2188-4196-9c24-20358da4f6f6.PNG)
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
