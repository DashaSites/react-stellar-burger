import React, { useEffect, useState, useRef } from "react";
import styles from "./profile.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFetchedUserDetails } from "../../services/actions/authorizationActions.js";
import { getUserLoggedOut } from "../../services/actions/authorizationActions.js"
import { userNameSelector, userEmailSelector } from "../../services/selector/authorizationSelectors.js";


export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const userName = useSelector(userNameSelector);
  const userEmail = useSelector(userEmailSelector);


  // Создаю реф, чтобы сохранить в нем текущее имя залогиненного пользователя
  const nameInputRef = useRef();
  // Создаю реф, чтобы сохранить в нем текущий имейл залогиненного пользователя
  const emailInputRef = useRef();
  // Создаю реф, чтобы сохранить в нем текущий value пароля
  const passwordInputRef = useRef();


  



  //+ 1) Написать условие, что изменилась какая-либо информация в инпутах

  //+ Если это условие произошло, должна появиться кнопка "Сохранить"
  // При нажатии на эту кнопку должен произойти запрос к серверу patchUser
  // Сервер должен обновить отредактированные данные профиля и записать их в стор

  useEffect(() => {
    dispatch(getFetchedUserDetails());
  }, []);
  

  useEffect(() => {
    // Подгружаю из стора имя залогиненного пользователя в поле name 
    setNameValue(userName);
    // Сохраняю в рефе текущее имя залогиненного пользователя, которое было сюда подгружено
    nameInputRef.current = userName;
  }, [userName]);
  
  const currentUserName = nameInputRef.current;



  useEffect(() => {
    // Подгружаю из стора имейл залогиненного пользователя в поле email 
    setEmailValue(userEmail);
    // Сохраняю в рефе текущее имя залогиненного пользователя, которое было сюда подгружено
    emailInputRef.current = userEmail;
  }, [userEmail]);


  const handleLogoutClick = () => {
    dispatch(getUserLoggedOut());
  }

  const onNameChange = e => {
    setNameValue(e.target.value);
    console.log('Name changed');
  }

  const onEmailChange = e => {
    setEmailValue(e.target.value);
    console.log('Email changed');
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
    console.log('Password changed');
  }


  // Для условие - показать кнопки, когда что-то меняется в любом из инпутов
  const hasInputChanged = userName !== nameValue || userEmail !== emailValue || passwordValue


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
              ref={nameInputRef}
            />
           <Input 
              value={emailValue} 
              onChange={onEmailChange} 
              placeholder="Логин" 
              icon={'EditIcon'}
              ref={emailInputRef} 
           />
           <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              ref={passwordInputRef}
          />
          </fieldset>
          {hasInputChanged ? (
            <div className={styles.buttonContainer}>
              <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
                Сохранить
              </Button>
              <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
                Отмена
              </Button>
              </div>
            ) : null}
        </form>
      </div>
    </div>

    



  )
}