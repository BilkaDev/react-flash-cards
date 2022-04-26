import React from 'react';
import {CardEntity, DeckEntity} from "types";
import {Link} from "react-router-dom";

interface Props {
    deck: DeckEntity,
    cardList: CardEntity[]
}

export const DeckInfoRow = (props: Props) => {

    const {deck, cardList : cards} = props;



    return (
            <tr>
                <td>{deck.name}</td>
                <td>{cards.length}</td>
                <td>{cards.filter(card => !card.memorized).length}</td>
                <td>{cards.filter(card => card.memorized).length}</td>
                <td><Link to={`/browse/${deck.id}`}>Check</Link></td>
                <td><Link to={`/study-deck/${deck.id}`}>Study</Link></td>
            </tr>
    )
}