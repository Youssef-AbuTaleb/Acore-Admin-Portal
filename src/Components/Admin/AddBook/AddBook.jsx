import React, { useRef } from "react";

import classes from "./AddBook.module.css";

import { Link } from "react-router-dom";

import Button from "../../UI/Button/Button";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Card from "../../UI/Card/Card";

const AddBook = (props) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const imageInputChangeHandler = (event) => {
    console.log(event);
    const file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    console.log(file.name);
  };

  const submitDataHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h2 className="title">Add Book</h2>
      <Card>
        <form className={classes.form} onSubmit={submitDataHandler}>
          <div className={classes["left-content"]}>
            <InputText placeholder="Book title*" />
            <InputText placeholder="Book Author*" />
            <DropdownPrime placeholder="Categories*" />
            <InputNumber placeholder="price*" />
            <InputText placeholder="Version" />
            <DropdownPrime placeholder="Book Older Version" />
            <InputText placeholder="Book Edition" />
            <InputText placeholder="Book ISBN" />
            <Calendar placeholder="Book Release Data" />
          </div>
          <div className={classes["right-content"]}>
            <div className={classes["preview-image"]}></div>
            <p>Best Diemensions for book cover image is 128*200</p>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              className={classes["file-input"]}
              accept="image/*"
              type="file"
              onChange={imageInputChangeHandler}
            />
            <button
              className={classes["upload-btn"]}
              type="button"
              onClick={handleButtonClick}
            >
              Upload Book Cover*
            </button>
            <p>imageName.png</p>
            <InputTextarea
              placeholder="Book Brief*"
              rows={5}
              cols={30}
              style={{ width: "100%", resize: "none" }}
            />
            <div className={classes.actions}>
              <Link to={"/books-list"}>
                <Button type="button" className={classes.cancel}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AddBook;
