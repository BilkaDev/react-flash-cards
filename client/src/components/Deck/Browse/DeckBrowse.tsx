import React, {useEffect, useState} from 'react';
import {CardEntity, DeckEntity} from "types";
import {DeckSelect} from "../DeckSelect";
import {Spinner} from "../../common/Spinner/Spinner";
import {DeckSelectTable} from "./DeckSelectTable";


export const DeckBrowse = () => {
    const [selected, setSelected] = useState<string>("");


    const [data, setData] = useState<DeckEntity[] | null>(null);
    const [cardList, setCardList] = useState<CardEntity[] | null>(null);

    const [error, setError] = useState<boolean>(false);
    const [reflesh, setReflesh] = useState<boolean>(false);

    const refreshGifts = async () => {
        setData(null);
        setCardList(null);
        setReflesh(false)

        try {
            const res = await fetch('http://localhost:3001/deck');
            setData(await res.json());

            const resCards = await fetch(`http://localhost:3001/card/${selected}`);
            const dataCard = await resCards.json();
            setCardList(dataCard);
        } catch (e) {
            setError(true)
        }

    };


    useEffect(() => {
        refreshGifts();
    }, [selected, reflesh]);


    if (error) {
        return <p>Error, please try again in a few minutes</p>
    }

    if (data === null || cardList === null) {
        return <Spinner/>;
    }


    return (
        <>
            <DeckSelect selected={selected} setSelected={setSelected} data={data}/>
            {cardList.length < 1 ? <p>empty</p> :
                <DeckSelectTable cardList={cardList} deckList={data} deckId={selected} setReflesh={setReflesh}/>}
        </>
    )
}