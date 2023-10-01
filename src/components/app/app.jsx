import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import { HomePage } from "../../pages/home/home.jsx"
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
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/actions/authorizationActions.js";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element.jsx";


const App = () => {

  // Здесь потребуются хуки: useLocation - при вызове возвращает длинный объект...
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;


  useEffect(() => { // При старте приложения делаю запрос, авторизован ли юзер
    dispatch(checkUserAuth());
  }, []);


  const handleModalClose = () => {
  // Возвращаемся к предыдущему пути при закрытии модалки
    navigate("/");
  };

  


  return (
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

      





        {/* РАБОТАЕТ: Маршрут только для авторизованных */}
        {/*  
        <Route path="profile" element={<OnlyAuth component={<ProfilePage />} />} >
          <Route path="profile/orders" element={<OnlyAuth component={<ProfileOrders />} />} />
        </Route>
        */}
        



          
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path='ingredients/:ingredientId'
	          element={
	            <Modal onCloseClick={handleModalClose}>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </>
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








// + 1) Оборачиваем App в BrowserRouter
// + 2) Создаем папку pages, и переносим в него нашу разметку из App в домашнюю страницу
// + 3) Верстаем страницы 
// + 4) Реализуем функционал модалки
// 5) В посте "Авторизация и работа с модалками" лежит код для обновления токенов, скопировать его оттуда



//!!! Компонент <Navigate></Navigate> потребуется только в реализации protected router

//!!! Функция navigate(-1) (или navigate("/")) потребуется при реализации модалки

// !!! Вложенные роуты нужны только для менюшки на странице профиля: см. 1:40 в вебинаре

// !!! Защищенные маршруты и авторизация - с 1:43 в вебинаре 

// !!! Токены лучше положить на хранение в localStorage (а не в куки)
