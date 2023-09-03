import React from "react";
import styles from "./forgotPassword.module.css";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";




export const ForgotPasswordPage = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        
        <h2 className={`${styles.headline} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
        
   
   
         <EmailInput placeholder="Укажите e-mail"/>

        <div className={`${styles.restoreButton} mt-6 mb-20`}>
          <Button>Восстановить</Button>
        </div>
      
      </form>

      <div className={`${styles.navigationContainer} mb-4`}>

        <p className={`${styles.navigationText} text text_type_main-default`}>
          Вспомнили пароль?
        </p>

        <button className={`${styles.navigationButton} text text_type_main-default`}>
          Войти
        </button>

      </div>

    </div>
  )
}

export default ForgotPasswordPage;