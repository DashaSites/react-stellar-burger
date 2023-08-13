import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { getFetchedIngredientsFromApi } from '../../services/actions/ingredientsActions.js';
import { useSelector, useDispatch } from 'react-redux';



const App = () => {

  // Ингредиенты, загруженные с сервера
  const { ingredients, isLoading, isError } = useSelector(state => state.ingredientsState);

  const dispatch = useDispatch();

  

  // Достаю данные через запрос к api (через функцию в экшенах): импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю в стейт)
  React.useEffect(() => {
    dispatch(getFetchedIngredientsFromApi())
  }, [])
  

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
      {isError && "Что-то пошло не так"}
      {isLoading && "Загрузка..."}
      {!isError && !isLoading && ingredients.length > 0 &&
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      }
      </main>
    </div>
  );
}


export default App;
