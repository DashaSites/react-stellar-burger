import appStyles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
        <main className={appStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
