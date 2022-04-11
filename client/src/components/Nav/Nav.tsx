import React from 'react';
import {NavLink} from 'react-router-dom';


export const Nav = () => {

    const colorOfLink = ({isActive}: {
        isActive: boolean;
    }) => (isActive ? 'Nav__item--active Nav__item' : 'Nav__item');

    return (
        <div className="wrapper">
            <nav className="Nav">
                <NavLink  className={colorOfLink}  to="/decks">Decks</NavLink>
                <NavLink  className={colorOfLink} to="/add">Add</NavLink>
                <NavLink  className={colorOfLink} to="/browse">Browse</NavLink>
            </nav>
        </div>
    )
}