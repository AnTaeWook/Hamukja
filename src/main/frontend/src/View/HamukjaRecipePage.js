import './HamukjaRecipePage.css';
import RecipePageStep from '../Components/RecipePageStep';
import CheckDeleteModal from '../Modal/CheckDeleteModal';
import CheckUpdateModal from '../Modal/CheckUpdateModal';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';



function HamukjaRecipePage(props){

    const memberId = useSelector((state) => state.member.id);
    const navigate = useNavigate();
    const gotoRecipes = useCallback(() => navigate('/recipes', {replace: true}), [navigate]);

    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeArticles, setRecipeArticles] = useState([]);
    const [recipeImages, setRecipeImages] = useState([]);
    const [isHost, setIsHost] = useState(true);

    const [checkDeleteModalOpen, setCheckDeleteModalOpen] = useState(false);
    const [checkUpdateModalOpen, setCheckUpdateModalOpen] = useState(false);

    function openCheckDeleteModal(){
        setCheckDeleteModalOpen(true);
    };
    function closeCheckDeleteModal(){
        setCheckDeleteModalOpen(false);
    };

    function openCheckUpdateModal(){
        setCheckUpdateModalOpen(true);
    };
    function closeCheckUpdateModal(){
        setCheckUpdateModalOpen(false);
    };
    function deleteFunc(){
        openCheckDeleteModal();
    };
    function updateFunc(){
        openCheckUpdateModal();
    };

    function recommendation(){
        window.alert('레시피를 추천하였습니다');
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "/hamukja/recipe/" + props.recipeNumber,
        }).then(res => {
            setRecipeTitle(res.data['title']);
            setRecipeArticles(res.data['articles']);
            setRecipeImages(res.data['imagePaths']);
            if(memberId === res.data['memberId'] || memberId === 'admin'){
                setIsHost(true);
            }
        }).catch(() => {
            console.log('error for get recipePage!');
        })
    }, []);
    
    return(
        <Container className='HamukjaRecipePage'>
            <h1 className='page-header'>
                {recipeTitle}
            </h1>
            <Row>
                <Col xs={7}></Col>
                {
                    isHost ?
                        <>
                            <Col xs={2}>
                                <Button variant="warning" size="lg" className='update-btn' onClick={updateFunc}>수정</Button>
                                <Button variant="danger" size="lg" className='delete-btn' onClick={deleteFunc}>삭제</Button>
                            </Col>
                        </>
                        :
                        <Col xs={2}></Col>
                }
                <Col xs={3}>
                    <button className='back-btn' onClick={gotoRecipes}>목록으로 돌아가기</button>
                </Col>
            </Row>
            {
                recipeArticles.map((item, index) => {
                    return <RecipePageStep key={index} step={index} item={item} recipeImages={recipeImages}/>
                })
            }
            <Row>
                <div className='recommned-btn-container'>
                    <button className='recommend-btn-border' onClick={recommendation}>
                        <span className="recommend-btn"> 추천
                        </span>
                    </button>
                </div>
            </Row>
            
            <React.Fragment>
                <CheckDeleteModal open={checkDeleteModalOpen} close={closeCheckDeleteModal} 
                    recipeId={props.recipeNumber} gotoRecipes={gotoRecipes}/>
                <CheckUpdateModal open={checkUpdateModalOpen} close={closeCheckUpdateModal}/>
            </React.Fragment>
        </Container>
    )
}

export default HamukjaRecipePage;