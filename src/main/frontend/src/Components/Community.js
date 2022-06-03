import { Row, Col } from "react-bootstrap";



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