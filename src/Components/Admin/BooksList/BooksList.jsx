import React from "react";
import ActionsButtons from "./subComponents/ActionsButtons/ActionsButtons";
import Button from "../../UI/Button/Button";
import classes from "./BooksList.module.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText as InputTextPrime } from "primereact/inputtext";
import { Link } from "react-router-dom";

const BooksList = (props) => {
  return (
    <section className={classes["books-list"]}>
      <h2 className="title">Books</h2>
      <div className={classes["search-bar"]}>
        <span className="p-input-icon-right">
          <i className="pi pi-search" />
          <InputTextPrime
            placeholder="Search"
            className="p-inputtext-sm"
            style={{ backgroundColor: "white" }}
          />
        </span>
        <Link to={"/add-book"}>
          <Button>Add Book</Button>
        </Link>
      </div>
      <DataTable
        className="datatable"
        value={props.books}
        key={"id"}
        tableStyle={{
          fontSize: "1rem",
          fontFamily: "Roboto",
        }}
        paginator
        paginatorLeft
        rows={5}
        emptyMessage="No Books found."
      >
        <Column field="title" header="Book Title"></Column>
        <Column field="category" header="Book Category"></Column>
        <Column field="author" header="Book Author"></Column>
        <Column field="isbn" header="Book ISBN"></Column>
        <Column field="version" header="Book Version"></Column>
        <Column
          field="id"
          header="Actions"
          body={(rowData) => (
            <ActionsButtons rowData={rowData} deleteBook={props.deleteBook} />
          )}
          style={{ minWidth: "120px" }}
        ></Column>
      </DataTable>
    </section>
  );
};

export default BooksList;
