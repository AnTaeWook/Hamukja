import { Row, Col } from "react-bootstrap";

/**
 * Recipe
 * 레시피 컴포넌트
 * 
 * @author 태욱
 * @version 1.0
 */
function Community(props) {
    return (
        <Row className='post-contents'>
            <Row>
                <Col xs='1' className='post-thema'>
                    {props.item["class"]}
                </Col>
                <Col xs='9' className='post-title'>
                    {props.item["title"]}
                </Col>
                <Col className='post-area'>
                    {props.item["region"]}
                </Col>
            </Row>
        </Row>
    )
}

export default Community;