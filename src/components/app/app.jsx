import appStyles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
        <main className={appStyles.main}>
        <BurgerIngredients />

        </main>
    </div>
  );
}

export default App;
