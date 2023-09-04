import React from "react";
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import { getFetchedIngredientsFromApi } from "../../services/actions/ingredientsActions.js";
import { useSelector, useDispatch } from "react-redux";
import { isUserAuthorizedSelector } from "../../services/selector/authorizationSelectors.js";
import { Navigate } from 'react-router-dom';


export const HomePage = () => {

  const isUserAuthorized = useSelector(isUserAuthorizedSelector);


    // Ингредиенты, загруженные с сервера
  const { ingredients, isLoading, isError } = useSelector(
    (state) => state.ingredientsState
  );

  const dispatch = useDispatch();

  // Достаю данные через запрос к api (через функцию в экшенах): импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю в стейт)
  React.useEffect(() => {
    dispatch(getFetchedIngredientsFromApi());
  }, []);

  if(!isUserAuthorized) {
    return (
      <Navigate to="/login" />
    )
  }





  return (
    <div className={styles.home}>
      <main className={styles.main}>
        {isError && "Что-то пошло не так"}
        {isLoading && "Загрузка..."}
        {!isError && !isLoading && ingredients.length > 0 && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );

}