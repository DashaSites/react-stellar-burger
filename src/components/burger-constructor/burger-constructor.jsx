import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, Counter, DragIcon, CurrencyIcon, LockIcon, DeleteIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data.js";
import Ingredient from "../ingredient/ingredient.jsx";
import PropTypes from "prop-types";

const BurgerConstructor = () => {
 
  // Найдем в массиве data хоть одну булку и назовем ее bunElement:
  const bunElement = data.find((item) => item.type === "bun");
 
  // Из data вытащим массив всех ингредиентов, кроме булок:
  const mainsAndSaucesElements = data.filter((item) => item.type !== "bun");
  


  return (
    <section className={constructorStyles.constructorSection}>

      <div className={constructorStyles.elementsList}>        
        {
          <div className={constructorStyles.fixedElement}>
            <ConstructorElement 
              type="top"
              isLocked={true}
              text={`${bunElement.name} (верх)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
        }
        <ul className={`${constructorStyles.transposableElements} custom-scroll`}> {/* Список начинок и соусов */}
          {
            mainsAndSaucesElements.map((element) => {
              return (
                <li className={constructorStyles.transposableElement} key={element._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement 
                    text={`${element.name} (верх)`}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </li>
              )
            })
          }
        </ul>  
        {
          <div className={constructorStyles.fixedElement}>
            <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={`${bunElement.name} (низ)`}
              price={bunElement.price}
              thumbnail={bunElement.image}
            />
          </div>
        }
      </div>

      <div className={constructorStyles.resultCorner}> {/* Итоги: счетчик и кнопка заказа */}
        <div className={constructorStyles.resultCounter}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }))
}


export default BurgerConstructor;