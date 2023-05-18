import React, {
  useReducer,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import Button from "../../Components/UI/Button/Button";
import AuthContext from "../../stores/auth-context";
import bookShelfImage from "../../assets/booksShelf2.jpg";
import acoreIcon from "../../assets/acore-logo.png";

const initialState = { value: "", isValid: null };

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;

const emailReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        value: action.payload,
        isValid: emailRegex.test(action.payload),
      };
    case "INPUT_BLURRED":
      return {
        value: state.value,
        isValid: emailRegex.test(state.value),
      };
    default:
      return initialState;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        value: action.payload,
        isValid: action.payload.trim().length >= 6,
      };
    case "INPUT_BLURRED":
      return {
        value: state.value,
        isValid: state.value.trim().length >= 6,
      };
    default:
      return initialState;
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailState] = useReducer(
    emailReducer,
    initialState
  );
  const [passwordState, dispatchPasswordState] = useReducer(
    passwordReducer,
    initialState
  );
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    setFormIsValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);

  const handleChange = (type, value) => {
    if (type === "email") {
      dispatchEmailState({ type: "INPUT_CHANGE", payload: value });
    } else if (type === "password") {
      dispatchPasswordState({ type: "INPUT_CHANGE", payload: value });
    }
  };

  const handleBlur = (type) => {
    if (type === "email") {
      dispatchEmailState({ type: "INPUT_BLURRED" });
    } else if (type === "password") {
      dispatchPasswordState({ type: "INPUT_BLURRED" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else {
      if (!emailState.isValid) {
        emailInputRef.current.focus();
        if (emailState.value === "") {
          dispatchEmailState({ type: "INPUT_BLURRED" });
        }
      } else {
        passwordInputRef.current.focus();
        if (passwordState.value === "") {
          dispatchPasswordState({ type: "INPUT_BLURRED" });
        }
      }
    }
  };

  return (
    <section className={classes.login}>
      <Card className={classes["login-card"]}>
        <div
          className={`${classes["login-left-content"]} ${classes["flex-left-column"]}`}
        >
          <form
            className={`${classes["login-form"]} ${classes["flex-left-column"]}`}
            onSubmit={handleSubmit}
          >
            <h1 className="heading">
              Please enter your email address and password to access your
              account
            </h1>
            <Input
              inputId="email"
              placeholder="Email address"
              inputType="email"
              ref={emailInputRef}
              inputValue={emailState.value}
              inputIsValid={emailState.isValid}
              inputChangeHandler={(event) =>
                handleChange("email", event.target.value)
              }
              inputBlurHandler={() => handleBlur("email")}
            />
            <Input
              inputId="password"
              placeholder="Password"
              inputType="password"
              ref={passwordInputRef}
              inputValue={passwordState.value}
              inputIsValid={passwordState.isValid}
              inputChangeHandler={(event) =>
                handleChange("password", event.target.value)
              }
              inputBlurHandler={() => handleBlur("password")}
            />

            <a href="#forget_password_page">Forget Password</a>
            <Button className={classes["submit-btn"]} type="submit">
              Sign In
            </Button>
          </form>
          <hr />
          <img src={acoreIcon} alt="acore" width={100} />
        </div>
        <div className={classes["login-right-content"]}>
          <img
            src={bookShelfImage}
            alt="shelf of books"
            className={classes["overlay-image"]}
          />
          <div className={classes["color-overlay"]}></div>
        </div>
      </Card>
    </section>
  );
};

export default Login;

// import React, {
//   useReducer,
//   useState,
//   useContext,
//   useEffect,
//   useRef,
// } from "react";

// import classes from "./Login.module.css";

// import Input from "../UI/Input/Input";
// import Card from "../UI/Card/Card";
// import Button from "../../Components/UI/Button/Button";
// import AuthContext from "../../stores/auth-context";

// import bookShelfImage from "../../assets/booksShelf2.jpg";
// import acoreIcon from "../../assets/acore-logo.png";

// const intialState = { value: "", isValid: null };

// const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;

// const emailReducer = (state, action) => {
//   if (action.type === "INPUT_CHANGE") {
//     return {
//       value: action.payload,
//       isValid: emailRegex.test(action.payload),
//     };
//   }
//   if (action.type === "INPUT_BLURRED") {
//     return {
//       value: state.value,
//       isValid: emailRegex.test(state.value),
//     };
//   }
//   return intialState;
// };
// const passwordReducer = (state, action) => {
//   if (action.type === "INPUT_CHANGE") {
//     return {
//       value: action.payload,
//       isValid: action.payload.trim().length >= 6,
//     };
//   }
//   if (action.type === "INPUT_BLURRED") {
//     return {
//       value: state.value,
//       isValid: state.value.trim().length >= 6,
//     };
//   }

//   return intialState;
// };

// const Login = () => {
//   const [formIsValid, setFormIsValid] = useState(false);
//   const [emailState, dispatchEmailState] = useReducer(
//     emailReducer,
//     intialState
//   );
//   const [passwordState, dispatchPasswordState] = useReducer(
//     passwordReducer,
//     intialState
//   );

//   const authCtx = useContext(AuthContext);

//   useEffect(() => {
//     setFormIsValid(emailState.isValid && passwordState.isValid);
//   }, [emailState.isValid, passwordState.isValid]);

//   const emailChangeHandler = (event) => {
//     dispatchEmailState({ type: "INPUT_CHANGE", payload: event.target.value });
//   };

//   const passwordChangeHandler = (event) => {
//     dispatchPasswordState({
//       type: "INPUT_CHANGE",
//       payload: event.target.value,
//     });
//   };

//   const validateEmailHandler = () => {
//     dispatchEmailState({ type: "INPUT_BLURRED" });
//   };

//   const validatePasswordHandler = () => {
//     dispatchPasswordState({ type: "INPUT_BLURRED" });
//   };

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (formIsValid) {
//       authCtx.onLogin(emailState.value, passwordState.value);
//     } else if (!emailState.isValid) {
//       emailInputRef.current.focus();
//       if (emailState.value === "") {
//         dispatchEmailState({ type: "INPUT_BLURRED" });
//       }
//     } else {
//       if (passwordState.value === "") {
//         dispatchPasswordState({ type: "INPUT_BLURRED" });
//       }
//       passwordInputRef.current.focus();
//     }
//   };
//   return (
//     <section className={classes.login}>
//       <Card className={classes["login-card"]}>
//         <div
//           className={`${classes["login-left-content"]} ${classes["flex-left-column"]}`}
//         >
//           <form
//             className={`${classes["login-form"]} ${classes["flex-left-column"]}`}
//           >
//             <h1 className="heading">
//               Please enter your email address and password to access your
//               account
//             </h1>
//             <Input
//               inputId="email"
//               placeholder="Email address"
//               inputType="email"
//               ref={emailInputRef}
//               inputValue={emailState.value}
//               inputIsValid={emailState.isValid}
//               inputChangeHandler={emailChangeHandler}
//               inputBlurHandler={validateEmailHandler}
//             />
//             <Input
//               inputId="password"
//               placeholder="Password"
//               inputType="password"
//               ref={passwordInputRef}
//               inputValue={passwordState.value}
//               inputIsValid={passwordState.isValid}
//               inputChangeHandler={passwordChangeHandler}
//               inputBlurHandler={validatePasswordHandler}
//             />

//             <a href="#forget_password_page">Forget Password</a>
//             <Button
//               className={classes["submit-btn"]}
//               type="submit"
//               onClick={submitHandler}
//             >
//               Sign In
//             </Button>
//           </form>
//           <hr />
//           <img src={acoreIcon} alt="acore" width={100} />
//         </div>
//         <div className={classes["login-right-content"]}>
//           <img
//             src={bookShelfImage}
//             alt="shelf of books"
//             className={classes["overlay-image"]}
//           />
//           <div className={classes["color-overlay"]}></div>
//         </div>
//       </Card>
//     </section>
//   );
// };

// export default Login;
