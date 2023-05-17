import React from "react";

import Button from "../../UI/Button/Button";
import classes from "./BooksList.module.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText as InputTextPrime } from "primereact/inputtext";
const DUMMY_BOOKS = [
  {
    id: "01",
    title: "title 1",
    author: "author 1",
    category: "cat 1",
    price: 10,
    photo: "",
    version: "1.3",
    older_versions: ["1.0", "1.1", "1.2"],
    edition: "21",
    isbn: "978-3-16-148410-0",
    releaseDate: "10-10-2010",
    brief: "brief 1",
  },
  {
    id: "02",
    title: "title 2",
    author: "author 2",
    category: "cat 2",
    price: 20,
    photo: "",
    version: "1.1",
    older_versions: ["1.0"],
    edition: "22",
    isbn: "978-3-16-148410-0",
    releaseDate: "10-10-2010",
    brief: "brief 2",
  },
  {
    id: "03",
    title: "title 3",
    author: "author 3",
    category: "cat 3",
    price: 30,
    photo: "",
    version: "1.2",
    older_versions: ["1.0"],
    edition: "23",
    isbn: "978-3-16-148410-0",
    releaseDate: "10-10-2010",
    brief: "brief 3",
  },
  {
    id: "04",
    title: "title 4",
    author: "author 4",
    category: "cat 4",
    price: 40,
    photo: "",
    version: "1.2",
    older_versions: ["1.0", "1.1"],
    edition: "24",
    isbn: "978-3-16-148410-0",
    releaseDate: "10-10-2010",
    brief: "brief 4",
  },
  {
    id: "05",
    title: "title 5",
    author: "author 5",
    category: "cat 5",
    price: 50,
    photo: "",
    version: "1.2",
    older_versions: ["1.0", "1.1"],
    edition: "25",
    isbn: "978-3-16-148410-0",
    releaseDate: "10-10-2010",
    brief: "brief 5",
  },
];

const actionsContent = (
  <div className={classes["action-container"]}>
    <button className={classes["action-btn"]}>
      <i className="pi pi-eye" style={{ color: "blue" }}></i>
    </button>
    <button className={classes["action-btn"]}>
      <i className="pi pi-pencil" style={{ color: "green" }}></i>
    </button>
    <button className={classes["action-btn"]}>
      <i className="pi pi-trash" style={{ color: "red" }}></i>
    </button>
  </div>
);

const BooksList = () => {
  return (
    <section className={classes["books-list"]}>
      <h2 className="title">Books</h2>
      <div className={classes["search-bar"]}>
        <span className="p-input-icon-right">
          <i className="pi pi-search" />
          <InputTextPrime placeholder="Search" className="p-inputtext-sm" />
        </span>
        <Button>Add Book</Button>
      </div>
      <DataTable
        className="datatable"
        value={DUMMY_BOOKS}
        key={"id"}
        tableStyle={{
          fontSize: "1rem",
          fontFamily: "Roboto",
        }}
        paginator
        paginatorLeft
        rows={5}
      >
        <Column field="title" header="Book Title"></Column>
        <Column field="category" header="Book Category"></Column>
        <Column field="author" header="Book Author"></Column>
        <Column field="isbn" header="Book ISBN"></Column>
        <Column field="version" header="Book Version"></Column>
        <Column
          field=""
          header="Actions"
          body={actionsContent}
          style={{ minWidth: "120px" }}
        ></Column>
      </DataTable>
    </section>
  );
};

export default BooksList;
