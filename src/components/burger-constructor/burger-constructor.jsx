import React, { useContext, useReducer, useEffect, useMemo, useState } from 'react';
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { bunSelector, middleIngredientsSelector, sumSelector } from '../../services/selector/constructorSelectors.js';
import { useDrop } from 'react-dnd';
import { DROP_INGREDIENT } from '../../services/reducers/constructorReducer.js'
import { select } from '../../services/store/store.js';
import { ingredientSelector } from '../../services/selector/ingredientsSelectors.js';




const BurgerConstructor = ({ onButtonClick }) => { 

  // Найдем в данных (если они загрузились) хоть одну булку - передаем ее сюда из селектора
  const bunElement = useSelector(bunSelector);

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок: передаем его сюда из селектора
  const mainsAndSaucesElements = useSelector(middleIngredientsSelector);

  // Передаем из селектора текущую стоимость заказа (сумму цены ингредиентов)
  const sumOfSelectedIngredients = useSelector(sumSelector);

  const dispatch = useDispatch();



  //// Перетаскиваю в конструктор ингредиенты

  //const [mainsArray, setMainsArray] = useState([mainsAndSaucesElements]);

  const [{ opacity }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      const droppedIngredient = select(ingredientSelector(item.id));

      dispatch({
        type: DROP_INGREDIENT,
        payload: droppedIngredient
      });

    },
    collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.5 : 1
    })
})
////

const deleteIngredient = () => {
  console.log('To be able to delete me, you need to install unique keys to all constructor elements, then write a special action, and call here its dispatch. You probably need to create a special reducer for it. You will delete me by filtering all "ingredients" and leaving only those ingredients in the array, which keys will not equal to this key')
}


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
            return (
              <li className={`${constructorStyles.transposableElement} mt-4`} key={element._id}>
                <DragIcon type="primary" />
                <ConstructorElement 
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                  handleClose={() => deleteIngredient()} // Зачем здесь использовать именно колбэк? 
                />
              </li>
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