import React, { useContext } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import { DUMMY_MEALS } from "./dummy-meals";
import CartContext from "../Context/cart-context";
const AvailableMeals = (props) => {
  const ctxCart = useContext(CartContext);
  const updateCart = (getItem) => {
    const addMeal = DUMMY_MEALS.filter((meal) => meal.id === getItem.id)[0];
    const amount = +getItem.amount;
    console.log(getItem.id);
    console.log(addMeal);
    const mealObj = { item: addMeal, amount: amount };
    console.log(mealObj);
    ctxCart.updateCart("ADD", mealObj);
  };
  return (
    <>
      <MealsSummary></MealsSummary>
      <Card className={styles.meals}>
        <ul>
          {DUMMY_MEALS.map((meal) => {
            return (
              <MealItem
                onAddToCart={updateCart}
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </>
  );
};

export default AvailableMeals;
