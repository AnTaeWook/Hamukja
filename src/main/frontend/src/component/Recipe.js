import { Row, Col } from "react-bootstrap";

/**
 * Recipe
 * 레시피 컴포넌트
 * 
 * @author 태욱
 * @version 1.0
 */
function Recipe(props){
    return(
        <Row className='page-contents'>
            <Col xs='4' className='recipe-image-col'>
                <img className='recipe-image' src={props.item["thumbnail"]} width="90%" />
            </Col>
            <Col xs='8' className='recipe-description'>
                <h2>{props.item["title"]}</h2>
                <br /><p>
                    {props.item["desc"]}
                </p>
            </Col>
        </Row>
    )
}

export default Recipe;