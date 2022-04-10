import "./HamukjaHome.css";
import {Container, Row} from "react-bootstrap";

/**
 * HamukjaHome
 * 홈 페이지 메인 컨텐츠
 * 
 * @author 태욱
 * @version 1.0
 */
function HamukjaHome(){
    return(
        <div className="HamukjaHome">
            <Container>
                <Row>
                    <div className="intro-recipe">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h2>쉽고 간단하게 요리하세요</h2><br/>
                                    <p>
                                        어플로 주문하는것 만큼,<br/><br/>
                                        식사를 포장해오는것 만큼,<br/><br/>
                                        간단하게 따라하고 완성할 수 있는 레시피들을 확인하세요
                                    </p>
                                </div>
                                <div className="col">
                                <button className="w-btn w-btn-indigo" type="button">
                                    요리하러가기 ▶
                                </button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="intro-community">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                <button className="w-btn w-btn-indigo" type="button">
                                    ◀ 토론하러가기
                                </button>
                                </div>
                                <div className="col">
                                    <h2>식재료가 남아도 초조해하지 마세요</h2><br/>
                                    <p>
                                        가까운 이웃과 교환하고,<br/><br/>
                                        나눔하고,<br/><br/>
                                        원하는 양만큼만 구매하세요
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default HamukjaHome;