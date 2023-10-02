import React, { useEffect } from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ingredientSelector, allIngredientsSelector } from "../../services/selector/ingredientsSelectors.js";
import { Navigate, useParams } from 'react-router-dom';
import Preloader from "../preloader/preloader.jsx";
import { getSelectedIngredient, getFetchedIngredientsFromApi } from "../../services/actions/ingredientsActions.js";


const IngredientDetails = () => {

  const { ingredientId } = useParams();

  // КЛИКНУТЫЙ ИНГРЕДИЕНТ
  const ingredient = useSelector(ingredientSelector(ingredientId)); 

  
  // ВСЕ ИНГРЕДИЕНТЫ
  const allIngredients = useSelector(allIngredientsSelector()); 
  const dispatch = useDispatch();


 // ПРЕЖНЯЯ ФУНКЦИЯ - РАБОТАЕТ: ДИСПАТЧУ АСИНХРОННЫЙ ЭКШЕН, 
 // ЧТОБЫ ЗАГРУЗИТЬ С СЕРВЕРА ВСЕ ИНГРЕДИЕНТЫ 

/*
  useEffect(() => {
    if (!ingredient) {
      return <Preloader />
      //dispatch(getFetchedIngredientsFromApi());
    }
  }, [ingredient]);
 */

  if (!ingredient) {
    return <Preloader />
  }



  return (
    <article className={ingredientDetailsStyles.container}>
      <h2
        className={`${ingredientDetailsStyles.heading} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${ingredientDetailsStyles.image} mb-4`}
        src={ingredient.image}
      />
      <h3
        className={`${ingredientDetailsStyles.title} text text_type_main-medium mb-8`}
      >
        {ingredient.name}
      </h3>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Калории,ккал
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Белки, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Жиры, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p
            className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}
          >
            Углеводы, г
          </p>
          <p
            className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}
          >
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </article>
  );
};

export default IngredientDetails;
