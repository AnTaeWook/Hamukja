import { Row, Col } from "react-bootstrap";

/**
 * Recipe
 * 레시피 컴포넌트
 * 
 * @author 태욱
 * @version 1.0
 */
function Recipe(props){

    let imgSrc = "/hamukja/thumbnail/" + props.item["id"];

    return(
        <Row className='page-contents'>
            <Col xs='4' className='recipe-image-col'>
                <div className="recipe-thumbnail-image" style={{"backgroundImage" : `url(${imgSrc})`}}></div>
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