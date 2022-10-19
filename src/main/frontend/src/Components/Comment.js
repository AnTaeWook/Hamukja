import './Comment.css'
import profileImage from '../unknown.PNG';

import { Container, Row, Col } from 'react-bootstrap';

function Comment(props) {

    return(
        <div className='Comment'>
            <Container>
                <Row>
                    <Col xs={1} className='comment-profile'>
                        <img src={profileImage} width="60%" alt='profile'></img>
                    </Col>
                    <Col className='comment-main-text' xs={7}>
                        {props.item["id"]} &nbsp;|&nbsp;&nbsp;
                        {props.item["contents"]}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Comment;