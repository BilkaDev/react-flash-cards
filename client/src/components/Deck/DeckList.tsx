import React, {useEffect, useState} from 'react';
import {DeckTable} from "./DeckTable";
import {Spinner} from "../common/Spinner/Spinner";
import {DeckEntity} from "types";
import {Route, Routes} from "react-router-dom";
import {DecksView} from "../../views/DecksView";
import {NotFoundView} from "../../views/NotFoundView";

export const DeckList = () => {

    const [data, setData] = useState<DeckEntity[] | null>(null);

    const refreshGifts = async () => {
        setData(null);
        const res = await fetch('http://localhost:3001/deck');
        setData(await res.json());
    };

    useEffect(() => {
        refreshGifts();
    }, []);

    if (data === null) {
        return <Spinner/>;
    }

    if (data === []){
        return null
    }

    return (
        <>
            <h2>select deck</h2>
            <DeckTable deckList={data} refleshDeck={refreshGifts}/>

        </>
    )
}