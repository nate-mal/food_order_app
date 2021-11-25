import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";
import styles_cart from "./Cart.module.css";
import CartContext from "../Context/cart-context";

const Checkout = (props) => {
  const ctxCart = useContext(CartContext);
  const sendOrderHandler = () => {
    ctxCart.showCart.function();
    console.log(ctxCart.CartContent);
  };
  const {
    value: value_name,
    isValid: isValid_name,
    isInvalid: isInvalid_name,
    changeInputValue: changeInputValue_name,
    blurInputValue: blurInputValue_name,
  } = useInput((value) => {
    return value.trim() !== "";
  });
  const {
    value: value_email,
    isValid: isValid_email,
    isInvalid: isInvalid_email,
    changeInputValue: changeInputValue_email,
    blurInputValue: blurInputValue_email,
  } = useInput((value) => {
    return value.includes("@");
  });
  const getAction = () => {
    return (
      <div className={styles_cart.actions}>
        <button
          onClick={sendOrderHandler}
          type="button"
          className={styles_cart["button--alt"]}
        >
          Send Order
        </button>
      </div>
    );
  };
  return (
    <Modal onBlur={props.onBlur}>
      <Card>
        <div
          className={`${styles["form-control"]} ${
            isInvalid_name && styles.invalid
          }`}
        >
          <label htmlFor="name">Your name</label>
          <input
            value={value_name}
            onChange={changeInputValue_name}
            onBlur={blurInputValue_name}
            id="name"
          />
          {isInvalid_name && (
            <p className={styles["error-text"]}>
              Name field cannot be empty! Please provide one
            </p>
          )}
        </div>
        <div
          className={`${styles["form-control"]} ${
            isInvalid_email && styles.invalid
          }`}
        >
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            value={value_email}
            onChange={changeInputValue_email}
            onBlur={blurInputValue_email}
          />
          {isInvalid_email && (
            <p className={styles["error-text"]}>
              Please provide a valid mail(a valid e-mail address should contain
              "@" character)
            </p>
          )}
        </div>
        {getAction()}
      </Card>
    </Modal>
  );
};

export default Checkout;
