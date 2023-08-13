import React, { useMemo } from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


const Ingredient = ({ ingredient, onClick }) => {

  // Вытаскиваю в стейт из стора айдишники тех булок и ингредиентов, которые сейчас лежат в конструкторе
  const { bunIngredientID, middleIngredients } = useSelector(state => state.constructorState);

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

 
  // Счетчик для соусов и начинок, которые уже выбраны, т.е. находятся в конструкторе
  const middleIngredientsCounter = useMemo(
    () => {
      const middleIngredientsIDArray = middleIngredients.filter((middleIngredient) => middleIngredient.id === ingredient._id);
      return middleIngredientsIDArray.length;

  }, [ingredient, middleIngredients]);
  
  
  // Счетчик для булок, которые уже выбраны (лежат в конструкторе)
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