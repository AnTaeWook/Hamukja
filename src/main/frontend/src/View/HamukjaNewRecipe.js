import './HamukjaNewRecipe.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import RecipeStep from '../Components/RecipeStep';
import addIcon from '../addIcon.PNG';
import minusIcon from '../minusIcon.png';
import { useEffect, useCallback, useState } from 'react';
import imageIcon from '../imageIcon.PNG';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';



function HamukjaNewRecipe(){

    const memberId = useSelector((state) => state.member.id);

    const navigate = useNavigate();
    const gotoHome = useCallback(() => navigate('/', {replace: true}), [navigate]);

    const [thumbnailIn, setThumbnailIn] = useState(null);
    const [stepImages, setStepImages] = useState([null, null, null, null, null]);
    let [recipeSteps, setRecipeSteps] = useState([1, 2, 3, 4, 5]);
    let [head, setHead] = useState(1);

    useEffect(() => {
        for(let i=2; i<6; i++){
            let t = '.step' + i
            document.querySelector(t).style.display = 'none';
        }
    }, []);

    useEffect(() => {
        if(thumbnailIn != null){
            const imgEl = document.querySelector('.thumbnail-input-image');
            const reader = new FileReader();
            reader.onload = () => {
                imgEl.style.backgroundImage = `url(${reader.result})`;
            }
            reader.readAsDataURL(thumbnailIn);
        }
        else{
            const imgEl = document.querySelector('.thumbnail-input-image');
            imgEl.style.backgroundImage = 'none';
        }
    }, [thumbnailIn]);

    useEffect(() => {
        for(let i=0; i<5; i++){
            if(stepImages[i] != null){
                const imgEl = document.querySelector('.image-step-' + (i + 1));
                const reader = new FileReader();
                reader.onload = () => {
                    imgEl.style.backgroundImage = `url(${reader.result})`;
                }
                reader.readAsDataURL(stepImages[i]);
            }
            else{
                const imgEl = document.querySelector('.image-step-' + (i + 1));
                imgEl.style.backgroundImage = 'none';
            }
        }
    }, [stepImages]);

    function addStep() {
        if (head < 5) {
            let tempForHead = head + 1;
            setHead(tempForHead);
            let t = '.step' + tempForHead;
            document.querySelector(t).style.display = '';
        }
    };

    function minusStep() {
        if (head > 1) {
            let t = '.step' + head
            document.querySelector(t + ' .recipe-input-text').value = '';
            document.querySelector(t).style.display = 'none';
            let tempForHead = head - 1;
            setHead(tempForHead);
        }
    }

    function dropThumbnail(e) {
        e.preventDefault();
        setThumbnailIn(e.dataTransfer.files[0]);
    }

    function getThumbnail(e) {
        setThumbnailIn(e.target.files[0]);
    }

    function dropStepImage(e) {
        e.preventDefault();
        let temp = _.cloneDeep(stepImages);
        temp[Number(e.target.id) - 1] = e.dataTransfer.files[0];
        setStepImages(temp);
    }

    function getStepImage(e) {
        let temp = _.cloneDeep(stepImages);
        temp[Number(e.target.id[0]) - 1] = e.target.files[0];
        setStepImages(temp);
    }

    function sendRecipe() {
        if((memberId == '') && (document.querySelector('.email-input-text').value == '')){
            window.alert('로그인 또는 이메일을 작성해 주세요!');
            return;
        }
        if(document.querySelector('.title-input-text').value == ''){
            window.alert('제목을 작성해 주세요!');
            return;
        }
        let fd = new FormData();
        fd.append('title', document.querySelector('.title-input-text').value);
        fd.append('desc', document.querySelector('.desc-input-text').value);
        fd.append('memberId', memberId);
        fd.append('email', document.querySelector('.email-input-text').value);
        fd.append('thumbnail', thumbnailIn);
        
        for(let i=0; i<head; i++){
            if(document.querySelector('.step' + (i + 1) + ' .recipe-input-text').value == ''){
                window.alert('레시피 내용을 작성해 주세요!');
                return;
            }
            fd.append('stepArticles', document.querySelector('.step' + (i + 1) + ' .recipe-input-text').value);
            if(stepImages[i] != null){
                fd.append('stepImagesLabels', i + 1);
                fd.append('stepImages', stepImages[i]);
            }
        }
        
        axios({
            method: "post",
            url: "/hamukja/recipe/new",
            data: fd,
        }).then(response => {
            window.alert('레시피가 등록되었습니다!');
            gotoHome();
        }).catch(() => {
            window.alert('서버의 문제로 레시피를 등록하지 못했습니다..');
        })
    }

    return(
        <div className='HamukjaNewRecipe'>
            <Container>
                <h1 className='page-header'>
                    레시피 작성
                </h1>
                <Row className='title-input'>
                    <div className='title-input-head'>
                        레시피 제목을 입력하세요
                    </div>
                    <div>
                        <input type="text" size={50} className='title-input-text'></input>
                    </div>
                </Row>
                <Row className='desc-input'>
                    <div className='desc-input-head'>
                        요리의 간락한 설명을 입력하세요
                    </div>
                    <div>
                        <input type="text" size={50} className='desc-input-text'></input>
                    </div>
                </Row>
                <Row className='email-input'>
                    <div className='email-input-head'>
                        이메일을 입력하세요&#40;비회원&#41;
                    </div>
                    <div>
                        <input type="text" size={50} className='email-input-text'></input>
                    </div>
                </Row>
                <Row className='thumbnail-input'>
                    <div className='thumbnail-input-head'>
                        썸네일을 등록하세요
                    </div>
                    <Col xs={3}>
                        <input type="file" id="thumbnail-input-fileSearch" style={{ display: "none" }} accept='img/*' onChange={getThumbnail}></input>
                        <label className='thumbnail-input-label' htmlFor='thumbnail-input-fileSearch'>
                            <div className='thumbnail-input-image' onDrop={dropThumbnail} onDragOver={(e) => {
                                e.preventDefault();
                            }}>
                                {
                                    thumbnailIn ?
                                        <div>　</div>
                                        :
                                        <>
                                            <img src={imageIcon} width="20%" className='image-icon'></img>
                                            <br />사진을 드래그하세요
                                        </>
                                }
                            </div>
                        </label>
                    </Col>
                </Row>
                <Row>
                    <div className='recipe-input-head'>
                        레시피를 작성하세요
                    </div>
                </Row>

                {
                    recipeSteps.map((item, index) => {
                        return <RecipeStep step={item} key={index} getStepImage={getStepImage} dropStepImage={dropStepImage} stepImages={stepImages}/>
                    })
                }

                <Row>
                    <div className='add-recipe-step'>
                        <img src={minusIcon} width='7%' onClick={minusStep} className='minus-icon'></img>
                        <img src={addIcon} width='7%' onClick={addStep} className='add-icon'></img>
                    </div>
                </Row>
                <div className='submit-btn'>
                    <Button variant="primary" size="lg" onClick={sendRecipe}>
                        작성 완료
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default HamukjaNewRecipe;