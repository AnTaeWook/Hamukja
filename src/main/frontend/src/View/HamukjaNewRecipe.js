import './HamukjaNewRecipe.css';
import {Container, Row, Col} from "react-bootstrap";

/**
 * HamukjaHome
 * 새 레시피 작성 페이지
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaNewRecipe(){
    return(
        <div className='HamukjaNewRecipe'>
            <Container>
                <Row className='title-input'>
                    <div className='title-input-head'>
                        레시피 제목을 입력하세요
                    </div>
                    <div>
                        <input type="text" size={50} className='title-input-text'></input>
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
            </Container>
        </div>
    )
}

export default HamukjaNewRecipe;