import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";

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


  // Настраиваю состояние и работу модальных окон
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

  // закрываю оба модальных окна по клику на крестик + по клику на оверлей
  const closeModals = () => { 
    setIsIngredientDetailsOpened(false);
    setIsOrderDetailsOpened(false);
  }

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModals();
  }
  
  const handleClickIngredient = (ingredient) => {
    setIngredientToShow(ingredient);
    setIsIngredientDetailsOpened(true);
  }

  const handleClickOrderButton = () => {
    setIsOrderDetailsOpened(true);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} onElementClick={handleClickIngredient} />
        <BurgerConstructor ingredients={ingredients} onButtonClick={handleClickOrderButton} />
      </main>
        {isIngredientDetailsOpened && ( // если компонент с ингредиентом открыт, тогда:
          <Modal onCloseClick={closeModals} onEscKeydown={handleEscKeydown}>
            <IngredientDetails ingredient={ingredientToShow} />          
          </Modal>
        )} 
        {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
          <Modal onCloseClick={closeModals} onEscKeydown={handleEscKeydown}>
            <OrderDetails />         
          </Modal>
        )} 
    </div>
  );
}


export default App;
