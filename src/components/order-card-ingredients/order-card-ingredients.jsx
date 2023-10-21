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


const OrderCardIngredients = ( {  } ) => {
  const dispatch = useDispatch();

  const previewsArray = [one, two, three, four, five, six]
  


  return (
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
    </section>
  );
};

export default OrderCardIngredients;