# ๐จโ๐ณ๋ ์ํผ ๊ณต์  ์น ์ดํ๋ฆฌ์ผ์ด์ ํด๋จน์๐ฉโ๐ณ
<br/><br/>

### โ5๋จ๊ณ ์ดํ์ ๋ ์ํผ๋ค์ ๊ณต์ ํ๊ณ  ์ด๋ํ์ฌ ์๋ฆฌ์ ์ง์์ฅ๋ฒฝ ์ ํ
### โ์์์ฌ ์ปค๋ฎค๋ํฐ๋ฅผ ํตํด ๋จ๋ ์์์ฌ, ํผ์ ๊ตฌ๋งคํ๊ธฐ์ ๋ง๊ณ  ๋น์ผ ์์๋ฑ์ ๊ณ ๋ฏผํด๊ฒฐ
<br/><br/>

## ๋ฉ์ธ
![main](https://user-images.githubusercontent.com/55526071/177815708-4e97dc1f-6572-47ce-a339-122139b7e7d6.png)
<br/>

## ๋ ์ํผ ๋ชฉ๋ก
![recipes](https://user-images.githubusercontent.com/55526071/177815812-0f73f43a-02cd-4c23-bf93-2ef60815daa2.png)
<br/>

## ๋ ์ํผ ์ด๋
![recipe](https://user-images.githubusercontent.com/55526071/177815883-b4c6444c-7ab6-427d-957d-c573da89daaf.png)
<br/>

## ๋ ์ํผ ์์ฑ
![create](https://user-images.githubusercontent.com/55526071/177815959-93104364-eb61-4ef7-9a52-6daaf44b0374.png)
<br/>

## ์ปค๋ฎค๋ํฐ
![community](https://user-images.githubusercontent.com/55526071/177816012-80de03f9-cae8-4f50-9323-31d315b6442b.png)
<br/>

---
## RESTful API ์ปจํธ๋กค๋ฌ(์ ๋ ฌ๋ฐฉ์ ๋ณ ๋ ์ํผ ๋ชฉ๋ก ์กฐํ)
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
<br/>

## ์ฌ์ฉ๋ ํ๋ ์์ํฌ ๋ฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
* SERVER : Spring Boot(Spring Boot Web, Junit, lombok)
* CLIENT : React(Axios, Redux, React bootstrap, react-router-dom)
* DBMS : H2

<br/>

## ๋ค์ ๋ฒ develop์์ main์ผ๋ก ๋จธ์ง๋  ๋ ์ถ๊ฐ๋  ๋ด์ฉ
* JWT๋ฅผ ์ด์ฉํ ํ์๊ด๋ฆฌ
* ์ปค๋ฎค๋ํฐ ์๋น์ค ์์ฑ
* elastic search๋ฅผ ์ด์ฉํ ๋ ์ํผ ์กฐํ ๋ฐ ์ ์ฅ
