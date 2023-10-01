import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { getUserLoggedOut } from "../../services/actions/authorizationActions.js";

import { useDispatch } from "react-redux";


const Layout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogoutClick = () => {
    dispatch(getUserLoggedOut());
    navigate("/login", { replace: true });
  }

  // Настраиваю стили для активных ссылок в панели навигации
  const classNameFunc = ({ isActive }) => (isActive ? `${styles.activeLink} text text_type_main-medium` : `${styles.navigationElement} text text_type_main-medium`); 

  return (
    <div className={styles.contentContainer}>

      <div className={styles.navigationContainer}>
        <nav className={`${styles.navigationBlock} mb-20`}>
          <NavLink to="/profile/" className={classNameFunc}>Профиль</NavLink>
          <NavLink to="/profile/orders" className={classNameFunc}>История заказов</NavLink>
          <NavLink onClick={handleLogoutClick} className={`${styles.navigationElement} text text_type_main-medium`}>Выход</NavLink>
        </nav>
        <p className={`${styles.description} text text_type_main-small`}>В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные данные</p>
      </div>

      <Outlet />
    
    </div>
  );
};


export default Layout;