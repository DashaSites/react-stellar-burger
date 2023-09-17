import React from "react";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink } from "react-router-dom";


export const ProfilePage = () => {

  const navigate = useNavigate();



  return (
    <div className={styles.contentContainer}>

      <div className={styles.navigationContainer}>
        <nav className={`${styles.navigationBlock} mb-20`}>
          <NavLink to="/profile" className={`${styles.navigationItem} text text_type_main-medium`}>Профиль</NavLink>
          <NavLink to="/somepage" className={`${styles.navigationItem} text text_type_main-medium`}>История заказов</NavLink>
          <NavLink to="/exitpage" className={`${styles.navigationItem} text text_type_main-medium`}>Выход</NavLink>
        </nav>
        <p className={`${styles.description} text text_type_main-small`}>В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные данные</p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>        
          <fieldset className={styles.inputItems}>
           <Input placeholder="Имя" icon={'EditIcon'} />
           <Input placeholder="Логин" icon={'EditIcon'} />
           <Input placeholder="Пароль" icon={'EditIcon'} /> {/* Настроить, чтобы здесь показывались разные иконки */}
          </fieldset>
        </form>
      </div>

    </div>

    



  )
}