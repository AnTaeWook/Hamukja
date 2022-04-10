import "./NavbarMain.css";
import {Navbar, Container, Nav} from "react-bootstrap";
import {useState} from 'react';

/**
 * NavbarMain
 * 상단 메인 네비게이션 바
 * 
 * @author 태욱
 * @version 1.0
 */
function NavbarMain(){

    function singUpFunc(){
        window.alert('Thanks for sign up!');
    }

    function signInFunc(){
        window.alert('Welcome to hamukja!');
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">해먹자로고</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">&emsp;홈&emsp;</Nav.Link>
                        <Nav.Link href="#recipe">&emsp;레시피&emsp;</Nav.Link>
                        <Nav.Link href="#community">&emsp;커뮤니티&emsp;</Nav.Link>
                    </Nav>
                    <Nav.Link>
                        <button className="sign-up-btn" onClick={singUpFunc}>
                            회원가입
                        </button>
                    </Nav.Link>
                    <Nav.Link>
                        <button className="sign-in-btn" onClick={signInFunc}>
                            로그인
                        </button>
                    </Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarMain;