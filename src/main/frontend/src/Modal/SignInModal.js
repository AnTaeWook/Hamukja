import "./SignInModal.css";

/**
 * SignInModal
 * 로그인 모달
 * 
 * @author 태욱
 * @version 1.0
 */
function SignInModal(props) {
    const { open, close } = props;
  
    return (
      <div className={open ? 'open-sign-in-modal sign-in-modal' : 'sign-in-modal'}>
        {open ? (
          <section>
            <header>
              로그인
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <div className="sign-in-modal-main">
                <div>아이디</div>
                <input className="sign-in-id" type='text'/>
                <br /><br />
                <div>비밀번호</div>
                <input className="sign-in-pw" type='password' />
                <br /><br />
              </div>
            </main>
            <footer>
              <button className="close" onClick={close}>
                로그인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default SignInModal;