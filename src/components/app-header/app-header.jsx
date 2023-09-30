import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleToHomeClick = () => {
    navigate("/");
  }

  const handleToProfileClick = () => {
    navigate("/profile");
  }



  return (
    <header className={headerStyles.appHeader}>
      <nav className={headerStyles.headerNavbar}>
        <ul className={`${headerStyles.headerTabMenu} mt-4 mb-4`}>
          <li>
            <a
              onClick={handleToHomeClick}
              href="#"
              className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
            >
              <BurgerIcon type="primary" />
              <p className={"text text_type_main-default"}>Конструктор</p>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
            >
              <ListIcon type="secondary" />
              <p className={"text text_type_main-default text_color_inactive"}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
        <div className={headerStyles.headerLogo}>
          <Logo />
        </div>
        <a
          onClick={handleToProfileClick}
          href="#"
          className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
        >
          <ProfileIcon type="secondary" />
          <p className={"text text_type_main-default text_color_inactive"}>
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
