import React from 'react';
import {DeckList} from "../components/Deck/DeckList";
import {Link} from "react-router-dom";



export const DecksView = () => (
    <>
        <Link to="/create-deck">Create deck</Link>
        <DeckList/>
    </>
);