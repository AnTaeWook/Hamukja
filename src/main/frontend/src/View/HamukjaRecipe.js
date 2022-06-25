import './HamukjaRecipe.css';
import {Container, Row, Col } from "react-bootstrap";
import Recipe from '../Components/Recipe';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';



function HamukjaRecipe(props) {

    const memberId = useSelector((state) => state.member.id);

    let [recipeItems, setRecipeItems] = useState([
        {"id" : 1, "title" : "초간단 샐러드", "desc" : "상추와 당근, 토마토만 있다면 누구나 만들 수 있는 샐러드", "thumbnail" : "https://www.foo.com/bar123"}
    ]);

    useEffect(() => {
        axios({
            method: "get",
            url: "/hamukja/recipes",
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
            window.alert('서버 문제로 레시피들을 가져오지 못했습니다.');
        })
    }, []);

    const navigate = useNavigate();
    const gotoNewRecipe = useCallback(() => navigate('/newrecipe', {replace: true}), [navigate]);
    const gotoRecipePage = useCallback(() => navigate('/recipe-page', {replace: true}), [navigate]);

    function createNewRecipe(){
        if(memberId != ''){
            gotoNewRecipe();
        }
        else{
            gotoNewRecipe();
            window.alert('로그인 상태에서 레시피를 작성해 주세요!');
        }
    }

    function openRecipePage(){
        gotoRecipePage();
    }

    return (
        <Container className='HamukjaRecipe'>
            <h1 className='page-header'>
                해먹자 레시피
            </h1>
            <Row>
                <Col>
                <select name="sorting-rool" className='recipes-sort'>
                    <option value="1" defaultValue>추천 순</option>
                    <option value="2">최신 순</option>
                </select>
                </Col>
                <Col className='recipe-creation-btn-area'>
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