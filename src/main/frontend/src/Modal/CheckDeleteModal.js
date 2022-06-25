import "./CheckModal.css";
import axios from "axios";

function CheckDeleteModal(props) {

    const { open, close } = props;

    function deleteRecipe(){
        axios({
            method: "delete",
            url: "/hamukja/recipe/" + props.recipeId,
        }).then(() => {
            window.alert("레시피를 삭제하였습니다");
            props.gotoRecipes();
        }).catch(() => {
            console.log('error on delete recipe!');
        })
        close();
    }
  
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
                레시피를 삭제하시겠습니까?
              </div>
            </main>
            <footer>
              <button className="close" onClick={deleteRecipe}>
                삭제
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

export default CheckDeleteModal;