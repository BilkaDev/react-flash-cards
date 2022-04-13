import React from 'react';
import './App.scss';
import {Header} from './components/Header/Header';
import {Nav} from "./components/Nav/Nav";
import {Router} from "./components/Router/Router";


function App() {
    return (
        <>
            <Header/>
            <Nav/>
            <Router/>
        </>)
}

export default App;
