import {Container, Row, Col, Button} from "react-bootstrap";
import './HamukjaNewPost.css';

/**
 * HamukjaNewPost
 * 커뮤니티 새 게시글 작성 페이지
 * 
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaNewPost(){
    return(
        <div className='HamukjaNewPost'>
            <Container>
                <h1 className='page-header'>
                    글 작성
                </h1>
                <Row className='title-input'>
                    <div className='title-input-head'>
                        글 제목을 입력하세요
                    </div>
                    <div>
                        <input type="text" size={50} className='title-input-text'></input>
                    </div>
                </Row>
                <Row className='area-input'>
                    <div className='area-input-head'>
                        거주지를 입력하세요
                    </div>
                    <div>
                        <input type="text" size={50} className='area-input-text' placeholder="예) 서울시 양천구"></input>
                    </div>
                </Row>
                <Row className='class-input'>
                    <div className='class-input-head'>
                        글 분류를 선택하세요
                    </div>
                    <div>
                        <select name="post-class" className='class-input-select'>
                            <option value="1" defaultValue>교환</option>
                            <option value="2">나눔</option>
                            <option value="3">공동구매</option>
                        </select>
                    </div>
                </Row>
                <Row>
                    <div className='post-input-head'>
                        글을 작성하세요
                    </div>
                    <Col>
                    <textarea rows="6" cols="100" className='post-input-text'></textarea>
                    </Col>
                </Row>

                <div className='submit-btn'>
                    <Button variant="primary" size="lg">
                        작성 완료
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default HamukjaNewPost;