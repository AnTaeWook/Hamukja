import {Row, Col} from "react-bootstrap";
import imageIcon from '../imageIcon.PNG';

/**
 * RecipeStep
 * 레시피 작성 시 단계 컴포넌트
 * 각 단계 별 이미지 미리보기 구현(2.0)
 * 
 * @author 태욱
 * @version 2.0
 */
function RecipeStep(props) {

    return (
        <Row className={'step' + props.step}>
            <Col xs={3}>
                <input type="file" id={props.step} style={{ display: "none" }} accept='img/*' onChange={props.getStepImage}></input>
                <label className='stepImage-input-label' htmlFor={props.step}>
                    <div className={'recipe-input-image image-step-' + props.step} id={props.step + "."} onDrop={props.dropStepImage} onDragOver={(e) => {
                        e.preventDefault();
                    }}>
                        {
                            props.stepImages[props.step - 1] ?
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
            <Col>
                <textarea rows="6" cols="80" className='recipe-input-text'></textarea>
            </Col>
        </Row>
    );
}

export default RecipeStep;