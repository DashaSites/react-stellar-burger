import React, { useContext, useReducer, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { bunSelector, middleIngredientsSelector, sumSelector } from '../../services/selector/constructorSelectors.js';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT, DROP_INGREDIENT_MIDDLE, DROP_INGREDIENT_BUN, MOVE_INGREDIENT } from '../../services/actions/ingredientsActions';
import { select } from '../../services/store/store.js';
import { ingredientSelector } from '../../services/selector/ingredientsSelectors.js';
import { deleteIngredient, dropIngredientWithUuid } from '../../services/actions/ingredientsActions.js';
import { MiddleConstructorElement } from '../middle-constructor-element/middle-constructor-element.jsx';



const BurgerConstructor = ({ onButtonClick }) => { 
  
  const dispatch = useDispatch();

  // Найдем в данных (если они загрузились) хоть одну булку - передаем ее сюда из селектора
  const bunElement = useSelector(bunSelector);

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок: передаем его сюда из селектора
  const mainsAndSaucesElements = useSelector(middleIngredientsSelector);

  // Передаем из селектора суммарную стоимость заказа на данный момент
  const sumOfSelectedIngredients = useSelector(sumSelector);



  ///// DND: Перетаскиваю ингредиенты в конструктор /////

  const [{ opacity }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      const droppedIngredient = select(ingredientSelector(item.id)); // по айдишнику нашла ингредиент в сторе

      if (droppedIngredient.type !== 'bun') { // если перетаскиваю не булку, то бросаю этот ингредиент в середину:
        dispatch(
          dropIngredientWithUuid(droppedIngredient)
        );
      } else { // а если перетаскиваю булку, то бросаю ингредиент на место булки:
        dispatch({
          type: DROP_INGREDIENT_BUN,
          payload: droppedIngredient
        });
      }
    },
    collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.5 : 1
    })
})

/////

// Отправляю в редьюсер специальный экшен, чтобы сортировать ингредиенты (он взят из библиотеки dnd)
const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      }
    });
}, [])



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
          mainsAndSaucesElements.map((element, index) => { 
            return ( // Вынесла ингредиент - элемент конструктора в отдельный компонент, а там уже описана логика сортировки
              <MiddleConstructorElement element={element} key={element.key} index={index} moveIngredient={moveIngredient} />
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