import headerStyles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const AppHeader = () => {
  return (
    <header className={headerStyles.appHeader}>
      <nav className={headerStyles.headerNavbar}>
        <ul className={`${headerStyles.headerTabMenu} mt-5 mb-5`}>
          <li>
            <a href="#" className={headerStyles.headerLink}>
              <BurgerIcon type="primary" />
              <p className={"text text_type_main-default"}>Конструктор</p>
            </a>
          </li>
          <li>
            <a href="#" className={headerStyles.headerLink}>
              <ListIcon type="secondary" />
              <p className={"text text_type_main-default text_color_inactive"}>Лента заказов</p>
            </a>
          </li>
        </ul>
        <div className={headerStyles.headerLogo}>
        <Logo />
        </div>
        <a href="#" className={headerStyles.headerLink}>
          <ProfileIcon type="secondary" />
          <p className={"text text_type_main-default text_color_inactive"}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  )
}

export default AppHeader;
