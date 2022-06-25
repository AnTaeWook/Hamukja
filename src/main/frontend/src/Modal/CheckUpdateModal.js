import "./CheckModal.css";
import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react';

function CheckUpdateModal(props) {

    const { open, close } = props;

    const navigate = useNavigate();
    const gotoReviseRecipe = useCallback(() => navigate('/revise-recipe', {replace: true}), [navigate]);

    return (
      <div className={open ? 'open-check-modal check-modal' : 'check-modal'}>
        {open ? (
          <section>
            <header>
              주의
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <div className="check-modal-main">
                레시피를 수정하시겠습니까?
              </div>
            </main>
            <footer>
              <button className="close" onClick={gotoReviseRecipe}>
                수정
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default CheckUpdateModal;