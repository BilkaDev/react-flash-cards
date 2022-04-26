import React, {useEffect, useState} from 'react';
import {CardEntity, CreateCardReq, ListDeckRes} from "types";
import {StudyBtnShow} from "./StudyBtnShow";
import {StudyBtnRemember} from "./StudyBtnRemember";

interface Props {
    isFront: boolean;
    setIsFront: (value: boolean) => void;
    setData: (value: ListDeckRes) => void;
    data: ListDeckRes;
}

export const StudyCard = (props: Props) => {
    const {isFront, setIsFront, data, setData} = props;
    const cards = data.cardList.filter(item => !item.memorized);
    const [card,setCard] = useState(cards[0])
    const [error,setError] = useState(false)

    useEffect(() => {
        setCard(cards[randomCard()]);
    },[data])



    function randomCard() {
        const min = 0;
        const max = cards.length;
        return Math.floor(Math.random() * (max - min) + min);
    }
    if (cards.length === 0 || card === undefined) return <p>There are no study cards</p>


    function handleClick() {
        setCard(cards[randomCard()]);
        setIsFront(true);

    }


    if(error){
        return <p>Error, please try again in a few minutes</p>
    }

    return <>
        {isFront ? <p>{card.question}</p> : <p>{card.answer}</p>}
        <StudyBtnShow isFront={isFront} setIsFront={setIsFront}/>
        <StudyBtnRemember setError={setError} isFront={isFront} card={card} setData={setData} data={data} setIsFront={setIsFront}/>
        {!isFront && <button onClick={handleClick}>don't remember</button>}
    </>
}