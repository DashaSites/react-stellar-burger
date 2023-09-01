import React from "react";
// Позже, при деплое на github.pages, изменить BrowserRouter на HashRouter
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { getFetchedIngredientsFromApi } from "../../services/actions/ingredientsActions.js";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "../layout/layout.jsx";
import { HomePage } from "../../pages/home.jsx"
import { LoginPage } from "../../pages/login.jsx";
import { PageNotFound } from "../../pages/page-not-found.jsx";

const App = () => {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/" element={<HomePage />} />
          {/* <NavLink className={{({isActive}) => isActive ? "active" : ""} to="/"><AppHeader /></NavLink>*/}

          <Route path="login" element={<LoginPage />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );

  /*
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
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
*/




};

export default App;

// 1) Оборачиваем App в BrowserRouter
// 2) Создаем папку pages, и переносим в него нашу разметку из App в домашнюю страницу
// 3) Верстаем страницы 
// 4) Реализуем функционал модалки
// 5) В посте "Авторизация и работа с модалками" лежит код для обновления токенов, скопировать его оттуда



//!!! Компонент <Navigate></Navigate> потребуется только в реализации protected router

//!!! Функция navigate(-1) (или navigate("/")) потребуется при реализации модалки

// !!! Вложенные роуты нужны только для менюшки на странице профиля: см. 1:40 в вебинаре

// !!! Защищенные маршруты и авторизация - с 1:43 в вебинаре 

// !!! Токены лучше положить на хранение в localStorage (а не в куки)
