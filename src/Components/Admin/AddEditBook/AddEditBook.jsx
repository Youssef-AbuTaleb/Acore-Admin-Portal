import React, { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import classes from "./AddEditBook.module.css";

import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

import { useFormik } from "formik";

const AddEditBook = (props) => {
  // handle image data
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const imageInputChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
  };

  //if props.editMode is true get book data by id and populate it in formik intial values
  //if props.editMode is false get add intial values for inputs in formik
  let bookData;
  let initialValues;
  const { id } = useParams();
  const navigate = useNavigate();

  if (props.editMode) {
    bookData = props.getBookById(id)[0];
    initialValues = {
      title: bookData.title,
      author: bookData.author,
      price: +bookData.price,
      version: bookData.version,
      edition: bookData.edition,
      isbn: bookData.isbn,
      releaseDate: parseDate(bookData.releaseDate),
      brief: bookData.brief,
      olderVersion: bookData.olderVersion,
      category: bookData.category,
    };
  } else {
    initialValues = {
      title: "",
      author: "",
      price: "",
      version: "",
      edition: "",
      isbn: "",
      releaseDate: "",
      brief: "",
      olderVersion: "",
      category: "",
    };
  }

  const formik = useFormik({
    // populate values:
    // - if in editMode take values from props.getBookById
    initialValues: {
      ...initialValues,
    },
    //  handle formik validation cases for inputs
    validate: (data) => {
      let errors = {};

      if (!data.title) {
        errors.title = "Title is required.";
      }
      if (!data.author) {
        errors.author = "Author is required.";
      }
      if (!data.price) {
        errors.price = "Price is required.";
      }
      if (!data.version) {
        errors.version = "Version is required.";
      }
      if (!data.edition) {
        errors.edition = "Edition is required.";
      }
      if (!data.isbn) {
        errors.isbn = "ISBN is required.";
      } else if (data.isbn.trim().length > 13) {
        errors.isbn = "ISBN can not exceeds 13 characters.";
      } else if (data.isbn.trim().length < 10) {
        errors.isbn = "ISBN can not be less than 10 characters.";
      } else if (!/^[0-9-]+$/.test(data.isbn.trim())) {
        errors.isbn = "ISBN can contain numbers and dashes only.";
      }

      if (!data.brief) {
        errors.brief = "Brief is required.";
      }
      if (!data.category) {
        errors.brief = "Category is required.";
      }

      return errors;
    },

    //submit data if valid and navigate to books-list route
    onSubmit: (data) => {
      let formattedData = {
        ...data,
        releaseDate: formatDate(data.releaseDate),
      };
      if (props.editMode) {
        props.editBook(id, formattedData);
      } else {
        props.addBook(formattedData);
      }
      formik.resetForm();
      navigate("/books-list");
    },
  });

  // validation elements
  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  // validation message
  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // function format date to dd-mm-yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  };

  //function convert formatted date to object date
  function parseDate(dateString) {
    const parts = dateString.split("-");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }
  return (
    <section>
      <h2 className="title">{props.editMode ? "Edit Book" : "Add Book"}</h2>
      <Card>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <div className={classes["left-content"]}>
            <InputText
              placeholder="Book title*"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={(e) => {
                formik.setFieldValue("title", e.target.value);
              }}
              className={classNames({
                "p-invalid": isFormFieldInvalid("title"),
              })}
            />
            {getFormErrorMessage("title")}
            <InputText
              placeholder="Book Author*"
              id="author"
              name="author"
              value={formik.values.author}
              onChange={(e) => {
                formik.setFieldValue("author", e.target.value);
              }}
            />
            {getFormErrorMessage("author")}
            <DropdownPrime
              placeholder="Categories*"
              id="category"
              name="category"
              options={[
                "category 1",
                "category 2",
                "category 3",
                "category 4",
                "category 5",
              ]}
              value={formik.values.category}
              onChange={(e) => {
                formik.setFieldValue("category", e.target.value);
              }}
            />
            {getFormErrorMessage("category")}
            <InputNumber
              placeholder="price*"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={(e) => {
                formik.setFieldValue("price", +e.value);
              }}
            />
            {getFormErrorMessage("price")}
            <InputText
              placeholder="Version"
              id="version"
              name="version"
              value={formik.values.version}
              onChange={(e) => {
                formik.setFieldValue("version", e.target.value);
              }}
            />
            {getFormErrorMessage("version")}
            <DropdownPrime
              style={{ marginBottom: "2rem" }}
              id="olderVersion"
              name="olderVersion"
              placeholder="Book Older Version"
              value={formik.values.olderVersion}
              options={[
                "version 1",
                "version 2",
                "version 3",
                "version 4",
                "version 5",
              ]}
              onChange={(e) => {
                formik.setFieldValue("olderVersion", e.value);
              }}
            />
            <InputText
              placeholder="Book Edition"
              id="edition"
              name="edition"
              value={formik.values.edition}
              onChange={(e) => {
                formik.setFieldValue("edition", e.target.value);
              }}
            />
            {getFormErrorMessage("edition")}
            <InputText
              placeholder="Book ISBN"
              id="isbn"
              name="isbn"
              value={formik.values.isbn}
              onChange={(e) => {
                formik.setFieldValue("isbn", e.target.value);
              }}
            />
            {getFormErrorMessage("isbn")}
            <Calendar
              placeholder="Book Release Data"
              id="releaseDate"
              name="releaseDate"
              value={formik.values.releaseDate}
              onChange={(e) => {
                formik.setFieldValue("releaseDate", e.target.value);
              }}
            />
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
              id="brief"
              name="brief"
              placeholder="Book Brief*"
              rows={5}
              cols={30}
              style={{ width: "100%", resize: "none" }}
              value={formik.values.brief}
              onChange={(e) => {
                formik.setFieldValue("brief", e.target.value);
              }}
            />
            {getFormErrorMessage("brief")}
            <div className={classes.actions}>
              <Link to={"/books-list"}>
                <Button type="button" className={classes.cancel}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit">
                {props.editMode ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AddEditBook;
