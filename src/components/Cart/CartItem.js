import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../Context/cart-context";
const CartItem = (props) => {
  const ctxCart = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const increaseAmountHandler = () => {
    ctxCart.updateCart("IN/DECREASE_AMOUNT", { id: props.id, amount: +1 });
  };
  const decreaseAmountHandler = () => {
    ctxCart.updateCart("IN/DECREASE_AMOUNT", { id: props.id, amount: -1 });
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={decreaseAmountHandler}>−</button>
        <button onClick={increaseAmountHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
