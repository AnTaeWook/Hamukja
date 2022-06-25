import { Row, Col } from "react-bootstrap";



function Recipe(props){

    let imgSrc = props.item["thumbnail"];

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