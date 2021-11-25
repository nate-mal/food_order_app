import React, { useContext, useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import CartContext from "../Context/cart-context";
import useHttp from "../../hooks/use-http";
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState();
  const extractMeals = (data) => {
    let mealsData = [];
    for (const mealKey in data) {
      mealsData.push({
        id: mealKey,
        name: data[mealKey].name,
        description: data[mealKey].description,
        price: data[mealKey].price,
      });
    }
    console.log(mealsData);
    setMeals(mealsData);
    return mealsData;
  };

  const { isLoading, error, sendRequest } = useHttp(
    "https://react-http-97ff1-default-rtdb.firebaseio.com/meals.json"
  );
  useEffect(() => {
    sendRequest(undefined, extractMeals);
  }, []);

  const ctxCart = useContext(CartContext);
  const updateCart = (getItem) => {
    const objMeal = { item: getItem.meal, amount: +getItem.amount };
    ctxCart.updateCart("ADD", objMeal);
  };

  return (
    <>
      <MealsSummary />
      <Card className={styles.meals}>
        <ul>
          {meals &&
            meals.map((meal) => {
              return (
                <MealItem
                  onAddToCart={updateCart}
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  meal={meal}
                />
              );
            })}
          {!meals && !isLoading && !error && <p>The menu list is empty</p>}
          {isLoading && <p className={styles.center}>Is loading...</p>}
          {error && (
            <p className={styles["text-error"]}>
              Something went wrong when fetching the data: {error}
            </p>
          )}
        </ul>
      </Card>
    </>
  );
};

export default AvailableMeals;
