import React from "react";
import orderInfoStyles from "./order-full-info.module.css";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { orderSelector } from "../../services/selector/ordersSelectors.js";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";

import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import two from "../../images/ingredient-previews/two.png";
import three from "../../images/ingredient-previews/three.png";
import six from "../../images/ingredient-previews/six.png";


const OrderFullInfo = () => {

  const { orderNumber } = useParams();



  // КЛИКНУТЫЙ ЗАКАЗ
  // Беру детали заказа из стора: вытаскиваю их через селектор, 
  // который по номеру заказа возвращает весь заказ целиком
  const order = useSelector(orderSelector(orderNumber)); 

  const orderIngredients = order?.ingredients.map((ingredientId) => {
    const orderIngredient = select(ingredientSelector(ingredientId));
    return orderIngredient;
  }) ?? []



  



  const displayDate = () => {
    const today = new Date()
    return (
      <FormattedDate
        date={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes() - 1,
            0,
          )
        }
      />
    )
  }







  return (
    <article className={orderInfoStyles.container}>

      <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default`}>{`#${orderNumber}`}</p>

      <h2 className={`${orderInfoStyles.orderName} text text_type_main-medium mb-3`}>
        {order.name}
      </h2>

      <p className={`${orderInfoStyles.orderStatus} text text_type_main-default mb-15`}>{order.status}</p>

      <h2 className="text text_type_main-medium mb-6">
        Состав
      </h2>

      <ul className={`${orderInfoStyles.orderIngredientsList} custom-scroll`}>
      {
        orderIngredients.map((ingredient) => {
          return (
            <li>
          <div className={orderInfoStyles.orderIngredient}>
            <img className={orderInfoStyles.ingredientPreview} src={ingredient.image} />
            <p className={`${orderInfoStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
            <div className={orderInfoStyles.ingredientCountContainer}>
              <p className="text text_type_digits-default mr-2">{ingredient.times} x {ingredient.price}</p>
              <CurrencyIcon />
            </div>
          </div>
        </li>
          )
        })
      }
      </ul>

      <div className={orderInfoStyles.timeAndTotalPriceContainer}>
        <p className={`${orderInfoStyles.orderTime} text text_type_main-default text_color_inactive`}>{displayDate()}</p>
        <div className={orderInfoStyles.totalPriceContainer}>
          <p className={`${orderInfoStyles.totalPrice} text text_type_digits-default`}>345</p>
          <CurrencyIcon />
        </div>
      </div>




    </article>
  );
};

export default OrderFullInfo;