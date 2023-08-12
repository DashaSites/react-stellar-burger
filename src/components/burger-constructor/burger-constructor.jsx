import React, { useContext, useReducer, useEffect, useMemo, useState, useRef } from 'react';
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { bunSelector, middleIngredientsSelector, sumSelector } from '../../services/selector/constructorSelectors.js';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT, DROP_INGREDIENT_MIDDLE, DROP_INGREDIENT_BUN } from '../../services/reducers/constructorReducer.js'
import { select } from '../../services/store/store.js';
import { ingredientSelector } from '../../services/selector/ingredientsSelectors.js';
import { v4 as uuidv4 } from "uuid";
import { deleteIngredient, dropIngredientWithUuid } from '../../services/actions/ingredientsActions.js';
import { MiddleConstructorElement } from '../middle-constructor-element/middle-constructor-element.jsx';





const BurgerConstructor = ({ onButtonClick }) => { 
  
  const dispatch = useDispatch();

  // Найдем в данных (если они загрузились) хоть одну булку - передаем ее сюда из селектора
  // ДОБАВИТЬ СЮДА UUID?
  const bunElement = useSelector(bunSelector);

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок: передаем его сюда из селектора
  // ДОБАВИТЬ СЮДА UUID?
  const mainsAndSaucesElements = useSelector(middleIngredientsSelector);

  // Передаем из селектора суммарную стоимость заказа на данный момент
  const sumOfSelectedIngredients = useSelector(sumSelector);



 

  ////////// DND: Перетаскиваю ингредиенты в конструктор

  //const [mainsArray, setMainsArray] = useState([mainsAndSaucesElements]);

  const [{ opacity }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      const droppedIngredient = select(ingredientSelector(item.id)); // по айдишнику нашла ингредиент в сторе
      console.log(droppedIngredient);

      if (droppedIngredient.type !== 'bun') { // если перетаскиваю не булку, то бросаю этот ингредиент в середину:
        dispatch(
          dropIngredientWithUuid(droppedIngredient)
        );



      //  dispatch({
      //    type: DROP_INGREDIENT_MIDDLE,
          // МОЖНО СОЗДАТЬ (ПРОПИСАТЬ В ACTIONS) ЭКШН-КРИЕЙТОР, 
          // ТАМ ДОБАВИТЬ ОБЪЕКТУ ИНГРЕДИЕНТА UUID, И ПЕРЕДАТЬ ЕГО В РЕДЬЮСЕР ЗДЕСЬ - 
          // ВМЕСТО ЭТОГО ЭКШЕНА. ТАКИМ ОБРАЗОМ, 

          // 1) ТУТ В РЕДЬЮСЕР ОТПРАВЛЯЕТСЯ ОБЪЕКТ С ДАННЫМИ ИНГРЕДИЕНТА, 
          // 2) TODO: А РЕДЬЮСЕР ДОЛЖЕН, ПРИНЯВ ЕГО, ДОБАВИТЬ ЕМУ UUID.
          // 3) TODO: НИЖЕ ПРИ РЕНДЕРЕ ЭТОГО ИНГРЕДИЕНТА НАДО ВЫВЕСТИ ЗДАЧЕНИЕ UUID КАК KEY
      //    payload: droppedIngredient
      //  });



      } else { // а если перетаскиваю булку, то бросаю ингредиент на место булки:
        dispatch({
          type: DROP_INGREDIENT_BUN,
          // ! РЕШИТЬ, НАДО ЛИ ЭТО ДЕЛАТЬ С БУЛКАМИ ВООБЩЕ
          // 1) ТУТ В РЕДЬЮСЕР ОТПРАВЛЯЕТСЯ ОБЪЕКТ С ДАННЫМИ ИНГРЕДИЕНТА, 
          // 2) TODO: А РЕДЬЮСЕР ДОЛЖЕН, ПРИНЯВ ЕГО, ДОБАВИТЬ ЕМУ UUID.
          // 3) TODO: НИЖЕ ПРИ РЕНДЕРЕ ЭТОГО ИНГРЕДИЕНТА НАДО ВЫВЕСТИ ЗДАЧЕНИЕ UUID КАК KEY
          payload: droppedIngredient
        });
      }
        
    
    // И С БУЛКАМИ, И С НАЧИНКАМИ РАБОТАЛО ТАК
      //  dispatch({
    //    type: DROP_INGREDIENT,
    //    payload: droppedIngredient
    //  });

    },
    collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.5 : 1
    })
})
////


////////// DND: Вложенная сортировка ингредиентов конструктора (всех кроме булок)
/*

const moveCard = (dragIndex, hoverIndex) => {
  const dragingredient = ingredients[dragIndex];
  const newIngredients = [...ingredients]; // изначально копируем сюда текущий массив инг-тов
  
  newIngredients.splice(dragIndex, 1);
  newIngredients.splice(hoverIndex, 0, dragingredient);


  setIngredients(newIngredients);
}


const ref = useRef(null); // Привязать этот ref={ref} к диву с ингредиентом. В нем будут связаны три рефа в одном 

const [, drop] = useDrop({
  accept: "ingredient",
  hover: (item, monitor) => { // в этой функции описаны действия, которые будет вызваны при наведении
    const dragIndex = item.index;
    const hoverIndex = index;
    moveCard(dragIndex, hoverIndex);
  } 
});

const [{ isDragging }, drag] = useDrag({
  type: "ingredient",
  item: () => {
    return { id, index }
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging()
  })
});

const opacity = isDragging ? 0 : 1;

drag(drop(ref));

*/



  return (
    <section className={`${constructorStyles.constructorSection} pt-25`} ref={dropRef} style={{ opacity }}>
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
      <ul className={`${constructorStyles.transposableElements} custom-scroll`} ref={dropRef}> {/* Список начинок и соусов */}
        {
          mainsAndSaucesElements.map((element) => {  // НИЖЕ ДОБАВИТЬ KEY
            return ( // Для сортировки к элементу <li> ниже привязать ref={drag} и style={{ ...style, opacity }}
              <MiddleConstructorElement element={element} key={element.key} />
            )
          })
          
        }
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
        <span className="text text_type_digits-medium">{sumOfSelectedIngredients}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onButtonClick}>
        Оформить заказ
      </Button>
    </div>
  </section>
  )
}


BurgerConstructor.propTypes = {
  onButtonClick: PropTypes.func.isRequired
}


export default BurgerConstructor;