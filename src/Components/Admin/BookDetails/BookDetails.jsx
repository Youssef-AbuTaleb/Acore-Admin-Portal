import React from "react";

import { useParams, useNavigate } from "react-router-dom";

import classes from "./BookDetails.module.css";
import bookCover from "../../../assets/dead-astronauts.jpg";

import { confirmDialog } from "primereact/confirmdialog";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

const BookDetails = (props) => {
  const { id } = useParams();

  const [bookData] = props.books.filter((book) => book.id === id);

  const navigate = useNavigate();

  const accept = () => {
    props.deleteBook(id);
    navigate("/books-list");
  };
  const reject = () => {};

  const deleteConfirm = () => {
    confirmDialog({
      id: Math.random(),
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <section>
      <h2 className="title">Book Details</h2>
      <Card className={classes.details}>
        <div className={classes["upper-content"]}>
          <img className={classes.cover} src={bookCover} alt="book cover" />
          <div className={classes["details-grp-1"]}>
            <h3 className={classes["book-name"]}>{bookData.title}</h3>
            <div className={classes["book-detail-container"]}>
              <div className={classes["book-detail"]}>
                <p>478</p>
                <p>pages</p>
              </div>
              <div className={classes["book-detail"]}>
                <p>20h</p>
                <p>To read</p>
              </div>
            </div>
          </div>
          <div className={classes.actions}>
            <Button className={classes.delete} onClick={deleteConfirm}>
              Delete
            </Button>
            <Button className={classes.edit}>Edit</Button>
          </div>
        </div>
        <div className={classes["lower-content"]}>
          <div>
            <p className={classes["name-release"]}>
              <span>By {bookData.author}</span>
              <span>|</span>
              <span>{bookData.releaseDate}</span>
            </p>
            <p className={classes.price}>$ {bookData.price}</p>
            <p>ISBN: {bookData.isbn}</p>
            <p>Version: {bookData.version}</p>
            <p>
              <span className={classes.category}>{bookData.category}</span>
            </p>
          </div>
          <div>
            <h3>Brief</h3>
            <p>{bookData.brief}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default BookDetails;
