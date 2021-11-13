import React, { useReducer, useEffect, useState } from "react";

const CartContext = React.createContext([
  {
    item: {
      id: "m2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
    },
    amount: 1,
  },
]);
const reducer = (state, action) => {
  if (action.type === "ADD") {
    let alreadyinCart = false;
    let updatedState;
    if (state.length > 0) {
      updatedState = state.map((cartItem) => {
        if (cartItem.item.id === action.value.item.id) {
          const updatedAmount = cartItem.amount + action.value.amount;
          alreadyinCart = true;
          return { item: cartItem.item, amount: updatedAmount };
        } else return cartItem;
      });
    }
    if (alreadyinCart) return updatedState;
    else return [...state, action.value];
  } else if (action.type === "IN/DECREASE_AMOUNT") {
    console.log("update");
    console.log(action.value.id);
    console.log(action.value.amount);
    const updatedState = state
      .map((cartItem, key, state) => {
        if (cartItem.item.id === action.value.id) {
          const updatedAmount = cartItem.amount + action.value.amount;
          console.log(updatedAmount);
          if (updatedAmount > 0)
            return { item: cartItem.item, amount: updatedAmount };
          else return "removed";
        } else return cartItem;
      })
      .filter((cartItem) => {
        return cartItem != "removed";
      });
    console.log(updatedState);
    return updatedState;
  }
};
export const CartContextProvider = (props) => {
  const [cartContent, dispatchCartContext] = useReducer(reducer, []);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    if (showCart) setShowCart(false);
    else setShowCart(true);
  };

  const getCartSize = () => {
    const temp = cartContent;
    return temp.reduce((total, cartItem) => +total + cartItem.amount, 0);
  };
  const getCartCost = () => {
    const temp = cartContent;
    return temp.reduce(
      (total, cartItem) => +total + cartItem.item.price * cartItem.amount,
      0
    );
  };
  const [cartSize, setCartSize] = useState(getCartSize);
  const [cartCost, setCartCost] = useState(getCartCost);
  useEffect(() => {
    setCartSize(getCartSize());
  }, [cartContent]);
  useEffect(() => {
    setCartCost(getCartCost());
  }, [cartContent]);
  const updateCartHandler = (actionType, value) => {
    dispatchCartContext({ type: actionType, value: value });
  };
  return (
    <CartContext.Provider
      value={{
        cartContent: cartContent,
        updateCart: updateCartHandler,
        cartSize: cartSize,
        showCart: { function: showCartHandler, value: showCart },
        cartCost,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
