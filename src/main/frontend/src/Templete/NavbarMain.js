import "./NavbarMain.css";
import {Navbar, Container, Nav} from "react-bootstrap";
import SignUpModal from "../Modal/SignUpModal";
import SignInModal from "../Modal/SignInModal";
import React, { useState, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * NavbarMain
 * 상단 메인 네비게이션 바
 * 
 * @author 태욱
 * @version 1.0
 */
function NavbarMain(){
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
    }
    function signInFunc(){
        openSignInModal();
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