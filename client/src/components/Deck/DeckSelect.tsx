import React, {useState} from 'react';
import {DeckEntity} from "types";


interface Props {
    data: DeckEntity[];
    selected: string;
    setSelected: any;
    addCard?: boolean;
}

export const DeckSelect = (props: Props) => {
    const {selected, setSelected , data, addCard} = props;



    return (
        <select value={selected} onChange={e => setSelected(e.target.value)}>
            {addCard ? null : <option value="">All</option>}
            {
                data.map(deck => (
                    <option key={deck.id} value={deck.id}>
                        {deck.name}
                    </option>
                ))
            }
        </select>
    )
}


