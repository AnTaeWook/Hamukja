import './HamukjaCommunity.css';
import {Container, Row, Col, Button} from "react-bootstrap";

/**
 * HamukjaCommunity
 * 식재료 커뮤니티 페이지
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaCommunity() {
    return (
        <Container className='HamukjaCommunity'>
            <h1 className='page-header'>
                해먹자 커뮤니티
            </h1>
            <Row>
                <Col xs='9'>
                    <select name="sorting-rool" className='posts-sort'>
                        <option value="1" defaultValue>전체</option>
                        <option value="2">교환</option>
                        <option value="3">나눔</option>
                        <option value="4">공동구매</option>
                    </select>
                    <Button variant="success" className='post-creation-btn'>글 쓰기</Button>
                </Col>
                <Col>
                    <div className='search-area-col'>
                        <b>지역 검색</b>
                        <input type="text" className='search-area' placeholder=' 예) 서울시 양천구'/>
                    </div>
                </Col>
            </Row>

            <Row className='post-contents-header'>
                <Row>
                    <Col xs='1' className='post-thema'>
                        분류
                    </Col>
                    <Col xs='9' className='post-title'>
                        제목
                    </Col>
                    <Col className='post-area'>
                        지역
                    </Col>
                </Row>
            </Row>

            <Row className='post-contents'>
                <Row>
                    <Col xs='1' className='post-thema'>
                        교환
                    </Col>
                    <Col xs='9' className='post-title'>
                        분당 고구마(5개)랑 교환 하실분 &lt;사진있음&gt;
                    </Col>
                    <Col className='post-area'>
                        성남시 분당구
                    </Col>
                </Row>
            </Row>

            <Row className='post-contents'>
                <Row>
                    <Col xs='1' className='post-thema'>
                        나눔
                    </Col>
                    <Col xs='9' className='post-title'>
                        방울 토마토랑 귤 가져가실분 (귤 많아요)
                    </Col>
                    <Col className='post-area'>
                        서울시 구로구
                    </Col>
                </Row>
            </Row>

            <Row className='post-contents'>
                <Row>
                    <Col xs='1' className='post-thema'>
                        공동구매
                    </Col>
                    <Col xs='9' className='post-title'>
                        샤인 머스켓 나눠 사실분 계신가요
                    </Col>
                    <Col className='post-area'>
                        서울시 영등포구
                    </Col>
                </Row>
            </Row>

        </Container>
    )
}

export default HamukjaCommunity;