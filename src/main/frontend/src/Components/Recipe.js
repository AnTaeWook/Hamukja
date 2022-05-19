import { Row, Col } from "react-bootstrap";
import { useEffect } from 'react';

/**
 * Recipe
 * 레시피 컴포넌트
 * 클릭 시 각 레시피 페이지로 이동(2.0)
 * 
 * @author 태욱
 * @version 2.0
 */
function Recipe(props){

    let imgSrc = "/hamukja/thumbnail/" + props.item["id"];

    return(
        <Row className='page-contents' onClick={() => {
            props.setRecipeNumber(props.item["id"]);
            props.openRecipePage();
        }}>
            <Col xs='4' className='recipe-image-col'>
                <div className="recipe-thumbnail-image" style={{"backgroundImage" : `url(${imgSrc})`}}></div>
            </Col>
            <Col xs='8' className='recipe-description'>
                <h1>{props.item["title"]}</h1>
                <br /><p>
                    {props.item["desc"]}
                </p>
            </Col>
        </Row>
    )
}

export default Recipe;