import './HamukjaNewPost.css';

import { useEffect, useCallback, useState } from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function HamukjaNewPost(){

    const navigate = useNavigate();
    const gotoCommunity = useCallback(() => navigate('/community', {replace: true}), [navigate]);

    const memberId = useSelector((state) => state.member.id);

    const [image, setImage] = useState(null);

    function upload() {
        let title = document.querySelector('.title-input-text').value;
        let region = document.querySelector('.area-input-text').value;
        let postClass = document.querySelector('.class-input-select').value;
        let article = document.querySelector('.post-input-text').value;

        const formData = new FormData();
        formData.append("memberId", memberId);
        formData.append("title", title);
        formData.append("region", region);
        formData.append("postClass", postClass);
        formData.append("article", article);
        formData.append("postImage", image);

        if(title === "" || region === "" || article === "") {
            window.alert('작성하지 않은 항목이 있습니다');
            return;
        }

        axios({
            method: "post",
            url: "/hamukja/post",
            data: formData,
        }).then(response => {
            window.alert('게시글이 등록되었습니다');
            gotoCommunity();
        }).catch(() => {
            window.alert('서버의 문제로 게시글을 등록하지 못했습니다');
        })

    }

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
                            <option value="exchange" defaultValue>교환</option>
                            <option value="share">나눔</option>
                            <option value="groupBuying">공동구매</option>
                        </select>
                    </div>
                </Row>
                <Row>
                    <div className='post-input-head'>
                        글을 작성하세요
                    </div>
                    <Col>
                    <textarea rows="6" cols="100" className='post-input-text' spellCheck='false'></textarea>
                    </Col>
                </Row>
                <Row>
                    <div className='post-input-head'>
                        사진 첨부(최대 1장)
                    </div>
                    <Col>
                        <input type="file" id="imageUpload" className='post-image-input' 
                            accept='.jpg, .png' onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}></input>
                    </Col>
                </Row>

                <div className='submit-btn'>
                    <Button variant="primary" size="lg" className="upload-btn" onClick={upload}>
                        작성 완료
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default HamukjaNewPost;