import React from "react";
import loginStyles from '../pages/login.module.css';
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

        <div className={loginStyles.button}>
          <Button>Войти</Button>
        </div>
      </form>

      <div>
        <p>

        </p>
        <button>

        </button>
      </div>
      <div>
        <p>

        </p>
        <button>

        </button>
      </div>
    </div>
  )
}

export default LoginPage;