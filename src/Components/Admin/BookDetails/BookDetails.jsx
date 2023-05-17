import React from "react";

import classes from "./BookDetails.module.css";
import bookCover from "../../../assets/dead-astronauts.jpg";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
const BookDetails = () => {
  return (
    <section>
      <h2 className="title">Book Details</h2>
      <Card className={classes.details}>
        <div className={classes["upper-content"]}>
          <img className={classes.cover} src={bookCover} alt="book cover" />
          <div className={classes["details-grp-1"]}>
            <h3 className={classes["book-name"]}>Dead Astronauts</h3>
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
            <Button className={classes.delete}>Delete</Button>
            <Button className={classes.edit}>Edit</Button>
          </div>
        </div>
        <div className={classes["lower-content"]}>
          <div>
            <p className={classes["name-release"]}>
              <span>By Pauline Jeannette celine</span>
              <span>|</span>
              <span>27th March 2023</span>
            </p>
            <p className={classes.price}>$ 1</p>
            <p>ISBN: 232664164</p>
            <p>Version: 1</p>
            <p>
              <span className={classes.category} s>
                Medical gentics
              </span>
            </p>
          </div>
          <div>
            <h3>Brief</h3>
            <p>Book brief should be added here</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default BookDetails;
