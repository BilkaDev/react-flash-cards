import React from "react";
import {CardEntity, DeckEntity} from "types";
import {handleDelete} from "../../utils/delete";
import {Link} from 'react-router-dom';


interface Props {
    deckId: string;
    cardList: CardEntity[];
    setReflesh: (value : boolean) => void;
    deckList: DeckEntity[]

}

export const DeckSelectRow = (props: Props) => {

    const {cardList, setReflesh, deckList} = props;

    async function clickDelete(card: string, id: string) {
        await handleDelete(card, card, id)
        setReflesh(true);
    }


    return (
        <>
            {cardList.map(card => (
                <tr key={card.id}>
                    <td>{deckList.filter(deck => deck.id === card.deckId)[0].name}</td>
                    <td>{card.question}</td>
                    <td>{card.answer}</td>
                    <td>{card.memorized ? <p>Yes</p> : <p>No</p>}</td>
                    <td><Link to={`/edit-card/${card.id}`}>EDIT</Link></td>
                    <td><p onClick={() => clickDelete("card", card.id as string)}>🗑️</p></td>
                </tr>
            ))}
        </>
    )
}