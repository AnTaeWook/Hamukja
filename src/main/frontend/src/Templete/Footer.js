import './Footer.css';
import {Container, Row, Col} from "react-bootstrap";



function Footer() {
    return (
        <Container className='footer'>
            <Row>
                <Col xs='9'>
                    <a rel='noreferrer' href='https://github.com/AnTaeWook/Hamukja' target='_blank' className='footer-item'>github&emsp;</a>
                    <a rel='noreferrer' href='mailto:antk7894@naver.com' target='_blank' className='footer-item'>email</a>
                </Col>
                <Col xs='3' className='university'>
                    <b>Soongsil University</b>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;