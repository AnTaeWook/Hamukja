import "./SignUpModal.css";

/**
 * SignUpModal
 * 회원가입 모달
 * 
 * @author 태욱
 * @version 1.0
 */
function SignUpModal(props) {
    const { open, close } = props;
  
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
              <button className="close" onClick={close}>
                등록
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default SignUpModal;