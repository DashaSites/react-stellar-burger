import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR, getFetchedIngredientsFromApi } from '../../services/actions/ingredientsActions.js';
import { INGREDIENT_POPUP_OPENED, INGREDIENT_POPUP_CLOSED } from '../../services/actions/ingredientDetailsActions.js';
import { GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_ERROR, getFetchedOrderDetailsFromApi } from '../../services/actions/orderDetailsActions.js';
import { useSelector, useDispatch } from 'react-redux';


const App = () => {

  // Ингредиенты, загруженные с сервера
  const { ingredients, isLoading, isError } = useSelector(state => state.ingredientsState);
  
  // Данные об ингредиенте, которые подгружаются в открытый попап с ингредиентом
  const ingredientDetails = useSelector(state => state.ingredientDetailsState);

  const dispatch = useDispatch();

  


  // Достаю данные через запрос к api (через функцию в экшенах): импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю в стейт)
  React.useEffect(()=> {
    dispatch(getFetchedIngredientsFromApi())
}, [])
  


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

    dispatch({
      type: INGREDIENT_POPUP_CLOSED
    });
  }


  // Обработка кликов по ингредиенту
  const handleClickIngredient = (ingredient) => {
    //setIngredientToShow(ingredient);
    //setIngredients([...ingredients, ingredient]); // добавляем кликнутый ингредиент в конструктор бургера
    dispatch({ 
      type: INGREDIENT_POPUP_OPENED,
      payload: {
        id: ingredient._id,
        src: ingredient.image,        
        name: ingredient.name,
        calories: ingredient.calories,
        proteins: ingredient.proteins,
        fat: ingredient.fat,
        carbohydrates: ingredient.carbohydrates
      } 
     });
    setIsIngredientDetailsOpened(true);
  }

  // Соберем id всех ингредиентов конструктора в массив
  const ingredientsIdArray = ingredients.map(ingredient => ingredient._id);


  const handleClickOrderButton = () => { // Вызов dispatch
    setIsOrderDetailsOpened(true);
    dispatch(getFetchedOrderDetailsFromApi(ingredientsIdArray)); // вспомогательная функция, чтобы в ней повесить флажок isError
  }


  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
      {isError && "Что-то пошло не так"}
      {isLoading && "Загрузка..."}

      {!isError && !isLoading && ingredients.length > 0 &&
        <>
          <BurgerIngredients onElementClick={handleClickIngredient} />
          <BurgerConstructor onButtonClick={handleClickOrderButton} />
        </>
      }

      </main>
        {isIngredientDetailsOpened && ( // если компонент с ингредиентом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            <IngredientDetails ingredient={ingredientDetails} />          
          </Modal>
        )} 
        {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
          <Modal onCloseClick={closeModals} closeModals={closeModals}>
            {isError && "Что-то пошло не так"}
            {!isError &&
                <OrderDetails />  
            }      
          </Modal>
        )} 
    </div>
  );
}


export default App;
