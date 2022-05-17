import "./SignUpModal.css";
import axios from "axios";

/**
 * SignUpModal
 * 회원가입 모달
 * 
 * 서버로 회원 가입 정보 전달 구현 
 * 
 * @author 태욱
 * @version 2.0
 */
function SignUpModal(props) {
    const { open, close } = props;

    function registration(){
      let fd = new FormData();
      fd.append('id', document.querySelector('.sign-up-id').value);
      fd.append('pw', document.querySelector('.sign-up-pw').value);
      fd.append('email', document.querySelector('.sign-up-email').value);
      axios({
        method: "post",
        url: "/hamukja/sign-up",
        data: fd,
      }).then(response => {
        window.alert(response.data + ' 님의 회원가입을 환영합니다!');
      }).catch(() => {
        window.alert("이미 존재하는 ID입니다");
      })
      close();
    };

    return (
      <div className={open ? 'open-sign-up-modal sign-up-modal' : 'sign-up-modal'}>
        {open ? (
          <section>
            <header>
              회원가입
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <div className="sign-up-modal-main">
                <div>아이디</div>
                <input className="sign-up-id" type='text'/>
                <br /><br />
                <div>비밀번호</div>
                <input className="sign-up-pw" type='password'/>
                <br /><br />
                <div>이메일</div>
                <input className="sign-up-email" type='email'/>
              </div>
            </main>
            <footer>
              <button className="close" onClick={registration}>
                등록
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default SignUpModal;