import React from 'react';
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";
//import { IngredientsContext } from '../../services/appContext.js'; // NEW
import { useSelector, useDispatch } from 'react-redux';
//import { ingredientsSelector } from '../../services/store/index.js';
import { INGREDIENTS_LOADED } from '../../services/reducers/rootReducer.js';

const BurgerIngredients = ({ onElementClick }) => {

  const { ingredients, isLoading, isError } = useSelector(state => state.ingredientsState);


  console.log(ingredients)

  // Подключаем табы: изначально стейт принимает таб, выбранный по умолчанию
  const [current, setCurrent] = React.useState("bun");

  // Отматываем на соответствующий раздел при клике на таб
  const setTab = (clickedTab) => {
    setCurrent(clickedTab); // кликнутый таб устанавливаем в стейт
    const selectTab = document.getElementById(clickedTab); // ищем элемент с айди, совпадающим с названием таба
    if (selectTab) { // если такой элемент найден, то
      return selectTab.scrollIntoView({behaviour: "smooth"}); // скроллим до него
    }
  }


  const buns = ingredients.filter((element) => { // вытаскиваем из всех данных массив булок
    return element.type === "bun";
  });
  
  const sauces = ingredients.filter((element) => { // вытаскиваем из всех данных массив соусов
    return element.type === "sauce";
  });

  const mains = ingredients.filter((element) => { // вытаскиваем из всех данных массив начинок
    return element.type === "main";
  });


  return (
    <section className={ingredientsStyles.ingredientsSection}>
      <h1 className="text text_type_main-large mt-8 mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setTab}>
          Начинки
        </Tab>
      </div>

      <div className={`${ingredientsStyles.wrapper} mt-10 mb-10 custom-scroll`}>

        <h2 className="text text_type_main-medium" id="bun">Булки</h2> {/* раздел с булками */}
        <ul className={`${ingredientsStyles.list} mt-8 mr-8 mb-10 ml-4`} >
          {
            buns.map((bun) => (
              <Ingredient ingredient={bun} key={bun._id} onClick={onElementClick} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="sauce">Соусы</h2> {/* раздел с соусами */}
        <ul className={`${ingredientsStyles.list} mt-8 mr-8 mb-10 ml-4`} >
          {
            sauces.map((sauce) => (
              <Ingredient ingredient={sauce} key={sauce._id} onClick={onElementClick} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="main">Начинки</h2> {/* раздел с начинками */}
        <ul className={`${ingredientsStyles.list} mt-8 mr-8 mb-10 ml-4`} >
          {
            mains.map((main) => (
              <Ingredient ingredient={main} key={main._id} onClick={onElementClick} />
            ))
          }
        </ul>

      </div>
    </section>
  )
}


BurgerIngredients.propTypes = {
  //ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  onElementClick: PropTypes.func.isRequired
}


export default BurgerIngredients;