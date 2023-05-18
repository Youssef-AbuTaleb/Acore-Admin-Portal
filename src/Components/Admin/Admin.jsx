import React, { useState } from "react";
import DUMMY_BOOKS_JSON from "./DUMMY_BOOKS.json";
import { ConfirmDialog } from "primereact/confirmdialog";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import classes from "./Admin.module.css";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import AddEditBook from "./AddEditBook/AddEditBook";
import BooksList from "./BooksList/BooksList";
import BookDetails from "./BookDetails/BookDetails";

console.log(DUMMY_BOOKS_JSON);

let DUMMY_BOOKS = DUMMY_BOOKS_JSON;

const Admin = () => {
  const [booksState, setBooksState] = useState(DUMMY_BOOKS);

  const deleteBook = (bookId) => {
    setBooksState((prevState) =>
      prevState.filter((book) => book.id !== bookId)
    );
  };

  const addBook = (newBook = {}) => {
    newBook.id = String(Math.random());
    setBooksState((prevState) => [...prevState, newBook]);
  };

  const getBookById = (bookId) =>
    booksState.filter((book) => book.id === bookId);

  const editBook = (bookId, newData) => {
    deleteBook(bookId);
    addBook(newData);
  };

  return (
    <>
      <ConfirmDialog />
      <div className={classes.layout}>
        <div className={classes.div1}>
          <SideBar />
        </div>
        <div className={classes.div2}>
          <Header />
        </div>
        <main className={classes.div3}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/books-list" />} />
              <Route
                path="/books-list"
                element={
                  <BooksList books={booksState} deleteBook={deleteBook} />
                }
              />
              <Route
                path="/add-book"
                element={<AddEditBook editMode={false} addBook={addBook} />}
              />
              <Route
                path="/edit-book/:id"
                element={
                  <AddEditBook
                    editMode={true}
                    getBookById={getBookById}
                    editBook={editBook}
                  />
                }
              />
              <Route
                path="/book-details/:id"
                element={
                  <BookDetails
                    getBookById={getBookById}
                    deleteBook={deleteBook}
                  />
                }
              />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
};

export default Admin;
