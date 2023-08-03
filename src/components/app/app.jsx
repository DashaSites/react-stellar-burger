import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { getIngredients, getOrderDetails } from "../../utils/burger-api.js";
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from '../../services/actions/ingredientsActions.js';
import { INGREDIENT_POPUP_OPENED, INGREDIENT_POPUP_CLOSED } from '../../services/actions/ingredientDetailsActions.js';
import { GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_ERROR } from '../../services/actions/orderDetailsActions.js';

import { useSelector, useDispatch } from 'react-redux';


const App = () => {

  //const [ingredientToShow, setIngredientToShow] = React.useState({});

  //const [orderNumber, setOrderNumber] = React.useState(0); // стейт для номера заказа


  const { ingredients, isLoading, isError } = useSelector(state => state.ingredientsState);
  
  const ingredientDetails = useSelector(state => state.ingredientDetailsState);

  const dispatch = useDispatch();

  
  function getFetchedIngredientsFromApi() { // функция с мидлваром
    return (dispatch) => {
        // флажок о начале загрузки
        dispatch({
            type: LOAD_INGREDIENTS_REQUEST
          })

        getIngredients()
        .then((res) => {
            dispatch({
                type: LOAD_INGREDIENTS_SUCCESS, 
                payload: res.data
              })
        }).catch((err) => {
            console.log(err);
            // Если сервер не вернул данных, отправляем экшен об ошибке
            dispatch({
                type: LOAD_INGREDIENTS_ERROR
            })
        })
    }
  }


  // Достаю данные через запрос к api: импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю их в стейт)
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



  //// ЗАРПОС К СЕРВЕРУ ЗА НОМЕРОМ ЗАКАЗА СТАЛ ФУНКЦИЕЙ С МИДЛВАРОМ 
  const getFetchedOrderDetailsFromApi = () => { 
    return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: GET_ORDER_DETAILS_REQUEST
      })

      getOrderDetails(ingredientsIdArray) // Прокинем массив id в запросе к серверу
      .then((res) => {
          dispatch({
              type: GET_ORDER_DETAILS_SUCCESS, 
              payload: res.order.number
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: GET_ORDER_DETAILS_ERROR
          })
      })
    }   
  }

  
  //// БЫЛО
  {/*
  const getFetchedOrderDetailsFromApi = () => { // ЗДЕСЬ СДЕЛАТЬ ФУНКЦИЮ С МИДЛВАРОМ
    getOrderDetails(ingredientsIdArray) // Прокинем массив id в запросе к серверу
    .then((res) => {
      setOrderNumber(res.order.number);
      //setIsError(false); // см. рендер
    }) // Полученный от сервера номер заказа сохраняем в специальный стейт
    .catch((err) => {
      console.log(err)
      //setIsError(true); // см. рендер
    });
  }
  */}

  const handleClickOrderButton = () => { // Вызов dispatch
    setIsOrderDetailsOpened(true);
    dispatch(getFetchedOrderDetailsFromApi()); // вспомогательная функция, чтобы в ней повесить флажок isError
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
      {isError && "Что-то пошло не так"}
      {isLoading && "Загрузка..."}

    {/*
      {
        ingredients.length > 0
        ? <p>Data downloaded from api</p>
        : <p>There is a problem</p>
      }
    */}

      
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
