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
      <form>
        <h2>Вход</h2>
        <fieldset>

        </fieldset>

        <div>
          <button>

          </button>
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