import React from "react";
import loginStyles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";



// Страница авторизации
export const LoginPage = () => { 
  return (
    <div className={loginStyles.formContainer}>
      <form className={loginStyles.form}>
        
        <h2 className={`${loginStyles.headline} text text_type_main-medium mb-6`}>Вход</h2>
        
        <fieldset className={loginStyles.inputItems}>
         <EmailInput />
         <PasswordInput />
        </fieldset>

        <div className={`${loginStyles.loginButton} mt-6 mb-20`}>
          <Button>Войти</Button>
        </div>
      
      </form>

      <div className={`${loginStyles.navigationContainer} mb-4`}>

        <p className={`${loginStyles.navigationText} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>

        <button className={`${loginStyles.navigationButton} text text_type_main-default`}>
          Зарегистрироваться
        </button>

      </div>

      <div className={`${loginStyles.navigationContainer} mb-4`}>

        <p className={`${loginStyles.navigationText} text text_type_main-default`}>
          Забыли пароль?
        </p>

        <button className={`${loginStyles.navigationButton} text text_type_main-default`}>
          Восстановить пароль
        </button>

      </div>
    </div>
  )
}

export default LoginPage;