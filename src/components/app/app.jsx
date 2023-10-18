import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import { HomePage } from "../../pages/home/home.jsx";
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import ProfileOrders from "../profie-orders/profile-orders.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import Modal from "../modal/modal.jsx";
import Layout from "../layout/layout.jsx";
import { PageNotFound } from "../../pages/page-not-found/not-found.jsx";
import { useSelector, useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/actions/authorizationActions.js";
import { getFetchedIngredientsFromApi } from "../../services/actions/ingredientsActions.js";

import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element.jsx";
import Preloader from "../preloader/preloader.jsx";


const App = () => {

  // Достаю из стора ингредиенты с флагами isLoading и isError
  const { ingredients, isLoading, isError } = useSelector(
    (state) => state.ingredientsState
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;


  useEffect(() => { // При старте приложения делаю запрос, авторизован ли юзер
    dispatch(checkUserAuth());
  }, []);


  // Достаю ингредиенты через запрос к api (асинхронная функция из файла с экшенами:
  // импортирую сюда запрос и ответ из burger-api.js
  // и обрабатываю эти данные дальше (записываю в стейт)
  useEffect(() => {
    dispatch(getFetchedIngredientsFromApi());
  }, []);


  const handleModalClose = () => {
  // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  
  return (
    <>
      {isError && "Что-то пошло не так"}
      {isLoading && <Preloader />}
      {!isError && !isLoading && ingredients.length > 0 && (
          <>
            <AppHeader />
            <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />
              <Route path='ingredients/:ingredientId'
                  element={<IngredientDetails />} />

              {/* Только для неавторизованных */}
              <Route path="login" element={<OnlyUnAuth component={<LoginPage/>} />} />
              {/* Только для неавторизованных */}
              <Route path="register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
              {/* Только для неавторизованных */}
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              {/* Только для неавторизованных */}
              <Route path="reset-password" element={<ResetPasswordPage />} />

              {/* Только для авторизованных */}
              <Route path="/profile/" element={<OnlyAuth component={<Layout />} />}>
                {/* ключевое слово index означает, что <ProfilePage /> размещен по адресу выше */}
                <Route index element={<OnlyAuth component={<ProfilePage />} />} />
                <Route path="orders" element={<OnlyAuth component={<ProfileOrders />} />} />
              </Route>
     
              <Route path="*" element={<PageNotFound />} />
            </Routes>

            {background && (
              <Routes>
	              <Route
	                path='ingredients/:ingredientId'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <IngredientDetails />
	                  </Modal>
	                }
	              />
              </Routes>
            )}
          </>
        )}
    </>
  );
};

export default App;
