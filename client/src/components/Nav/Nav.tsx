import React, { useState} from 'react';
import {NavLink} from 'react-router-dom';


export const Nav = () => {

    const [select, setSelect] = useState<string>("deck")

    function activeMenu(name: string) {
        setSelect(name)
    }

    return (
        <div className="wrapper">
            <nav className="Nav">
                <NavLink onClick={() => activeMenu("deck")} className={`Nav__item ${"deck" === select && "Nav__item--active"}`} to="/">Decks</NavLink>
                <NavLink onClick={() => activeMenu("add")} className={`Nav__item ${"add" === select && "Nav__item--active"}`} to="/add">Add Flashcard</NavLink>
                <NavLink onClick={() => activeMenu("browse")} className={`Nav__item ${"browse" === select && "Nav__item--active"}`} to="/browse">Browse</NavLink>
            </nav>
        </div>
    )
}