import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients, onElementClick }) => {

  // Подключаем табы: изначально стейт принимает таб, выбранный по умолчанию
  const [current, setCurrent] = React.useState("bun");


  // Отматываем на соответствующий раздел при клике на таб
  const setTab = (clickedTab) => {
    setCurrent(clickedTab); // кликнутый там устанавливаем в стейт
    const selectTab = document.getElementById(clickedTab); // ищем элемент с айди, равным названию таба
    if (selectTab) { // если такой элемент найден, то
      return selectTab.scrollIntoView({behaviour: "smooth"}); // скроллим до него
    }
  }


  const buns = ingredients.filter((element) => { // Вытаскиваем из всех данных массив булок
    return element.type === "bun";
  });
  
  const sauces = ingredients.filter((element) => { // Вытаскиваем из всех данных массив соусов
    return element.type === "sauce";
  });

  const mains = ingredients.filter((element) => { // Вытаскиваем из всех данных массив начинок
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

        <h2 className="text text_type_main-medium" id="bun">Булки</h2> {/* Раздел с булками */}
        <ul className={`${ingredientsStyles.list} mt-8 mr-8 mb-10 ml-4`} >
          {
            buns.map((bun) => (
              <Ingredient ingredient={bun} key={bun._id} onClick={onElementClick} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="sauce">Соусы</h2> {/* Раздел с соусами */}
        <ul className={`${ingredientsStyles.list} mt-8 mr-8 mb-10 ml-4`} >
          {
            sauces.map((sauce) => (
              <Ingredient ingredient={sauce} key={sauce._id} onClick={onElementClick} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="main">Начинки</h2> {/* Раздел с начинками */}
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
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }))
}

// короткая версия:
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired
}


export default BurgerIngredients;