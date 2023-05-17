import React, { useState, useEffect } from "react";
import ActionsButtons from "./subComponents/ActionsButtons/ActionsButtons";
import Button from "../../UI/Button/Button";
import classes from "./BooksList.module.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText as InputTextPrime } from "primereact/inputtext";
import { Link } from "react-router-dom";

const BooksList = (props) => {
  const [filteredData, setFilteredData] = useState(props.books);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    handleSearch(); // Trigger search when searchValue changes
  }, [searchValue]);

  const handleSearch = () => {
    const filtered = props.books.filter((item) => {
      const searchTerm = searchValue.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const authorMatch = item.author.toLowerCase().includes(searchTerm);
      return titleMatch || authorMatch;
    });
    console.log(filtered);
    setFilteredData(filtered);
  };
  return (
    <section className={classes["books-list"]}>
      <h2 className="title">Books</h2>
      <div className={classes["search-bar"]}>
        <span className="p-input-icon-right">
          <i className="pi pi-search" />
          <InputTextPrime
            onInput={(e) => {
              const value = e.target.value;
              setSearchValue(value);
            }}
            value={searchValue}
            placeholder="Search by title or author"
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
        value={filteredData}
        key={"id"}
        tableStyle={{
          fontSize: "1rem",
          fontFamily: "Roboto",
        }}
        paginator
        paginatorLeft
        rows={6}
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
