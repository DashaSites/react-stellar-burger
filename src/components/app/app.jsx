import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { getIngredients, getOrderDetails } from "../../utils/burger-api.js";
import { IngredientsContext } from '../../services/appContext.js'; //  NEW

const App = () => {
  // СТЕЙТ, КОТОРЫЙ Я ПЕРЕНЕСЛА В КОНТЕКСТ
  
  const [ingredients, setIngredients] = React.useState([]); 

  const [ingredientToShow, setIngredientToShow] = React.useState({});

  const [orderNumber, setOrderNumber] = React.useState('');

  // Достаю данные через запрос к api: импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю их в стейт)
  React.useEffect(() => {
    getIngredients()
    .then(res => setIngredients(res.data))
    .catch(err => console.log(err));
  }, []);


  /// Настраиваю состояние и работу модальных окон ///

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

  // Обработка кликов //
  const handleClickIngredient = (ingredient) => {
    setIngredientToShow(ingredient);
    setIngredients([...ingredients, ingredient]); // добавляем кликнутый ингредиент в конструктор бургера
    
    setIsIngredientDetailsOpened(true);
  }
  // Соберем id всех ингредиентов конструктора в массив
  const ingredientsIdArray = ingredients.map(ingredient => ingredient._id);

  const handleClickOrderButton = () => {
    setIsOrderDetailsOpened(true);
    getOrderDetails(ingredientsIdArray) // Используем массив id для запроса к серверу
    .then(res => setOrderNumber(res.order.number))
    .catch(err => console.log(err));
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} onElementClick={handleClickIngredient} />
        <IngredientsContext.Provider value={{ingredients, setIngredients}}> {/* NEW */}
          <BurgerConstructor onButtonClick={handleClickOrderButton} />
        </IngredientsContext.Provider> {/* NEW */}
      </main>
        {isIngredientDetailsOpened && ( // если компонент с ингредиентом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            <IngredientDetails ingredient={ingredientToShow} />          
          </Modal>
        )} 
        {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            <OrderDetails orderNumber={orderNumber} />         
          </Modal>
        )} 
    </div>
  );
}


export default App;
