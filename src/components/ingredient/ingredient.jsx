import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { useState } from "react";
import PropTypes from "prop-types";


const Ingredient = ({ ingredient, onClick }) => {
  const [count, setCount] = useState(0);

  const onCount = () => {
    setCount(count + 1);
  }

  const handleOnClick = () => {
    onCount();
    onClick(ingredient);
  }


  return (
    <li className={ingredientStyles.box} onClick={handleOnClick}>
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
}


export default Ingredient;