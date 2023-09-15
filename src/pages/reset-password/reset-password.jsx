import React from "react";
import styles from "./resetPassword.module.css";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";



export const ResetPasswordPage = () => {

  const navigate = useNavigate();

  const loginButtonClickHandler = () => {
    navigate("/login");
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
        
        <fieldset className={styles.inputItems}>
         
         <PasswordInput placeholder="Введите новый пароль" />
         <Input placeholder="Введите код из письма" />

        </fieldset>

        <div className={`${styles.savePasswordButton} mt-6 mb-20`}>
          <Button>Сохранить</Button>
        </div>
      
      </form>

      <div className={`${styles.navigationContainer} mb-4`}>

        <p className={`${styles.navigationText} text text_type_main-default`}>
          Вспомнили пароль?
        </p>

        <button className={`${styles.navigationButton} text text_type_main-default`} onClick={loginButtonClickHandler}>
          Войти
        </button>

      </div>

    </div>
  )
}