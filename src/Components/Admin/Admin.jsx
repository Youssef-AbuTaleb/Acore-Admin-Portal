import React, { useState } from "react";
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

import AddBook from "./AddBook/AddBook";
import EditBook from "./EditBook/EditBook";
import BooksList from "./BooksList/BooksList";
import BookDetails from "./BookDetails/BookDetails";

const Admin = () => {
  let DUMMY_BOOKS = [
    {
      id: "01",
      title: "the title book 1",
      author: "author 1",
      category: "category 1",
      price: 10,
      photo: "",
      version: "1.3",
      olderVersion: "version 1",
      edition: "21",
      isbn: "978-3-16-14",
      releaseDate: "10-10-2010",
      brief: "brief 1",
    },
    {
      id: "02",
      title: "the title book 2",
      author: "author 2",
      category: "category 2",
      price: 20,
      photo: "",
      version: "1.1",
      olderVersion: "version 2",
      edition: "22",
      isbn: "978-3-16-14",
      releaseDate: "10-10-2010",
      brief: "brief 2",
    },
    {
      id: "03",
      title: "the title book 3",
      author: "author 3",
      category: "category 3",
      price: 30,
      photo: "",
      version: "1.2",
      olderVersion: "version 3",
      edition: "23",
      isbn: "978-3-16-14",
      releaseDate: "10-10-2010",
      brief: "brief 3",
    },
    {
      id: "04",
      title: "the title book 4",
      author: "author 4",
      category: "category 4",
      price: 40,
      photo: "",
      version: "1.2",
      olderVersion: "version 4",
      edition: "24",
      isbn: "978-3-16-14",
      releaseDate: "10-10-2010",
      brief: "brief 4",
    },
    {
      id: "05",
      title: "the title book 5",
      author: "author 5",
      category: "category 5",
      price: 50,
      photo: "",
      version: "1.2",
      olderVersion: "version 5",
      edition: "25",
      isbn: "978-3-16-14",
      releaseDate: "10-10-2010",
      brief: "brief 5",
    },
  ];

  const [booksState, setBooksState] = useState(DUMMY_BOOKS);

  const deleteBook = (bookId) => {
    setBooksState((prevState) => {
      return prevState.filter((book) => book.id !== bookId);
    });
  };

  const addBook = (newBook = {}) => {
    newBook.id = String(Math.random());
    setBooksState((prevState) => {
      return [...prevState, newBook];
    });
  };

  const getBookById = (bookId) => {
    return booksState.filter((book) => book.id === bookId);
  };

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
              <Route path="/add-book" element={<AddBook addBook={addBook} />} />
              <Route
                path="/edit-book/:id"
                element={
                  <EditBook getBookById={getBookById} editBook={editBook} />
                }
              />
              <Route
                path="/book-details/:id"
                element={
                  <BookDetails books={booksState} deleteBook={deleteBook} />
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
