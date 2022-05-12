import './HamukjaRecipe.css';
import {Container, Row, Col} from "react-bootstrap";
import Recipe from '../component/Recipe';
import { useState } from 'react';
import foodExample from '../foodExample.jpg';
import foodExample2 from '../foodExample2.jpg';
import foodExample3 from '../foodExample3.jpg';
import {useNavigate} from 'react-router-dom';
import React, { useCallback } from 'react';

/**
 * HamukjaRecipe
 * 레시피 조회 페이지
 * 레시피 컴포넌트 별 매핑 적용(2.0)
 * 
 * -state-
 * recipeItems : 레시피의 썸네일과 제목, 간략한 설명 등의 정보
 * 
 * @author 태욱
 * @version 3.0
 */
function HamukjaRecipe() {

    let [recipeItems, setRecipeItems] = useState([
        {"thumbnail" : foodExample, "title" : "초간단 샐러드", "desc" : "상추와 당근, 토마토만 있다면 누구나 만들 수 있는 샐러드"},
        {"thumbnail" : foodExample2, "title" : "파 계란 볶음밥", "desc" : "파와 계란을 살짝 볶아서 만드는 볶음밥"},
        {"thumbnail" : foodExample3, "title" : "계란 비빔면", "desc" : "삶은 계란과 남는 야채들을 넣어서 비비면 끝"}
    ]);

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
                    return <Recipe item={item}/>
                })
            }

        </Container>
    )
}

export default HamukjaRecipe;