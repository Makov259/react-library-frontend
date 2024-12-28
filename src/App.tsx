import './App.css';
import {Navbar} from './layouts/NavbarAndFooter/Navbar';
import {Footer} from './layouts/NavbarAndFooter/Footer';
import {HomePage} from './layouts/HomePage/HomePage';
import {SearchBooksPage} from './layouts/SearchBooksPage/SearchBooksPage';
import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import {BookCheckoutPage} from "./layouts/BookCheckoutPage/BookCheckoutPage";

export const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-1">
                <Navbar/>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/home'/>
                    </Route>
                    <Route path='/home'>
                        <HomePage/>
                    </Route>
                    <Route path='/search'>
                        <SearchBooksPage/>
                    </Route>
                    <Route path='/checkout/:bookId'>
                        <BookCheckoutPage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

