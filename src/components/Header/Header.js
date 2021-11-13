import React from "react";
import styles from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <HeaderCartButton className={styles["header__button"]} />
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
    </>
  );
};

export default Header;
