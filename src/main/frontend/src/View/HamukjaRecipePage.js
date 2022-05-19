import './HamukjaRecipePage.css';
import RecipePageStep from '../Components/RecipePageStep';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * HamukjaRecipePage
 * 레시피 항목 페이지
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaRecipePage(props){

    const navigate = useNavigate();
    const gotoRecipes = useCallback(() => navigate('/recipes', {replace: true}), [navigate]);

    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeArticles, setRecipeArticles] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "/hamukja/recipe/" + props.recipeNumber,
        }).then(res => {
            setRecipeTitle(res.data['title']);
            setRecipeArticles(res.data['articles']);
        }).catch(() => {
            console.log('error!');
        })
    }, []);

    return(
        <Container className='HamukjaRecipePage'>
            <h1 className='page-header'>
                {recipeTitle}
            </h1>
            <Row>
                <Col className='back-btn-area'>
                    <button className='back-btn' onClick={gotoRecipes}>목록으로 돌아가기</button>
                </Col> 
            </Row>
            {
                recipeArticles.map((item, index) => {
                    return <RecipePageStep key={index} step={index} 
                    item={item} recipeNumber={props.recipeNumber}/>
                })
            }
        </Container>
    )
}

export default HamukjaRecipePage;