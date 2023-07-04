import { useState } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { data } from "../../utils/data.js";
import { element } from "prop-types";

const BurgerIngredients = () => {

  // Подключаем табы: изначально стейт принимает таб, выбранный по умолчанию
  const [current, setCurrent] = useState('bun');


  // Отматываем на соответствующий раздел при клике на таб
  const setTab = (clickedTab) => {
    setCurrent(clickedTab); // кликнутый там устанавливаем в стейт
    const selectTab = document.getElementById(clickedTab); // ищем элемент с айди, равным названию таба
    if (selectTab) { // если такой элемент найден, то
      return selectTab.scrollIntoView({behaviour: "smooth"}); // скроллим до него
    }
  }


  const buns = data.filter((element) => { // Вытаскиваем из data массив с булками
    return element.type === "bun";
  });
  
  const sauces = data.filter((element) => { // Вытаскиваем из data массив с соусами
    return element.type === "sauce";
  });

  const mains = data.filter((element) => { // Вытаскиваем из data массив с начинкой
    return element.type === "main";
  });


  return (
    <section className={ingredientsStyles.ingredientsSection}>
      <h1 className="text text_type_main-large mb-4">Соберите бургер</h1>
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

      <div className={`${ingredientsStyles.wrapper} mb-10 custom-scroll`}>

        <h2 className="text text_type_main-medium" id="bun">Булки</h2> {/* Раздел с булками */}
        <ul className={ingredientsStyles.list} >
          {
            buns.map((bun) => (
              <Ingredient props={bun} key={bun._id} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="sauce">Соусы</h2> {/* Раздел с соусами */}
        <ul className={ingredientsStyles.list} >
          {
            sauces.map((sauce) => (
              <Ingredient props={sauce} key={sauce._id} />
            ))
          }
        </ul>

        <h2 className="text text_type_main-medium" id="main">Начинки</h2> {/* Раздел с начинками */}
        <ul className={ingredientsStyles.list} >
          {
            mains.map((main) => (
              <Ingredient props={main} key={main._id} />
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients;