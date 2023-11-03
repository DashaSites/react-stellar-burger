import React from "react";
import orderCardStyles from "./order-card.module.css";
import { useDispatch } from "react-redux";
import {
  FormattedDate, 
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCardIngredients from "../../components/order-card-ingredients/order-card-ingredients.jsx";
import { useLocation, Link, useResolvedPath, useMatch } from 'react-router-dom';
import { select } from "../../services/store/store.js";
import { ingredientSelector, orderPriceSelector } from "../../services/selector/ingredientsSelectors.js";


const OrderCard = ({ orderNumber, title, time, ingredients }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // хук useResolvedPath возвращает объект данных, 
  // в котором с помощью pathname можно получить текущий путь в адресной строке:
  const match = useResolvedPath("").pathname;
  console.log(match);

  const matchFeed = useMatch("/feed");
  const matchProfileOrders = useMatch("/profile/orders");


  
// ЗДЕСЬ БЫЛА ОШИБКА. ЧТО ЗА?
  // Массив ingredients, пришедший с сервера, - это массив id ингредиентов, а не их объектов целиком
  const ingredientsInOrder = ingredients.map((ingredientId) => {
    const ingredient = select(ingredientSelector(ingredientId));
    return ingredient;
  });
  

  const ingredientsIdsInOrder = ingredientsInOrder.map((ingredient) => {
    return ingredient._id;
  })
  

  const orderPrice = select(orderPriceSelector(ingredientsIdsInOrder));




/*
  ГДЕ СДЕЛАТЬ ТАКУЮ ПРОВЕРКУ?
    order !== undefined && 
    order !== null && 
*/

const isNoNullIngredient = (ingredients) => {
  const boolsArray = ingredients.map((ingredient) => ingredient != null);
  return !boolsArray.includes(false);
}


const checkOrderValidity = (orderNumberFromServer, titleFromServer, ingredientsInOrder) => {
  return (
    orderNumberFromServer !== null &&
    orderNumberFromServer !== undefined &&
    titleFromServer !== null &&
    titleFromServer !== undefined &&
    ingredientsInOrder !== null &&
    ingredientsInOrder !== undefined &&
    ingredientsInOrder.length >= 3 &&
    isNoNullIngredient(ingredients)
  )
}

const isCheckOrderValitityPassed = checkOrderValidity(orderNumber, title, ingredients);


if (!isCheckOrderValitityPassed) {
  return null;
}


return (
    <>
    {matchFeed && (
      <Link
      // Тут мы формируем динамический путь для нашего заказа
        to={`/feed/${orderNumber}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
        state={{ background: location }}
        className={orderCardStyles.link}
      >
        <section className={orderCardStyles.section}>
        <div className={orderCardStyles.container}>
          <div className={`${orderCardStyles.numberAndDate} mb-6`}>
            <p className="text text_type_digits-default">#{orderNumber}</p>
            <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
          </div>
          <p className="text text_type_main-medium mb-6">{title}</p>
          <div className={orderCardStyles.ingredientsAndCounter}>
            <OrderCardIngredients ingredients={ingredients} />
            <div className={orderCardStyles.orderCounter}>
              <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </section>
    </Link>
    )}

    {matchProfileOrders && (
      <Link
      // Тут мы формируем динамический путь для нашего заказа
        to={`/profile/orders/${orderNumber}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
        state={{ background: location }}
        className={orderCardStyles.link}
      >
        <section className={orderCardStyles.section}>
        <div className={orderCardStyles.container}>
          <div className={`${orderCardStyles.numberAndDate} mb-6`}>
            <p className="text text_type_digits-default">{orderNumber}</p>
            <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
          </div>
          <p className="text text_type_main-medium mb-6">{title}</p>
          <div className={orderCardStyles.ingredientsAndCounter}>
            <OrderCardIngredients ingredients={ingredients} />
            <div className={orderCardStyles.orderCounter}>
              <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </section>
    </Link>
    )}
  </>
)



/*
  return (
    <>
      {matchFeed && (
        <Link
        // Тут мы формируем динамический путь для нашего заказа
          to={`/feed/${orderNumber}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
          state={{ background: location }}
          className={orderCardStyles.link}
        >
          <section className={orderCardStyles.section}>
          <div className={orderCardStyles.container}>
            <div className={`${orderCardStyles.numberAndDate} mb-6`}>
              <p className="text text_type_digits-default">#{orderNumber}</p>
              <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
            </div>
            <p className="text text_type_main-medium mb-6">{title}</p>
            <div className={orderCardStyles.ingredientsAndCounter}>
              <OrderCardIngredients ingredients={ingredients} />
              <div className={orderCardStyles.orderCounter}>
                <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        </section>
      </Link>
      )}

      {matchProfileOrders && (
        <Link
        // Тут мы формируем динамический путь для нашего заказа
          to={`/profile/orders/${orderNumber}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
          state={{ background: location }}
          className={orderCardStyles.link}
        >
          <section className={orderCardStyles.section}>
          <div className={orderCardStyles.container}>
            <div className={`${orderCardStyles.numberAndDate} mb-6`}>
              <p className="text text_type_digits-default">{orderNumber}</p>
              <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
            </div>
            <p className="text text_type_main-medium mb-6">{title}</p>
            <div className={orderCardStyles.ingredientsAndCounter}>
              <OrderCardIngredients ingredients={ingredients} />
              <div className={orderCardStyles.orderCounter}>
                <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        </section>
      </Link>
      )}
    </>
  );
*/




};

export default OrderCard;


















{/*
<Link
// Тут мы формируем динамический путь для нашего заказа

// !!! ПРИДУМАТЬ, КАК ЗДЕСЬ НАПИСАТЬ РАЗВИЛКУ, -- c использованием location или match! 
// ЧТОБЫ С profile/orders ДИНАМИЧЕСКИЙ ПУТЬ БЫЛ ДРУГОЙ!!!
to={`/feed/${orderNumber}`}
// а также сохраняем в свойство background роут,
// на котором была открыта наша модалка
state={{ background: location }}
className={orderCardStyles.link}
>
<section className={orderCardStyles.section}>
  <div className={orderCardStyles.container}>
    <div className={`${orderCardStyles.numberAndDate} mb-6`}>
      <p className="text text_type_digits-default">{orderNumber}</p>
      <span className={`${orderCardStyles.formattedDate} text text_type_main-default`}>{date()}</span>
    </div>
    <p className="text text_type_main-medium mb-6">{title}</p>
    <div className={orderCardStyles.ingredientsAndCounter}>
      <OrderCardIngredients />
      <div className={orderCardStyles.orderCounter}>
        <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{counter}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  </div>
</section>
</Link>
*/}