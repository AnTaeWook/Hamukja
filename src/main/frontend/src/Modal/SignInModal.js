import "./SignInModal.css";
import {useDispatch} from 'react-redux';
import {setMemberId} from '../_Redux/memberSlice';
import axios from "axios";

/**
 * SignInModal
 * 로그인 모달
 * 
 * 로그인 정보 전달 후 유저 상태 관리
 * 
 * @author 태욱
 * @version 2.0
 */
function SignInModal(props) {

    const dispatch = useDispatch();

    const { open, close } = props;

    function logIn(){
      let fd = new FormData();
      if(document.querySelector('.sign-in-id').value == '' ||
         document.querySelector('.sign-in-pw').value == ''){
          window.alert('빈칸을 작성해 주세요!');
          return;
      }
      fd.append('id', document.querySelector('.sign-in-id').value);
      fd.append('pw', document.querySelector('.sign-in-pw').value);
      axios({
        method: "post",
        url: "/hamukja/sign-in",
        data: fd,
      }).then(response => {
        if(response.data == '<Error>notExistId'){
          window.alert('존재하지 않는 회원입니다.');
        }
        else if(response.data == '<Error>wrongPassword'){
          window.alert('잘못된 비밀번호 입니다.')
        }
        else{
          window.alert(response.data + ' 님 환영합니다!');
          dispatch(setMemberId(response.data));
        }
      }).catch(() => {
        window.alert("Error");
      })
      close();
    }
  
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
              <button className="close" onClick={logIn}>
                로그인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default SignInModal;