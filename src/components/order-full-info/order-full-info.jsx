import React from "react";
import orderInfoStyles from "./order-full-info.module.css";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import two from "../../images/ingredient-previews/two.png";
import three from "../../images/ingredient-previews/three.png";
import six from "../../images/ingredient-previews/six.png";


const OrderFullInfo = () => {

  //const { ingredientId } = useParams();

  // КЛИКНУТЫЙ ЗАКАЗ
  // Надо его откуда-то получить (с сервера)
  const order = {};


  // Захардкоженные ингредиенты, их надо заменить данными с сервера
  const orderIngredients = [
    {
      src: two,
      name: "Кот",
      times: 3,
      price: 546
    },

    {
      src: three,
      name: "Еж",
      times: 6,
      price: 43
    },

    {
      src: six,
      name: "Белка",
      times: 5,
      price: 779
    },

    {
      src: three,
      name: "Лис",
      times: 4,
      price: 1245
    }
  ]


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

      <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default`}>#034533</p>

      <h2 className={`${orderInfoStyles.orderName} text text_type_main-medium mb-3`}>
        Black Hole Singularity острый бургер
      </h2>

      <p className={`${orderInfoStyles.orderStatus} text text_type_main-default mb-15`}>Выполнен</p>

      <h2 className="text text_type_main-medium mb-6">
        Состав
      </h2>

      <ul className={`${orderInfoStyles.orderIngredientsList} custom-scroll`}>
      {
        orderIngredients.map((ingredient) => {
          return (
            <li>
          <div className={orderInfoStyles.orderIngredient}>
            <img className={orderInfoStyles.ingredientPreview} src={ingredient.src} />
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