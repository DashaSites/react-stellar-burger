import React, { useMemo } from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


const Ingredient = ({ ingredient, onClick }) => {

  // Вытаскиваю в стейт из стора айдишники булок и ингредиентов, которые сейчас лежат в конструкторе
  const { bunIngredientID, middleIngredientsIDs } = useSelector((state) => state.constructorState);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'ingredient',
      item: { id: ingredient._id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

 
  // Счетчик для начинок, которые находятся в конструкторе
  const middleIngredientsCounter = useMemo(
    () => {
      const middleIngredientsIDArray = middleIngredientsIDs.filter((id) => id === ingredient._id);
      return middleIngredientsIDArray.length;

  }, [ingredient, middleIngredientsIDs]);
  
 
  // НАСЧЕТ БУЛОК. СЕЙЧАС ИХ В КОНСТРУКТОРЕ 2, И ИХ СТОИМОСТЬ ВКЛЮЧЕНА В ОБЩИЙ ПРАЙС.
  // И МОЖНО ДОБАВЛЯТЬ НОВЫЕ БУЛКИ. НО НАДО СДЕЛАТЬ ТАК, ЧТОБЫ
  // НОВАЯ БУЛКА, КОТОРУЮ ДРОПАЕМ В КОНСТРУКТОР, ВСТАВАЛА ТУДА ВМЕСТО ПРЕДЫДУЩЕЙ,
  // И ЧТОБЫ ЭТО ОТРАЖАЛОСЬ НА СЧЕТЧИКАХ БУЛОК.
  
  // Счетчик для булок, которые находятся в конструкторе
  const bunCounter = useMemo(
    () => {
      if (bunIngredientID === null) {
        return 0;
      } else if (bunIngredientID === ingredient._id) {
        return 2;
      }
 
    }, [ingredient, bunIngredientID]);



  const handleOnClick = () => {
    onClick(ingredient);
  }


  return (
    <li className={ingredientStyles.box} onClick={handleOnClick} ref={dragRef} style={{ opacity: opacity }}>
      <img src={ingredient.image} alt="ингредиент" className={ingredientStyles.image} />
      {
        ingredient.type === "bun" ? (
          <Counter count={bunCounter} size="default" extraClass="m-1" />
        ) : (
          <Counter count={middleIngredientsCounter} size="default" extraClass="m-1" />
        )
      }
            
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyles.name} text text_type_main-default`}>{ingredient.name}</p>
    </li>
  )
}


Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired
}


export default Ingredient;