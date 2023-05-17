import React from "react";

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
  return (
    <>
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
              <Route path="/books-list" element={<BooksList />} />

              {/* <Route path="/books-list" component={BooksList} /> */}
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/edit-book" element={<EditBook />} />
              <Route path="/book-details" element={<BookDetails />} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
};

export default Admin;
