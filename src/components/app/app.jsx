import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { getIngredients, getOrderDetails } from "../../utils/burger-api.js";
import { IngredientsContext, OrderNumberContext } from '../../services/appContext.js'; //  NEW
import { INGREDIENTS_LOADED } from '../../services/reducers/rootReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsSelector } from '../../services/selectors/ingredients-selector.js';

const App = () => {

  const [isLoading, setIsLoading] = React.useState(true); // флажок для рендера данных только тогда, когда получили их от api

  const [isError, setIsError] = React.useState(false); // флажок об ошибке для отображения, если данные не загрузились с api

  const [ingredientToShow, setIngredientToShow] = React.useState({});

  const [orderNumber, setOrderNumber] = React.useState(0); // стейт для номера заказа




  const dispatch = useDispatch();

  const ingredients = useSelector(ingredientsSelector);



  const getFetchedIngredientsFromApi = () => {
    setIsLoading(true); // см. рендер, где я установила этот флажок

    getIngredients()
    .then((res) => {

      dispatch({
        type: INGREDIENTS_LOADED,
        payload: res.data
      })

      //setIngredients(res.data);
      //setIsLoading(false); // см. рендер
      //setIsError(false); // см. рендер
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false); // см. рендер
      setIsError(true); // см. рендер
    });
  }

  // Достаю данные через запрос к api: импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю их в стейт)
  React.useEffect(() => {
   getFetchedIngredientsFromApi(); // вспомогательная функция, чтобы в ней повесить флажок isError
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
    //setIngredients([...ingredients, ingredient]); // добавляем кликнутый ингредиент в конструктор бургера
    
    setIsIngredientDetailsOpened(true);
  }
  // Соберем id всех ингредиентов конструктора в массив
  const ingredientsIdArray = ingredients.map(ingredient => ingredient._id);


  const getFetchedOrderDetailsFromApi = () => {
    getOrderDetails(ingredientsIdArray) // Прокинем массив id в запросе к серверу
    .then((res) => {
      setOrderNumber(res.order.number);
      setIsError(false); // см. рендер
    }) // Полученный от сервера номер заказа сохраняем в специальный стейт
    .catch((err) => {
      console.log(err)
      setIsError(true); // см. рендер
    });
  }

  const handleClickOrderButton = () => {
    setIsOrderDetailsOpened(true);
    getFetchedOrderDetailsFromApi(); // вспомогательная функция, чтобы в ней повесить флажок isError
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        {isError && "Что-то пошло не так"}
        {isLoading && "Загрузка..."}
        {!isError && !isLoading && 
          <>
            {ingredients.length > 0 &&
              <BurgerIngredients onElementClick={handleClickIngredient} />
            }
            {ingredients.length > 0 &&
              <BurgerConstructor onButtonClick={handleClickOrderButton} />
            }
          </>
        }
      </main>
        {isIngredientDetailsOpened && ( // если компонент с ингредиентом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            <IngredientDetails ingredient={ingredientToShow} />          
          </Modal>
        )} 
        {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            {isError && "Что-то пошло не так"}
            {!isError &&
              <OrderNumberContext.Provider value={{orderNumber, setOrderNumber}}> {/* сохраняю стейт в контекст */}
                <OrderDetails orderNumber={orderNumber} />  
              </OrderNumberContext.Provider> 
            }      
          </Modal>
        )} 
    </div>
  );
}


export default App;
