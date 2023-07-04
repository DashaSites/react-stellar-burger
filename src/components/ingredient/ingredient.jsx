import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { useState } from "react";


const Ingredient = ({props}) => {
  const [count, setCount] = useState(0);

  const onCount = () => {
    setCount(count + 1);
  }


  return (
    <li className={ingredientStyles.box} onClick={onCount}>
      <img src={props.image} alt="ингредиент" className={ingredientStyles.image} />
      {count > 0 && 
        <Counter count={count} size="default" extraClass="m-1" />
      }
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyles.name} text text_type_main-default`}>{props.name}</p>
    </li>
  )
}

export default Ingredient;