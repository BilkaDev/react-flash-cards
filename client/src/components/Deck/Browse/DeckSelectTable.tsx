
import React from 'react';
import {DeckSelectRow} from "./DeckSelectRow";
import {CardEntity, DeckEntity} from "types";

interface Props {
    deckId: string;
    cardList: CardEntity[];
    setReflesh: (value : boolean) => void;
    deckList: DeckEntity[];
}


export const DeckSelectTable = (props: Props) => {
    const {deckId, cardList, setReflesh, deckList} = props;


    return (
        <table>
            <thead>
            <tr>
                <th>Deck Name</th>
                <th>front</th>
                <th>back</th>
                <th>memorized</th>
                <th>edit</th>
                <th>delete</th>
            </tr>
            </thead>
            <tbody>
            <DeckSelectRow cardList={cardList} deckId={deckId} deckList={deckList} setReflesh={setReflesh}/>
            </tbody>
        </table>
    )
}