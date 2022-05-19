import './HamukjaRecipe.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import Recipe from '../Component/Recipe';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * HamukjaRecipe
 * 레시피 조회 페이지
 * 레시피 컴포넌트 별 매핑 적용(2.0)
 * 서버로부터 레시피들의 메타데이터 수집 후 렌더링(3.0)
 * 
 * -state-
 * recipeItems : 레시피의 썸네일과 제목, 간략한 설명 등의 정보
 * 
 * @author 태욱
 * @version 3.0
 */
function HamukjaRecipe() {

    let [recipeItems, setRecipeItems] = useState([
        // {"id" : 1, "title" : "초간단 샐러드", "desc" : "상추와 당근, 토마토만 있다면 누구나 만들 수 있는 샐러드"}
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
                    "desc": res.data[i].desc
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
                    <button className='recipe-creation-btn' onClick={gotoNewRecipe}>새 레시피 작성</button>
                </Col> 
            </Row>
            {
                recipeItems.map((item, index) => {
                    return <Recipe key={index} item={item}/>
                })
            }
        </Container>
    )
}

export default HamukjaRecipe;