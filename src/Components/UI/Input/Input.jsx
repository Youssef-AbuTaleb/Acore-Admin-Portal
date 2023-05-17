import React, { useRef, useImperativeHandle, useState } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return { focus: focusInput };
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <div
        className={`${classes.control} ${
          props.inputIsValid === false ? classes.invalid : ""
        }`}
      >
        <input
          ref={inputRef}
          type={
            props.inputType !== "password"
              ? props.inputType
              : passwordVisible
              ? "text"
              : "password"
          }
          id={props.inputId}
          placeholder={props.placeholder}
          value={props.inputValue}
          onChange={props.inputChangeHandler}
          onBlur={props.inputBlurHandler}
        />
        {/* if input of type password add show button */}
        {props.inputType === "password" && (
          <button
            type="button"
            className={classes["show-btn"]}
            onClick={togglePasswordVisibility}
          >
            Show
          </button>
        )}
      </div>
      {/* ERROR MESSAGE */}
      {
        <p
          className={`${classes["invalid-message"]} ${
            props.inputIsValid === false ? classes.show : ""
          }`}
        >
          {props.inputType !== "password"
            ? `Email is ${props.inputValue === "" ? "requried" : "invalid"}`
            : `${
                props.inputValue === ""
                  ? "password is requried"
                  : "password mut be alteast 6 characters"
              }`}
        </p>
      }
    </>
  );
});

export default Input;
