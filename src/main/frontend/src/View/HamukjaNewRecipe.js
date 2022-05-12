import './HamukjaNewRecipe.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import { useState } from 'react';
import RecipeStep from '../Component/RecipeStep';
import addIcon from '../addIcon.PNG';
import minusIcon from '../minusIcon.png';
import { useEffect } from 'react';

/**
 * HamukjaNewRecipe
 * 새 레시피 작성 페이지
 * 
 * -state-
 * recipeSteps : 레시피 단계 작성을 위한 변수
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaNewRecipe(){

    let [recipeSteps, setRecipeSteps] = useState([1, 2, 3, 4, 5]);
    let head = 1;

    useEffect(() => {
        for(let i=2; i<6; i++){
            let t = '.step' + i
            document.querySelector(t).style.display = 'none';
        }
    }, []);

    function addStep() {
        if (head < 5) {
            head += 1;
            let t = '.step' + head
            document.querySelector(t).style.display = '';
        }
    };

    function minusStep() {
        if (head > 1) {
            let t = '.step' + head
            document.querySelector(t).style.display = 'none';
            head -= 1;
        }
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
                <Row>
                    <div className='recipe-input-head'>
                        레시피를 작성하세요
                    </div>
                </Row>

                {
                    recipeSteps.map((item, index) => {
                        return <RecipeStep step={item} key={index}/>
                    })
                }

                <Row>
                    <div className='add-recipe-step'>
                        <img src={minusIcon} width='7%' onClick={minusStep} className='minus-icon'></img>
                        <img src={addIcon} width='7%' onClick={addStep} className='add-icon'></img>
                    </div>
                </Row>
                <div className='submit-btn'>
                    <Button variant="primary" size="lg">
                        작성 완료
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default HamukjaNewRecipe;