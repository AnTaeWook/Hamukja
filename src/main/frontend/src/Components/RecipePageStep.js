import { Row, Col } from "react-bootstrap";
import { useEffect } from 'react';

/**
 * RecipePageStep
 * 레시피 페이지의 각 단계 컴포넌트
 *
 * @author 태욱
 * @version 1.0
 */
function RecipePageStep(props){

    let imgSrc = "/hamukja/step-image/" + props.recipeNumber + "/" + props.step;

    return(
        <Row className='page-contents'>
            <Col xs='4' className='recipe-image-col'>
                <div className="recipe-step-image" style={{"backgroundImage" : `url(${imgSrc})`}}></div>
            </Col>
            <Col xs='8' className='recipe-step-article'>
                <br /><p>
                    {props.item}
                </p>
            </Col>
        </Row>
    )
}

export default RecipePageStep;