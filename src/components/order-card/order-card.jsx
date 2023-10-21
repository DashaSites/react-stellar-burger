import React, { useRef } from "react";
import orderCardStyles from "./order-card.module.css";
import { useSelector, useDispatch } from "react-redux";


const OrderCard = () => {
  const dispatch = useDispatch();



  return (
    <section className={orderCardStyles.section}>
      <div className={orderCardStyles.container}>

      </div>
    </section>
  );
};

export default OrderCard;