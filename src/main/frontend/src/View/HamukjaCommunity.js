import './HamukjaCommunity.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import Community from '../Components/Community';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';


function HamukjaCommunity(props) {

    let [communityItems, setCommunityItems] = useState([
        // {"id": 2, "class" : "교환", "title" : "분당 고구마(5개)랑 교환 하실분 [사진있음]", "region" : "성남시 분당구"},
        // {"id": 3, "class" : "나눔", "title" : "방울 토마토랑 귤 가져가실분 (귤 많아요)", "region" : "서울시 구로구"},
        // {"id": 4, "class" : "공동구매", "title" : "샤인 머스켓 나눠 사실분 계신가요", "region" : "서울시 영등포구"}
    ])

    const [postClass, setPostClass] = useState("");
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [postSwitch, setPostSwitch] = useState(false);



    const memberId = useSelector((state) => state.member.id);

    const navigate = useNavigate();
    const gotoNewPost = useCallback(() => navigate('/newpost', {replace: true}), [navigate]);
    const gotoPost = useCallback(() => navigate('/post', {replace: true}), [navigate]);

    function createNewPost(){
        if(memberId){
            gotoNewPost();
        }
        else{
            window.alert('로그인 상태에서 게시글을 작성해 주세요');
        }
    }

    function readPost() {
        gotoPost();
    }

    function search() {
        setPostClass(document.querySelector('.posts-sort').value);
        setKeyword(document.querySelector('.search-area').value);
        setCurrentPage(0);
        setPostSwitch(!postSwitch);
    }

    function getNextPage() {
        setCurrentPage(currentPage + 1);
        setPostSwitch(!postSwitch);
    }

    function getPreviousPage() {
        setCurrentPage(currentPage - 1);
        setPostSwitch(!postSwitch);
    }
 
    useEffect(() => {
        document.querySelector('.left-page-btn').disabled = !(currentPage > 0);
    }, [currentPage]);

    useEffect(() => {
        document.querySelector('.right-page-btn').disabled = !hasMore;
    }, [hasMore]);

    useEffect(() => {
        const params = {
            "postClass": postClass,
            "keyword": keyword,
            "page": currentPage
        }

        axios.get('/hamukja/post', {params}
        )
        .then(res => {
            let postMetas = [];
            for(let i=0; i<res.data.postDtoList.length; i++){
                let postClass = "";
                if (res.data.postDtoList[i].postClass === "exchange") {
                    postClass = "교환";
                } else if(res.data.postDtoList[i].postClass === "share") {
                    postClass = "나눔";
                } else {
                    postClass = "공동구매";
                }
                let postMeta = {
                    "id": res.data.postDtoList[i].id,
                    "title": res.data.postDtoList[i].title,
                    "class": postClass,
                    "region": res.data.postDtoList[i].region,
                }
                postMetas.push(postMeta);
            }
            setCommunityItems(postMetas);
            setHasMore(res.data.hasMore);
        }).catch(() => {
            window.alert('서버 문제로 게시글들을 가져오지 못했습니다');
        })
    }, [postSwitch]);

    return (
        <Container className='HamukjaCommunity'>
            <h1 className='page-header'>
                해먹자 커뮤니티
            </h1>
            <Row>
                <Col xs='8'>
                    <select name="sorting-rool" className='posts-sort' onChange={search}>
                        <option value="" defaultValue>전체</option>
                        <option value="exchange">교환</option>
                        <option value="share">나눔</option>
                        <option value="groupBuying">공동구매</option>
                    </select>
                    <Button variant="success" className='post-creation-btn' onClick={createNewPost} size='lg'>글 쓰기</Button>
                </Col>
                <Col>
                    <span className='search-area-col'>
                        <input type="text" className='search-area' placeholder=' 제목 및 지역 검색'/>
                    </span>
                    <button className='post-search-btn' onClick={search}>🔍</button>
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
                    return <Community key={index} item={item} setPostNumber={props.setPostNumber} gotoPost={readPost}/>
                })
            }

            <Row>
                <Col xs={5}>
                </Col>
                <Col className='page-btn-area'>
                    <Button variant="success" className='left-page-btn' onClick={getPreviousPage}>◀</Button>
                    &nbsp;&nbsp;{currentPage + 1}&nbsp;&nbsp;
                    <Button variant="success" className='right-page-btn' onClick={getNextPage}>▶</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HamukjaCommunity;