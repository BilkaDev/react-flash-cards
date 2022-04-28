import React, {FormEvent, useEffect, useState} from 'react';
import {CardEntity, CreateCardReq, DeckEntity} from "types";
import {DeckSelect} from "../Deck/DeckSelect";
import {Spinner} from "../common/Spinner/Spinner";
import {useParams} from "react-router-dom";
import {cardValidation} from "../../utils/card-validation";


export const EditCard = () => {


    const {id: cardId} = useParams();
    const [form, setForm] = useState<CardEntity>({
        answer: '',
        question: '',
        deckId: '',
        memorized: false,
        id: '',
    });
    const [selected, setSelected] = useState<string>("");
    const [validation, setValidation] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);


    const [data, setData] = useState<DeckEntity[] | null>(null);
    const [error, setError] = useState<boolean>(false);

    const refreshGifts = async () => {
        setData(null);

        try {
            const res = await fetch('http://localhost:3001/deck');
            const deck = await res.json() as DeckEntity[]
            setData(deck);
            setSelected(deck[0].id as string)

            const resCard = await fetch(`http://localhost:3001/card/one/${cardId}`);
            const card = await resCard.json() as CardEntity
            setForm(form => ({...form, ...card}))
            setSelected(card.deckId)
        } catch (e) {
            setError(true)
        }

    };


    useEffect(() => {
        refreshGifts();
    }, []);


    function updateForm(key: string, value: string) {

        setForm(form => {
            if (value.length >= 1 && value.length <= 100) setValidation(null)
            return ({
                ...form,
                [key]: value,
            })
        })
    }


    const sendForm = async (e: FormEvent) => {
        e.preventDefault()
        const validation = cardValidation(form)
        if (validation){
            return setValidation(validation)
        }

        setError(false)
        setLoading(true)

        try {
            const res = await fetch(`http://localhost:3001/card/${cardId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...form, deckId: selected} as CreateCardReq)
            });

            if (res.status === 201) setResultInfo(`card has been modified.`);
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>

        </div>;
    }
    if (error) {
        return <p>Error, please try again in a few minutes</p>
    }
    if (data === null) {
        return <p>create deck</p>
    }


    return (
        <form onSubmit={sendForm}>
            <DeckSelect setSelected={setSelected} selected={selected} data={data} addCard={true}/>
            <label>
                Front
                <input value={form.question} onChange={(e) => updateForm('question', e.target.value)} type="text"/>
            </label>
            <label>
                back
                <input value={form.answer} onChange={(e) => updateForm('answer', e.target.value)} type="text"/>
            </label>
            <label>
                memorized?
                <input type="checkbox" checked={form.memorized} onChange={(e) => setForm(form => (
                    {
                        ...form,
                        memorized: !form.memorized}
                    ))}/>
            </label>
            <button type="submit">Edit card</button>
            <p>{validation}</p>

        </form>
    )
}