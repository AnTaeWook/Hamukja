import './HamukjaRecipe.css';
import {Container, Row, Col } from "react-bootstrap";
import Recipe from '../Components/Recipe';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { setSortingRool } from '../_Redux/sortSlice';


function HamukjaRecipe(props) {

    const dispatch = useDispatch();
    const memberId = useSelector((state) => state.member.id);
    const sortingRool = useSelector((state) => state.sorting.sortingRool);

    let [recipeItems, setRecipeItems] = useState([
        // {"id" : 1, "title" : "초간단 샐러드", "desc" : "상추와 당근, 토마토만 있다면 누구나 만들 수 있는 샐러드", "thumbnail" : "https://www.foo.com/bar123"}
    ]);

    useEffect(() => {
        document.querySelector('.recipes-sort').value = sortingRool;
        axios({
            method: "get",
            url: "/hamukja/recipes/" + sortingRool,
        }).then(res => {
            let recipeMetas = [];
            for(let i=0; i<res.data.length; i++){
                let recipeMeta = {
                    "id": res.data[i].id,
                    "title": res.data[i].title,
                    "desc": res.data[i].desc,
                    "thumbnail": res.data[i].thumbnailPath,
                }
                recipeMetas.push(recipeMeta);
            }
            setRecipeItems(recipeMetas);
        }).catch(() => {
            window.alert('서버 문제로 레시피들을 가져오지 못했습니다');
        })
    }, []);

    const navigate = useNavigate();
    const gotoNewRecipe = useCallback(() => navigate('/newrecipe', {replace: true}), [navigate]);
    const gotoRecipePage = useCallback(() => navigate('/recipe-page', {replace: true}), [navigate]);

    function createNewRecipe(){
        if(memberId){
            gotoNewRecipe();
        }
        else{
            window.alert('로그인 상태에서 레시피를 작성해 주세요');
        }
    }

    function openRecipePage(){
        gotoRecipePage();
    }

    function getRecipes(e){
        dispatch(setSortingRool(e.target.value));
        axios({
            method: "get",
            url: "/hamukja/recipes/" + e.target.value,
        }).then(res => {
            let recipeMetas = [];
            for(let i=0; i<res.data.length; i++){
                let recipeMeta = {
                    "id": res.data[i].id,
                    "title": res.data[i].title,
                    "desc": res.data[i].desc,
                    "thumbnail": res.data[i].thumbnailPath,
                }
                recipeMetas.push(recipeMeta);
            }
            setRecipeItems(recipeMetas);
        }).catch(() => {
            window.alert('서버 문제로 레시피들을 가져오지 못했습니다');
        })
    }

    function searchRecipe(){
        let keyWord = document.querySelector('.recipe-search-input').value;
        if(!keyWord){
            return;
        }
        axios({
            method: "get",
            url: "/hamukja/recipe-search/" + keyWord,
        }).then(res => {
            let recipeMetas = [];
            for(let i=0; i<res.data.length; i++){
                let recipeMeta = {
                    "id": res.data[i].id,
                    "title": res.data[i].title,
                    "desc": res.data[i].desc,
                    "thumbnail": res.data[i].thumbnailPath,
                }
                recipeMetas.push(recipeMeta);
            }
            setRecipeItems(recipeMetas);
        }).catch(() => {
            window.alert('서버 문제로 레시피들을 가져오지 못했습니다');
        })
    }

    return (
        <Container className='HamukjaRecipe'>
            <h1 className='page-header'>
                해먹자 레시피
            </h1>
            <Row>
                <Col xs={2}>
                <select name="sorting-rool" className='recipes-sort' onChange={getRecipes}>
                    <option value="order-by-time">최신 순</option>
                    <option value="order-by-recommend">추천 순</option>
                </select>
                </Col>
                <Col>
                    <input type="text" placeholder="레시피 검색" className='recipe-search-input'></input>
                    <button className='recipe-search-btn' onClick={searchRecipe}>🔍</button>
                </Col>
                <Col xs={3}>
                    <button className='recipe-creation-btn' onClick={createNewRecipe}>새 레시피 작성</button>
                </Col> 
            </Row>
            {
                recipeItems.map((item, index) => {
                    return <Recipe key={index} item={item} openRecipePage={openRecipePage} setRecipeNumber={props.setRecipeNumber}/>
                })
            }
        </Container>
    )
}

export default HamukjaRecipe;