# 👨‍🍳레시피 공유 웹 어플리케이션 해먹자👩‍🍳


### ☝5단계 이하의 레시피들을 공유하고 열람하여 요리의 진입장벽 저하
### ✌식자재 커뮤니티를 통해 남는 식자재, 혼자 구매하기엔 많고 비싼 음식등의 고민해결


## 메인
![main](https://user-images.githubusercontent.com/55526071/177815708-4e97dc1f-6572-47ce-a339-122139b7e7d6.png)

## 레시피 목록
![recipes](https://user-images.githubusercontent.com/55526071/177815812-0f73f43a-02cd-4c23-bf93-2ef60815daa2.png)

## 레시피 열람
![recipe](https://user-images.githubusercontent.com/55526071/177815883-b4c6444c-7ab6-427d-957d-c573da89daaf.png)

## 레시피 작성
![create](https://user-images.githubusercontent.com/55526071/177815959-93104364-eb61-4ef7-9a52-6daaf44b0374.png)

## 커뮤니티
![community](https://user-images.githubusercontent.com/55526071/177816012-80de03f9-cae8-4f50-9323-31d315b6442b.png)

---
## RESTful API 컨트롤러(정렬방식 별 레시피 목록 조회)
```java
@GetMapping("/hamukja/recipes/order-by-time")
    public List<RecipeDTO> recipeDTOListByTime(){
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

    @GetMapping("/hamukja/recipes/order-by-recommend")
    public List<RecipeDTO> recipeDTOListByRecommend(){
        List<Recipe> recipes = recipeService.findByRecommend();
        if(recipes.size() <= 0){
            return null;
        }
        List<RecipeDTO> recipeDTOS = new ArrayList<>();
        for(Recipe r : recipes){
            recipeDTOS.add(RecipeDTO.create(r.getId(), r.getTitle(), r.getDesc(), r.getThumbnailPath()));
        }
        return recipeDTOS;
    }
```
## 사용된 프레임워크 및 라이브러리
* SERVER : Spring Boot(Spring Boot Web, Junit, lombok)
* CLIENT : React(Axios, Redux, React bootstrap, react-router-dom)
* DBMS : H2

## 다음번 develop에서 main으로 머지될 때 추가될 내용
* JWT를 이용한 회원관리
* 커뮤니티 서비스 완성
* elastic search를 이용한 레시피 조회 및 저장


