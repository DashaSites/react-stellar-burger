import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";
import { useDrag } from 'react-dnd';


const Ingredient = ({ ingredient, onClick }) => {


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






  const [count, setCount] = useState(0);

  const onCount = () => {
    setCount(count + 1);
  }

  const handleOnClick = () => {
    onCount();
    onClick(ingredient);
  }


  return (
    <li className={ingredientStyles.box} onClick={handleOnClick} ref={dragRef} style={{ opacity: opacity }}>
      <img src={ingredient.image} alt="ингредиент" className={ingredientStyles.image} />
      {count > 0 && 
        <Counter count={count} size="default" extraClass="m-1" />
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