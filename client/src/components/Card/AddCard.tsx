import React, {FormEvent, useEffect, useState} from 'react';
import {CreateCardReq, DeckEntity} from "types";
import {DeckSelect} from "../Deck/DeckSelect";
import {Spinner} from "../common/Spinner/Spinner";
import {cardValidation} from "../../utils/card-validation";


export const AddCard = () => {

    const [form, setForm] = useState<CreateCardReq>({
        answer: '',
        question: '',
        deckId: '',
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
            const data = await res.json() as DeckEntity[]
            setData(data);
            setSelected(data[0].id as string)

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
        try {
            const res = await fetch('http://localhost:3001/card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...form,deckId: selected} as CreateCardReq)
            });
            await res.json();
            setResultInfo(`card has been created.`);
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
            <button onClick={() => setResultInfo(null)}>Add another one</button>
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
            <button type="submit">Add card</button>
            <p>{validation}</p>

        </form>
    )
}