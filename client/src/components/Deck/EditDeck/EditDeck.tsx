import React, {FormEvent, useState} from 'react';
import { DeckEntity} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import {useParams} from "react-router-dom";



export const EditDeck = () => {
    const {id,name} = useParams();

    const [form, setForm] = useState<DeckEntity>({
        id: id,
        name: name as string,
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [validation, setValidation] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);


    function updateForm(key: string, value: string) {

        setForm(form => {
            if (value.length >= 3 && value.length <= 25) setValidation(null)
            return ({
                ...form,
                [key]: value,
            })
        })
    }

    async function sendForm(e: FormEvent) {
        e.preventDefault()
        if (form.name.length < 3 && form.name.length > 25){
            return  setValidation("The name must be between 3 and 25 characters long.")
        }
        setLoading(true)

        try {
            const res = await fetch(`http://localhost:3001/deck/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });
            const data : DeckEntity = await res.json();
            setResultInfo(`${data.name} has been modified`);
        }
        catch (e){
            setError(true)
        }
        finally {
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
    if (error){
        return <p>Error, please try again in a few minutes</p>

    }

    return (
        <form onSubmit={sendForm}>
            <label>
                Edit Deck Name:
                <input
                    value={form.name}
                    type="text"
                    onChange={(e) => updateForm('name', e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
            <p>{validation}</p>

        </form>
    )
}