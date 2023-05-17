import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import classes from "./SideBar.module.css";

import acoreLogo from "../../../assets/acore-logo.png";

const SideBar = () => {
  return (
    <aside className={classes["side-bar"]}>
      <div className={classes["logo-container"]}>
        <img src={acoreLogo} alt="acore" />
        <FaChevronLeft />
      </div>

      <div className={classes.tagname}>
        <FaBook style={{ color: "#3C4041" }} />
        <span>Books</span>
      </div>
    </aside>
  );
};

export default SideBar;
