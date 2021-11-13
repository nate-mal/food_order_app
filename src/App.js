import React, { useState, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import AvailableMeals from "./components/Meals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartContext from "./components/Context/cart-context";
function App() {
  const ctxCart = useContext(CartContext);

  return (
    <React.Fragment>
      <Header />
      {ctxCart.showCart.value && <Cart />}
      <AvailableMeals />
    </React.Fragment>
  );
}

export default App;
