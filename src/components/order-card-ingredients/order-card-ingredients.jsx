import React, { useRef } from "react";
import orderCardIngredients from "./order-card-ingredients.module.css";
import { useSelector, useDispatch } from "react-redux";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";
//import {  
//} from "@ya.praktikum/react-developer-burger-ui-components";
import one from "../../images/ingredient-previews/one.png";
import two from "../../images/ingredient-previews/two.png";
import three from "../../images/ingredient-previews/three.png";
import four from "../../images/ingredient-previews/four.png";
import five from "../../images/ingredient-previews/five.png";
import six from "../../images/ingredient-previews/six.png";
import seven from "../../images/ingredient-previews/seven.png";
import eight from "../../images/ingredient-previews/eight.png";
import nine from "../../images/ingredient-previews/nine.png";



const OrderCardIngredients = ( { ingredients } ) => {
  const dispatch = useDispatch();


  // Если в массиве превьюшек их больше шести, тогда:
  // Затемнить последнюю картинку с превью (опасити 60%) и
  // По центру этой картинки написать "+ число, на которое длинна массива превышает шесть"
  
// найти картинки ингредиентов по айдишнику

  return (
    <>
      <section className={orderCardIngredients.section}>
        { // с сервера получила айдишники ингредиентов
          ingredients.map((ingredientId, index) => {
            
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
          ingredients.length > 6 && (
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