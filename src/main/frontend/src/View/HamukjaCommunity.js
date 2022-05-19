import './HamukjaCommunity.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import Community from '../Components/Community';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import React, { useCallback } from 'react';

/**
 * HamukjaCommunity
 * 식재료 커뮤니티 페이지
 * 커뮤니티 컴포넌트 별 매핑 적용(2.0)
 * 
 * -state-
 * communityItems : 커뮤니티 게시글의 분류와 제목, 지역 등의 정보
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaCommunity() {

    let [communityItems, setCommunityItems] = useState([
        {"class" : "교환", "title" : "분당 고구마(5개)랑 교환 하실분 [사진있음]", "region" : "성남시 분당구"},
        {"class" : "나눔", "title" : "방울 토마토랑 귤 가져가실분 (귤 많아요)", "region" : "서울시 구로구"},
        {"class" : "공동구매", "title" : "샤인 머스켓 나눠 사실분 계신가요", "region" : "서울시 영등포구"}
    ])

    const navigate = useNavigate();
    const gotoNewPost = useCallback(() => navigate('/newpost', {replace: true}), [navigate]);

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
                    <Button variant="success" className='post-creation-btn' onClick={gotoNewPost}>글 쓰기</Button>
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

            {
                communityItems.map((item, index) => {
                    return <Community key={index} item={item}/>
                })
            }

        </Container>
    )
}

export default HamukjaCommunity;