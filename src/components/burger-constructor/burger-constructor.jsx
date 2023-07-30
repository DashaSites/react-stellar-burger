import React, { useContext, useReducer, useEffect, useMemo } from 'react';
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";
import { IngredientsContext } from '../../services/appContext.js'; //  NEW


// Функция-редьюсер для расчета суммы в счетчике заказа
function reducer(state, action) {
  if (action.type === 'ingredientsLoaded') {

    const loadedIngredients = action.payload.loadedIngredients; // достаем из dispatch используемые ингредиенты
    const newSum = loadedIngredients.reduce((sum, currentIngredient) => {
      return sum + currentIngredient.price;
    }, 0)

    const newState = { sum: newSum };
    return newState;
  }
}


const BurgerConstructor = ({ onButtonClick }) => { 

  const { ingredients } = useContext(IngredientsContext); // Извлекаем ингредиенты из контекста

  const [state, dispatch] = useReducer(reducer, { sum: 0 }); // Получаем из редьюсера state и dispatch


  // Найдем в данных (если они загрузились) хоть одну булку:
  const bunElement = ingredients.length > 0 && ingredients.find((item) => item.type === "bun");

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок:
  const mainsAndSaucesElements = ingredients.filter((item) => item.type !== "bun");

  //При первом рендере вызываем редьюсер:
  //в обновленный стейт он запишет массив из всех используемых в этом компоненте ингредиентов 
  useEffect(() => {
    
    dispatch({
      type: 'ingredientsLoaded',
      payload: { loadedIngredients: [bunElement, ...mainsAndSaucesElements, bunElement] }
    });
  }, [ingredients]);



//  const orderCost = useMemo(() => {
//    const priceSaucesAndMains = mainsAndSaucesElements.reduce((sum, currentIngredient) => {
//      return sum + currentIngredient.price;
//    }, 0);

//    return priceSaucesAndMains + bunElement.price * 2;
//  }, [bunElement, mainsAndSaucesElements]);




  return (
    <section className={`${constructorStyles.constructorSection} pt-25`}>
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
      <ul className={`${constructorStyles.transposableElements} custom-scroll`}> {/* Список начинок и соусов */}
        {
          mainsAndSaucesElements.map((element) => {
            return (
              <li className={`${constructorStyles.transposableElement} mt-4`} key={element._id}>
                <DragIcon type="primary" />
                <ConstructorElement 
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
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
        <span className="text text_type_digits-medium">{state.sum}</span>
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