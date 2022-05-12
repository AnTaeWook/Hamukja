import {Row, Col, Button} from "react-bootstrap";
import imageIcon from '../imageIcon.PNG';

function RecipeStep(props) {

    function deleteStep(){
        
    }

    return (
        <Row className={'step' + props.step}>
            <Col xs={3}>
                <div className='recipe-input-image'>
                    <img src={imageIcon} width="20%" className='image-icon'></img>
                    <br />사진을 드래그하세요
                </div>
            </Col>
            <Col>
                <textarea rows="6" cols="80" className='recipe-input-text'></textarea>
            </Col>
        </Row>
    );
}

export default RecipeStep;