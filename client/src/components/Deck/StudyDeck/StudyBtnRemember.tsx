import React from 'react';
import {CardEntity, ListDeckRes} from "types";

interface Props {
    setIsFront: (value : boolean)=> void;
    data: ListDeckRes;
    setData: (value : ListDeckRes)=> void;
    card: CardEntity;
    isFront:boolean;
    setError:(value: boolean) => void;
}

export const StudyBtnRemember = (props : Props) => {

    const {setIsFront, data, setData, card, isFront, setError} = props;


    async function updateCard (){
        const updateCard = data.cardList.filter(item => item.id === card.id)
        try {
            await fetch(`http://localhost:3001/card/${card.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...updateCard[0],memorized: true})
            });
        } catch (e) {
            setError(true)
        }
    }



    function handleClickRemember() {

        if (data === null) return null

        const newCards = data.cardList.map(item => {
            if (card.id === item.id) {
                return {...item,
                    memorized: 1,
                }
            }
            else return item})


        setData({
            ...data,
            cardList: newCards
        } as ListDeckRes)


        updateCard()
        setIsFront(true)

    }


    return <>
        {!isFront && <button onClick={handleClickRemember}>remember</button>}
    </>
}