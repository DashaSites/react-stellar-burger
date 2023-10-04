import React, { useMemo, useState, useCallback } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  bunSelector,
  middleIngredientsSelector
} from "../../services/selector/constructorSelectors.js";
import { useDrop } from "react-dnd";
import {
  DROP_INGREDIENT_BUN,
  MOVE_INGREDIENT,
} from "../../services/actions/ingredientsActions";
import { getFetchedOrderDetailsFromApi } from "../../services/actions/orderDetailsActions";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";
import { dropIngredientWithUuid } from "../../services/actions/ingredientsActions.js";
import { MiddleConstructorElement } from "../middle-constructor-element/middle-constructor-element.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { isUserAuthorizedSelector } from "../../services/selector/authorizationSelectors.js";

const BurgerConstructor = () => {
  const { ingredients } = useSelector((state) => state.ingredientsState);
  const { isError } = useSelector((state) => state.orderDetailsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Найдем в данных (если они загрузились) хоть одну булку - передаем ее сюда из селектора
  const bunElement = useSelector(bunSelector); // В КОНСТРУКТОРЕ
  console.log(bunElement)

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок: передаем его сюда из селектора
  const mainsAndSaucesElements = useSelector(middleIngredientsSelector); // В КОНСТРУКТОРЕ
  console.log(mainsAndSaucesElements)

  // Суммарное число ингредиентов-соусов и ингредиентов-начинок в конструкторе
  const mainsAndSaucesElementsCount = mainsAndSaucesElements.length; // В КОНСТРУКТОРЕ



  // Текущая стоимость заказа на данный момент
  
  
  const totalOrderPrice = useMemo(() => {

    let selectedIngredients = [];

    if (bunElement && mainsAndSaucesElements) {
      selectedIngredients = [bunElement, ...mainsAndSaucesElements, bunElement];
    } else if (bunElement) {
      selectedIngredients = [bunElement, bunElement];
    } else if (mainsAndSaucesElements) {
      selectedIngredients = mainsAndSaucesElements;
    }



    //[bunElement, ...mainsAndSaucesElements, bunElement];

    const newSum = selectedIngredients.reduce((sum, currentIngredient) => {
      return sum + currentIngredient.price;
    }, 0);
    return newSum;
    
  }, [bunElement, mainsAndSaucesElementsCount]);



  // Настраиваю состояние и работу модалки с заказом:

  // Стейт модального окна OrderDetails
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);

  // Закрываю модальное окно по клику на крестик + по клику на оверлей
  const closeOrderDetailsModal = () => {
    setIsOrderDetailsOpened(false);
  };

  // Соберем id всех ингредиентов в массив
  const ingredientsIdArray = ingredients.map((ingredient) => ingredient._id);
  

  // Создание заказа
  const handleClickOrderButton = () => {

    const isAuthorized = select(isUserAuthorizedSelector);

    if (isAuthorized) {
      setIsOrderDetailsOpened(true);
      dispatch(getFetchedOrderDetailsFromApi(ingredientsIdArray)); // вспомогательная функция, чтобы в ней повесить флажок isError
    } else {
      navigate("/login");
    }
  };

  ///// DND: Перетаскиваю ингредиенты в конструктор /////

  const [{ opacity }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      const droppedIngredient = select(ingredientSelector(item.id)); // по айдишнику нашла ингредиент в сторе

      if (droppedIngredient.type !== "bun") {
        // если перетаскиваю не булку, то бросаю этот ингредиент в середину (через экшен-криейтор):
        dispatch(dropIngredientWithUuid(droppedIngredient));
      } else {
        // а если перетаскиваю булку, то бросаю ингредиент на место булки:
        dispatch({
          type: DROP_INGREDIENT_BUN,
          payload: droppedIngredient,
        });
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.5 : 1,
    }),
  });

  /////

  // Отправляю в редьюсер специальный экшен, чтобы сортировать ингредиенты (он взят из библиотеки dnd)
  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      },
    });
  }, []);



  return (
   
      <section
      className={`${constructorStyles.constructorSection} pt-25`}
      ref={dropRef}
      style={{ opacity }}
    >

      <div className={`${constructorStyles.elementsList} mb-10`}>
        
      {!bunElement && mainsAndSaucesElements.length === 0 && (
      <p>Положите что-то в корзину.</p>
      )} 
  
        <>
          {bunElement && (
            <div className={constructorStyles.fixedElement}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunElement.name} (верх)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
          )}
    
        <ul
          className={`${constructorStyles.transposableElements} custom-scroll`}
          ref={dropRef}
        >
          {/* Список начинок и соусов */}
          {mainsAndSaucesElements.map((element, index) => {
            return (
              // Вынесла ингредиент - элемент конструктора в отдельный компонент, а там уже описана логика сортировки
              <MiddleConstructorElement
                element={element}
                key={element.key}
                index={index}
                moveIngredient={moveIngredient}
              />
            );
          })}
        </ul>
        { bunElement && (
          <div className={constructorStyles.fixedElement}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunElement.name} (низ)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
          )
        }
        

          </>
        


      </div>

      <div className={constructorStyles.resultCorner}>
        <div className={`${constructorStyles.resultCounter} mr-10`}>
          <span className="text text_type_digits-medium">
            {totalOrderPrice} 
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleClickOrderButton}
        >
          Оформить заказ
        </Button>
      </div>
  
    
      {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
        <Modal closeModals={closeOrderDetailsModal}>
          {isError && "Что-то пошло не так"}
          {!isError && <OrderDetails />}
        </Modal>
      )}

    
    </section>
  );
};

export default BurgerConstructor;



/* 

1) Сейчас при загрузке в конструктор падают все ингредеинты, загруженные с сервера.
2) Эти данные попадают в компонент BurgerConstructor из редьюсера constructorReducer.
3) В этом редьюсере стейт обновляется сразу же после загрузки данных с сервера,
4) поэтому мой конструктор сразу же заполняется.
5) А надо, чтобы конструктор сначала был пуст, а заполнялся только через drag and drop:
6) То есть убрать из constructorReducer обработку экшена LOAD_INGREDIENTS_SUCCESS.
7) И тут возникает проблема:
8) Конструктор теперь пустой, но ингредиенты в него не перетаскиваются

*/






/*
  // НОВЫЙ РЕНДЕР: КОНСТРУКТОР ПУСТ

  return (
    <section
      className={`${constructorStyles.constructorSection} pt-25`}
      ref={dropRef}
      style={{ opacity }}
    >
    {!bunElement && mainsAndSaucesElements.length === 0 && (
      <p>Пожалуйста, перетащите сюда булку с ингредиентами для создания заказа</p>
    )}
    {bunElement && mainsAndSaucesElements.length > 0 && (
      <>
      <div className={`${constructorStyles.elementsList} mb-10`}>
        {
          <div className={constructorStyles.fixedElement}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunElement.name} (верх)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
        }
        <ul
          className={`${constructorStyles.transposableElements} custom-scroll`}
          ref={dropRef}
        >
      
          {mainsAndSaucesElements.map((element, index) => {
            return (
              // Вынесла ингредиент - элемент конструктора в отдельный компонент, а там уже описана логика сортировки
              <MiddleConstructorElement
                element={element}
                key={element.key}
                index={index}
                moveIngredient={moveIngredient}
              />
            );
          })}
        </ul>
        {
          <div className={constructorStyles.fixedElement}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunElement.name} (низ)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
        }
      </div>
      <div className={constructorStyles.resultCorner}>
        <div className={`${constructorStyles.resultCounter} mr-10`}>
          <span className="text text_type_digits-medium">
           {totalOrderPrice} 
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleClickOrderButton}
        >
          Оформить заказ
        </Button>
      </div>
     </>
    )}



      {isOrderDetailsOpened && ( // если компонент с заказом открыт, тогда:
        <Modal closeModals={closeOrderDetailsModal}>
          {isError && "Что-то пошло не так"}
          {!isError && <OrderDetails />}
        </Modal>
      )}
    </section>
  );
  */
