import React, {MouseEvent, useEffect} from 'react';
import {DeckEntity} from "types";
import {Link} from "react-router-dom";

interface Props {
    deck: DeckEntity
    refleshDeck: () => void,

}

export const DeckTableRow = (props: Props) => {
    const deck = props.deck;

    const deleteDeck = async (e : MouseEvent) => {
        e.preventDefault();
        if (!window.confirm(`Are you sure you want to remove ${props.deck.name}?`)) {
            return;
        }

            const res = await fetch(`http://localhost:3001/deck/${deck.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });


        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }
        props.refleshDeck();

    };

    return (
        <tr>
            <td>{deck.name}</td>
            <td><Link to={`/deck-info/${deck.id}`}>More</Link></td>
            <td><Link to={`/edit-deck/${deck.id}/${deck.name}`}>Edit</Link></td>
            <td><Link to={`/study-deck/${deck.id}`}>study</Link></td>
            <td> <a href="#" onClick={deleteDeck}>🗑️</a></td>
        </tr>


    )
}