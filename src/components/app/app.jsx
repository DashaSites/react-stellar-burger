import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

const App = () => {
  

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientToShow, setIngredientToShow] = React.useState({});

  // Достаем данные через запрос к api
  React.useEffect(() => {
    fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => setIngredients(res.data))
    .catch(err => console.log(err));
  }, []);


  // Настраиваем состояние и работу модальных окон
  
  // стейт для модального окна IngredientDetails 
  const [
    isIngredientDetailsOpened, 
    setIsIngredientDetailsOpened
  ] = React.useState(false);

  // стейт для модального окна OrderDetails
  const [
    isOrderDetailsOpened, 
    setIsOrderDetailsOpened
  ] = React.useState(false);

  // универсальная функция, которая закрывает все модальные окна по клику на крестик
  // ей же я пользуюсь и при клике на оверлей
  const closeModals = () => { 
    setIsIngredientDetailsOpened(false);
    setIsOrderDetailsOpened(false);
  }

  const handleEscClick = (event) => {
    console.log(event);
    event.key === "Escape" && closeModals();
  }
  
  const handleClickOnIngredient = (ingredient) => {
    setIngredientToShow(ingredient);
    setIsIngredientDetailsOpened(true);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} onClick={handleClickOnIngredient} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
      {isIngredientDetailsOpened && (
        <Modal onCloseClick={closeModals} onEscClick={handleEscClick}>
          <IngredientDetails ingredient={ingredientToShow} />
        </Modal>
      )}
    </div>
  );
}

export default App;
