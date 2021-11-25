import { useState } from "react";

const useInput = (validation) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validation(value);
  const isInvalid = isTouched && !isValid;

  const changeInputValue = (event) => {
    setValue(event.target.value);
  };
  const blurInputValue = () => {
    setIsTouched(true);
  };
  return { value, isValid, isInvalid, changeInputValue, blurInputValue };
};

export default useInput;
