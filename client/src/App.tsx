import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Nav} from "./components/Nav/Nav";
import {NotFoundView} from "./views/NotFoundView";

function App() {
    return (
        <>
            <Header/>
            <Nav/>
            <Routes>
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>


        </>)
}

export default App;
