import React from "react";
import orderCardIngredients from "./order-card-ingredients.module.css";
import { useDispatch } from "react-redux";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";



const OrderCardIngredients = ({ ingredients }) => {
  const dispatch = useDispatch();

    // Получаю массив уникальных ингредиентов из заказа:
    const getOrderIngredientsWithoutDuplicates = (orderIngredients) => {
      let orderIngredientsWithoutDuplicates = []; 
  
      orderIngredients.filter((ingredient) => {
        if (!orderIngredientsWithoutDuplicates.includes(ingredient)) {
          orderIngredientsWithoutDuplicates.push(ingredient);
        }
        return orderIngredientsWithoutDuplicates;
      })
      return orderIngredientsWithoutDuplicates;
    }
  
    // "Чистый" (без повторений) массив ингредиентов заказа
    const cleanIngredientsArray = getOrderIngredientsWithoutDuplicates(ingredients);



  return (
    <>
      <section className={orderCardIngredients.section}>
        { // с сервера получила айдишники ингредиентов
          cleanIngredientsArray.map((ingredientId, index) => {
            
            // в цикле через селектор получаю по каждому айдишнику ингредиент,
            // чтобы ниже отрендерить картинки этих ингредиентов
            const elementInOrder = select(ingredientSelector(ingredientId));

            return (
              <div key={index} className={orderCardIngredients.previewBox}>
                <img src={elementInOrder.image} className={orderCardIngredients.previewImage} /> 
              </div>
              )            
            })
        }
        {
          cleanIngredientsArray.length > 6 && (
            <div className={orderCardIngredients.counterContainer}>
              <span className={`${orderCardIngredients.counterOnLastPreview} text text_type_digits-default`}>{`+${ingredients.length - 6}`}</span>
            </div>
          )
        }
      </section>
    </>
  );
};

export default OrderCardIngredients;