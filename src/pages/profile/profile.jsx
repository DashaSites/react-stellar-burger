import React, { useEffect } from "react";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFetchedUserDetails } from "../../services/actions/authorizationActions.js";
import { getUserLoggedOut } from "../../services/actions/authorizationActions.js"


export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = React.useState('value')
  const [emailValue, setEmailValue] = React.useState('value')
  const [passwordValue, setPasswordValue] = React.useState('value')


  useEffect(() => {
    dispatch(getFetchedUserDetails());
  }, []); // ОТВЕТ НА ЗАПРОС С СЕРВЕРА ПРИХОДИТ, НО В ПОЛЯХ ЭТИ ЗНАЧЕНИЯХ НЕ СТОЯТ!

  const handleLogoutClick = () => {
    dispatch(getUserLoggedOut());
  }

  const onNameChange = e => {
    setNameValue(e.target.value);
  }


  const onEmailChange = e => {
    setEmailValue(e.target.value);
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  }



  return (
    <div className={styles.contentContainer}>

      <div className={styles.navigationContainer}>
        <nav className={`${styles.navigationBlock} mb-20`}>
          <NavLink to="/profile" className={`${styles.navigationItem} text text_type_main-medium`}>Профиль</NavLink>
          <NavLink to="/somepage" className={`${styles.navigationItem} text text_type_main-medium`}>История заказов</NavLink>
          <NavLink onClick={handleLogoutClick} to="/exitpage" className={`${styles.navigationItem} text text_type_main-medium`}>Выход</NavLink>
        </nav>
        <p className={`${styles.description} text text_type_main-small`}>В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные данные</p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>        
          <fieldset className={styles.inputItems}>
           <Input 
              value={nameValue} 
              onChange={onNameChange} 
              placeholder="Имя" 
              icon={'EditIcon'}
            />
           <Input 
              value={emailValue} 
              onChange={onEmailChange} 
              placeholder="Логин" 
              icon={'EditIcon'} 
           />
           <Input 
              value={passwordValue} 
              onChange={onPasswordChange} 
              placeholder="Пароль" 
              icon={'EditIcon'} 
            /> {/* Настроить, чтобы здесь показывались разные иконки */}
          </fieldset>
        </form>
      </div>

    </div>

    



  )
}