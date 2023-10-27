import React, { useRef } from "react";
import orderCardIngredients from "./order-card-ingredients.module.css";
import { useSelector, useDispatch } from "react-redux";
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



const OrderCardIngredients = ( {  } ) => {
  const dispatch = useDispatch();

  const previewsArray = [one, two, three, four, five, six, seven]

  // Если в массиве превьюшек их больше шести, тогда:
  // Затемнить последнюю картинку с превью (опасити 60%) и
  // По центру этой картинки написать "+ число, на которое длинна массива превышает шесть"
  


  return (
    <>
      <section className={orderCardIngredients.section}>
        {
          previewsArray.map((preview, index) => {
            return (
              <div key={index} className={orderCardIngredients.previewBox}>
                <img src={preview} />
              </div>
              )            
            })
        }
        {
          previewsArray.length > 6 && (
            <div className={orderCardIngredients.counterContainer}>
              <span className={`${orderCardIngredients.counterOnLastPreview} text text_type_digits-default`}>+{previewsArray.length - 6}</span>
            </div>
          )
        }
      </section>
    </>
  );
};

export default OrderCardIngredients;