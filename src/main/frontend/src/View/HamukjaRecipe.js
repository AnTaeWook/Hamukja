import './HamukjaRecipe.css';
import {Container, Row, Col} from "react-bootstrap";
import foodExample from '../foodExample.jpg';
import foodExample2 from '../foodExample2.jpg';
import foodExample3 from '../foodExample3.jpg';

/**
 * HamukjaRecipe
 * 레시피 조회 페이지
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaRecipe() {
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
                    <button className='recipe-creation-btn'>새 레시피 작성</button>
                </Col> 
            </Row>
            
            <Row className='page-contents'>
                <Col xs='4' className='recipe-image-col'>
                    <img className='recipe-image' src={foodExample} width="90%"/>
                </Col>
                <Col xs='8' className='recipe-description'>
                    <h2>초간단 샐러드</h2>
                    <br/><p>
                        상추와 당근, 토마토만 있다면 누구나 만들 수 있는 샐러드
                    </p>
                </Col>
            </Row>

            <Row className='page-contents'>
                <Col xs='4' className='recipe-image-col'>
                    <img className='recipe-image' src={foodExample2} width="90%"/>
                </Col>
                <Col xs='8' className='recipe-description'>
                    <h2>파 계란 볶음밥</h2>
                    <br/><p>
                        파와 계란을 살짝 볶아서 만드는 볶음밥
                    </p>
                </Col>
            </Row>

            <Row className='page-contents'>
                <Col xs='4' className='recipe-image-col'>
                    <img className='recipe-image' src={foodExample3} width="90%"/>
                </Col>
                <Col xs='8' className='recipe-description'>
                    <h2>계란 비빔면</h2>
                    <br/><p>
                        삶은 계란과 남는 야채들을 넣어서 비비면 끝
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default HamukjaRecipe;