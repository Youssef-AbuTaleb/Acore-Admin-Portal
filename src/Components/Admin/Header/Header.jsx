import React, { useContext, useState } from "react";
import classes from "./Header.module.css";
import Card from "../../UI/Card/Card";
import AuthContext from "../../../stores/auth-context";
const Header = () => {
  const [dropDownVisibility, setDropdownVisibility] = useState(false);

  const authCtx = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownVisibility((prevValue) => {
      return !prevValue;
    });
  };

  const logout = () => {
    authCtx.onLogout();
  };
  return (
    <header className={classes["admin-header"]}>
      <h1 className="heading">Acore admin dashboard</h1>
      <div className={classes.dropdown}>
        <button className={classes["dropdown-btn"]} onClick={toggleDropdown}>
          Super Admin
        </button>
        <Card
          className={`${classes["drop-down-options"]} ${
            dropDownVisibility ? classes["show"] : ""
          }`}
        >
          <p>admin@example.com</p>
          <button onClick={logout}>Logout</button>
        </Card>
      </div>
    </header>
  );
};

export default Header;
