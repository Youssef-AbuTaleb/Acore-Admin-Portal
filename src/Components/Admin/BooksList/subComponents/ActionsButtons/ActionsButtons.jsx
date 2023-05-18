import React from "react";
import { Link } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import classes from "./ActionsButtons.module.css";

const ActionsButtons = (props) => {
  const { id } = props.rowData;

  const deleteConfirm = () => {
    confirmDialog({
      id: props.rowData.id,
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => props.deleteBook(id),
    });
  };
  return (
    <div className={classes["action-container"]}>
      <Link to={`/book-details/${props.rowData.id}`}>
        <button className={classes["action-btn"]}>
          <i className="pi pi-eye" style={{ color: "blue" }}></i>
        </button>
      </Link>
      <Link to={`/edit-book/${props.rowData.id}`}>
        <button className={classes["action-btn"]}>
          <i className="pi pi-pencil" style={{ color: "green" }}></i>
        </button>
      </Link>
      <button className={classes["action-btn"]} onClick={deleteConfirm}>
        <i className="pi pi-trash" style={{ color: "red" }}></i>
      </button>
    </div>
  );
};

export default ActionsButtons;
