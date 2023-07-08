import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = ({ ingredients, onButtonClick }) => {
  // Найдем в данных (если они загрузились) хоть одну булку:
  const bunElement = ingredients.length > 0 && ingredients.find((item) => item.type === "bun");

  // Из данных вытащим массив всех остальных ингредиентов, кроме булок:
  const mainsAndSaucesElements = ingredients.filter((item) => item.type !== "bun");
  

  return (
    <section className={`${constructorStyles.constructorSection} pt-25`}>
    <div className={`${constructorStyles.elementsList} mb-10`}>        
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
              <li className={`${constructorStyles.transposableElement} mt-4`} key={element._id}>
                <DragIcon type="primary" />
                <ConstructorElement 
                  text={element.name}
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
    <div className={constructorStyles.resultCorner}>
      <div className={`${constructorStyles.resultCounter} mr-10`}>
        <span className="text text_type_digits-medium">610</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onButtonClick}>
        Оформить заказ
      </Button>
    </div>
  </section>
  )
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })).isRequired,
  onButtonClick: PropTypes.func.isRequired
}


export default BurgerConstructor;