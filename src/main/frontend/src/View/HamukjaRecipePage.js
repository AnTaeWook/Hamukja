import './HamukjaRecipePage.css';
import RecipePageStep from '../Components/RecipePageStep';
import CheckDeleteModal from '../Modal/CheckDeleteModal';
import CheckUpdateModal from '../Modal/CheckUpdateModal';
import axios from 'axios';
import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
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
    const [isHost, setIsHost] = useState(false);

    const [checkDeleteModalOpen, setCheckDeleteModalOpen] = useState(false);
    const [checkUpdateModalOpen, setCheckUpdateModalOpen] = useState(false);

    const [isRecommended, setIsRecommended] = useState(false);
    const [recommendations, setRecommendations] = useState(0);

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

    function onRecommend(){
        if(!memberId){
            window.alert('로그인 후 이용하실 수 있습니다');
            return
        }
        if(isRecommended){
            setIsRecommended(false);
            window.alert('레시피 추천을 취소하였습니다');
        }
        else{
            setIsRecommended(true);
            window.alert('레시피를 추천하였습니다');
        }
        sendRecommendation();
    }

    function sendRecommendation(){
        let fd = new FormData()
        fd.append('memberId', memberId);
        fd.append('recipeId', props.recipeNumber);
        fd.append('isRecommend', !isRecommended);
        axios({
            method: "post",
            url: "/hamukja/recipe/recommend",
            data: fd,
        }).then(res => {
            setRecommendations(res.data);
        }).catch(() => {
            console.log('서버의 문제로 추천 전송을 실패했습니다');
        })
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.recommned-btn-container').style.display = 'inline';
        }, 100);
        axios({
            method: "get",
            url: "/hamukja/recipe/" + props.recipeNumber,
        }).then(res => {
            setRecipeTitle(res.data['title']);
            setRecipeArticles(res.data['articles']);
            setRecipeImages(res.data['imagePaths']);
            setRecommendations(res.data['recommendations']);
            if(memberId === res.data['memberId'] || memberId === 'admin'){
                setIsHost(true);
            }
        }).catch(() => {
            console.log('error for get recipePage!');
        })

        if(memberId){
            let fd = new FormData();
            fd.append('memberId', memberId);
            fd.append('recipeId', props.recipeNumber);
            axios({
                method: "post",
                url: "/hamukja/recipe/recommended",
                data: fd,
            }).then(res => {
                setIsRecommended(res.data);
            }).catch(() => {
                console.log('서버의 문제로 추천 여부를 불러오지 못했습니다')
            })
        }
    }, []);

    useEffect(() => {
        if(isRecommended){
            document.querySelector('.recommend-btn').style.background = '#8FD1FD';
        }
        else{
            document.querySelector('.recommend-btn').style.background = '#e8e8e8';
        }
    }, [isRecommended]);

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
                    <button className='recommend-btn-border' onClick={onRecommend}>
                        <span className="recommend-btn"> 추천<br/>👍{recommendations}
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