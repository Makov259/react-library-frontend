import './App.css';
import {Navbar} from './layouts/NavbarAndFooter/Navbar';
import {Footer} from './layouts/NavbarAndFooter/Footer';
import {HomePage} from './layouts/HomePage/HomePage';
import {SearchBook} from './layouts/SearchBooksPage/components/SearchBook';
import {SearchBooksPage} from './layouts/SearchBooksPage/SearchBooksPage';
import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";

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
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

