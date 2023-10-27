import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import { HomePage } from "../../pages/home/home.jsx";
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { OrdersFeed } from "../../pages/feed/feed.jsx";
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
import OrderDetails from "../../components/order-details/order-details.jsx";
import OrderCard from "../../components/order-card/order-card.jsx";


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

              {/* Только для неавторизованных - ЛЕНТА ЗАКАЗОВ */}
              <Route exact path="feed" element={<OrdersFeed />} />

              <Route path="feed/:orderNumber"
                  element={<OrderDetails />} />


              {/* Только для авторизованных */}
              <Route path="/profile/" element={<OnlyAuth component={<Layout />} />}>
                {/* ключевое слово index означает, что <ProfilePage /> размещен по адресу выше */}
                <Route index element={<OnlyAuth component={<ProfilePage />} />} />

                {/* Только для авторизованных - ИСТОРИЯ ЗАКАЗОВ */}
                <Route path="orders" element={<OnlyAuth component={<ProfileOrders />} />} />
                <Route path="orders/:orderNumber" 
                    element={<OnlyAuth component={<OrderDetails />} />} />
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
                <Route
	                path='feed/:orderNumber'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <OrderDetails />
	                  </Modal>
	                }
	              />
                <Route
	                path='profile/orders/:orderNumber'
	                element={
	                  <Modal closeModals={handleModalClose}>
	                    <OrderDetails />
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



////////// ВЕБСОКЕТЫ. Вебинар (с ~1.35):

// В ПР будет 2 ленты заказов: 1) по ссылке "Лента заказов" и 2) по ссылке "История заказов".
// Создать один компонент ленты заказов
// И в первом случае, переходя на незащищенный роут feed, я туда попадаю без токена
// А во втором случае происходит подключение к защищенному /profile/orders.

// Для двух этих лент заказов надо создать два редьюсера. 

// Не забыть при создании заказа добавить токен доступа в поле Authorization
// Заказ будет создаваться 15 секунд. Эти 15 секунд в модалке с деталями заказа должен крутиться спиннер

// На странице /feed надо сделать подключение к сокету через юзеффект, отправляю там экшены connect и disconnect
// и в ретерне /feed надо отрисовать <Orders />.
// А в /profile тоже отображается тот же компонент <Orders />.
// А внутри самого компонента Orders надо с помощью useMatch проверить:
// Если он открыт со страницы /profile/orders, то тогда он сам делает подключение к вебсокету, только здесь уже при этом добавляется токен.
// То есть всего в проекте 2 подключения к вебсокету. И для ленты заказов на каждой из страниц должен быть свой редьюсер.
