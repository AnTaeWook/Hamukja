import "./NavbarMain.css";
import {Navbar, Container, Nav} from "react-bootstrap";
import SignUpModal from "../Modal/SignUpModal";
import SignInModal from "../Modal/SignInModal";
import React, { useState, useCallback, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {setMemberId} from '../_Redux/memberSlice';



function NavbarMain(){

    const memberId = useSelector((state) => state.member.id);
    const dispatch = useDispatch();
    // 가져온 회원 아이디 상태 변경하는 방법
    // dispatch(setMemberId('hello123'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(memberId == ''){
            setIsLoggedIn(false);
        }
        else{
            setIsLoggedIn(true);
        }
    }, [memberId]);

    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const [signInModalOpen, setSignInModalOpen] = useState(false);

    function openSignUpModal(){
        setSignUpModalOpen(true);
    };
    function closeSignUpModal(){
        setSignUpModalOpen(false);
    };

    function openSignInModal(){
        setSignInModalOpen(true);
    };
    function closeSignInModal(){
        setSignInModalOpen(false);
    };


    function singUpFunc(){
        openSignUpModal();
    };
    function signInFunc(){
        openSignInModal();
    };
    function signOutFunc(){
        dispatch(setMemberId(''));
        window.alert('로그아웃 되었습니다!');
    }

    const navigate = useNavigate();
    const gotoHome = useCallback(() => navigate('/', {replace: true}), [navigate]);
    const gotoRecipes = useCallback(() => navigate('/recipes', {replace: true}), [navigate]);
    const gotoCommunity = useCallback(() => navigate('/community', {replace: true}), [navigate]);

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand className="navbar-logo">해먹자로고</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={gotoHome}>&emsp;홈&emsp;</Nav.Link>
                        <Nav.Link onClick={gotoRecipes}>&emsp;레시피&emsp;</Nav.Link>
                        <Nav.Link onClick={gotoCommunity}>&emsp;커뮤니티&emsp;</Nav.Link>
                    </Nav>
                    {
                        isLoggedIn?
                        <>
                        <Nav.Link>
                            {memberId}
                        </Nav.Link>
                        <Nav.Link onClick={signOutFunc}>
                            <button className="sign-out-btn">
                                로그아웃
                            </button>
                        </Nav.Link>
                        </>
                        :
                        <>
                        <Nav.Link onClick={singUpFunc}>
                            <button className="sign-up-btn">
                                회원가입
                            </button>
                        </Nav.Link>
                        <Nav.Link onClick={signInFunc}>
                            <button className="sign-in-btn">
                                로그인
                            </button>
                        </Nav.Link>
                        </>
                    }
                </Container>
            </Navbar>

            <React.Fragment>
                <SignUpModal open={signUpModalOpen} close={closeSignUpModal}/>
                <SignInModal open={signInModalOpen} close={closeSignInModal}/>
            </React.Fragment>
        </>
    );
}

export default NavbarMain;