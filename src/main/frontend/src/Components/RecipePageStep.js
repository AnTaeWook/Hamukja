import { Row, Col } from "react-bootstrap";
import { useEffect } from 'react';



function RecipePageStep(props){

    let imgSrc = props.recipeImages[props.step];

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