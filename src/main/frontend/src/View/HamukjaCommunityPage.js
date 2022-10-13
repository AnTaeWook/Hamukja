import './HamukjaCommunityPage.css';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Comment from '../Components/Comment';


function HamukjaCommunityPage(props) {

    const navigate = useNavigate();
    const gotoCommunity = useCallback(() => navigate('/community', {replace: true}), [navigate]);
    
    const [contents, setContents] = useState({
        // "id": "antk7894", "title": "샤인머스켓 나눠 사실분 계신가요", "class": "공동구매", "region": "서울시 강동구",
        // "article": "샤인머스켓 너무 비싸요\n같이 구매할 사람 있음?"
    });

    const [comments, setComments] = useState([
        // {"id": "antk7894", "contents": "강아지가 너무 귀여워요"},
        // {"id": "user1", "contents": "폼피츠 맞나요??"},
    ]);

    const [isHost, setIsHost] = useState(false);
    const memberId = useSelector((state) => state.member.id);

    const [hasImage, setHasImage] = useState(false);
    const [imagePath, setImagePath] = useState("");

    function postComment() {

        if(!memberId){
            window.alert('로그인 상태에서 댓글을 작성해 주세요');
            return;
        }

        let contents = document.querySelector('.comment-input-text').value;
        const formData = new FormData();
        formData.append("memberId", memberId);
        formData.append("postId", props.postNumber);
        formData.append("contents", contents);

        axios({
            method: "post",
            url: "/hamukja/post/comment",
            data: formData,
        }).then(response => {
            getComments();
        }).catch(() => {
            window.alert('서버의 문제로 댓글을 등록하지 못했습니다');
        })

        document.querySelector('.comment-input-text').value = "";
    }

    function getComments() {
        axios({
            method: "get",
            url: "/hamukja/comment/" + props.postNumber,
        }).then(res => {
            let responses = [];
            for (let i = 0; i < res.data.length; i++) {
                let response = {
                    "id": res.data[i].memberId,
                    "contents": res.data[i].contents
                };
                responses.push(response);
            }
            setComments(responses);
        }).catch((e) => {
            console.log(e);
        })
    }

    function deletePost() {
        axios({
            method: "delete",
            url: "/hamukja/post/" + props.postNumber,
        }).then(res => {
            window.alert("게시글을 삭제하였습니다");
            gotoCommunity();
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "/hamukja/post/" + props.postNumber,
        }).then(res => {
            if (res.data.imagePath.length > 0) {
                setHasImage(true);
                setImagePath(res.data.imagePath);
            }
            if (memberId === res.data.memberId) {
                setIsHost(true);
            }

            let postClass = "";
            if (res.data.postClass === "exchange") {
                postClass = "교환";
            } else if(res.data.postClass === "share") {
                postClass = "나눔";
            } else {
                postClass = "공동구매";
            }

            let postMeta = {
                "id": res.data.memberId,
                "title": res.data.title,
                "class": postClass,
                "region": res.data.region,
                "article": res.data.article,
            }
            setContents(postMeta);
            getComments();
        }).catch(() => {
            window.alert('서버 문제로 게시글을 가져오지 못했습니다');
        })
    }, []);

    return (
        <Container className='HamukjaCommunityPage'>
            <Row className='post-header'>
                <Col xs={7}>
                    <h1>{contents["title"]}</h1>
                </Col>
                <Col className='delete-btn-area'>
                    {
                        isHost ?
                        <Button variant="danger" size="lg" className='delete-btn' onClick={deletePost}>삭제</Button> :
                        null
                    }
                </Col>
                <Col>
                    <Button className='back-btn' size='lg' variant="warning" onClick={gotoCommunity}>목록으로 돌아가기</Button>
                </Col>
            </Row>
            <Row className='post-metadata'>
                <Col xs = {8}>
                    <h2>{contents["id"]}</h2>
                </Col>
                <Col>
                    <h2>{contents["class"]}</h2>
                </Col>
                <Col>
                    <h2>{contents["region"]}</h2>
                </Col>
            </Row>
            <Row className='post-article'>
                {contents["article"]}
            </Row>
            <Row className='post-image-row'>
                {
                    hasImage ?
                    <div className='post-image' style={{"backgroundImage" : `url(${imagePath})`}}>
                    </div> :
                    null
                }
            </Row>
            <Row className='comment-input-area'>
                <Col>
                    <textarea rows="3" cols="80" className='comment-input-text'
                        placeholder='댓글을 작성하세요' spellCheck="false"></textarea>
                </Col>
                <Col>
                    <Button className='comment-input-btn' variant="secondary" onClick={postComment}>등록</Button>
                </Col>
            </Row>
            <Row className='comment-area'>
                {
                    comments.map((item, index) => {
                        return <Comment key={index} item={item}/>
                    })
                }
            </Row>
        </Container>
    )
}

export default HamukjaCommunityPage;