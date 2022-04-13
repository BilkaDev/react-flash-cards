import React from 'react';
import {DeckEntity} from "types";
import {DeckTableRow} from "./DeckTableRow";

interface Props {
    deckList: DeckEntity[],
    refleshDeck: () => void,
}

export const DeckTable = (props: Props) => {
    const {deckList} = props;
    return (
        <table>
            <thead>
            <tr>
                <th>Deck name</th>
                <th>Edit deck</th>
                <th>Delete deck</th>
            </tr>
            </thead>
            <tbody>
            {deckList.map(deck => (
                <DeckTableRow key={deck.id} deck={deck} refleshDeck={props.refleshDeck}/>
            ))}

            </tbody>

        </table>
    )
}