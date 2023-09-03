import React from "react";
import styles from "./register.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

export const RegisterPage = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Регистрация</h2>
        
        <fieldset className={styles.inputItems}>
         <Input placeholder="Имя" />
         <EmailInput />
         <PasswordInput />
        </fieldset>

        <div className={`${styles.loginButton} mt-6 mb-20`}>
          <Button>Зарегистрироваться</Button>
        </div>
      
      </form>

      <div className={`${styles.navigationContainer} mb-4`}>

        <p className={`${styles.navigationText} text text_type_main-default`}>
          Уже зарегистрированы?
        </p>

        <button className={`${styles.navigationButton} text text_type_main-default`}>
          Войти
        </button>

      </div>

    </div>
  )
}

export default RegisterPage;