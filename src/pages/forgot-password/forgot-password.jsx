import React, { useState } from "react";
import styles from "./forgotPassword.module.css";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetRecognizedByMail } from "../../services/actions/authorizationActions.js";




export const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");

  const loginButtonClickHandler = () => {
    navigate("/login");
  }

  const onEmailChange = event => {
    setEmailValue(event.target.value);
  }

  const handleForgotPassFormSubmit = (event) => {
    event.preventDefault();
    dispatch(GetRecognizedByMail(emailValue));
  }

  // Пользователь вводит в поле пароль и жмет на кнопку "Восстановить"
  // Если имейл введен, происходит POST-запрос к эндпойнту: ...
  // В случае успешного ответа пользователь направляется на роут /reset-password
  // А на введенную почту приходит инструкция с кодом для восстановления пароля.

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleForgotPassFormSubmit}>
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
        
        <EmailInput 
          placeholder="Укажите e-mail"
          onChange={onEmailChange}
          value={emailValue}
          required
        />

        <div className={`${styles.restoreButton} mt-6 mb-20`}>
          <Button htmlType="submit">Восстановить</Button>
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

export default ForgotPasswordPage;