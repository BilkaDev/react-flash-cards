import React, {useEffect, useState} from 'react';
import { ListDeckRes} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import {useParams} from "react-router-dom";
import {DeckInfoRow} from "./DeckInfoRow";


export const DeckInfo = () => {


    const {id} = useParams();
    const [data, setData] = useState<ListDeckRes | null>(null);
    const [error, setError] = useState<boolean>(false);


    const refreshGifts = async () => {
        try {
            setData(null);
            const res = await fetch(`http://localhost:3001/deck/${id}`);
            setData(await res.json());
        }catch (e : any){
            setError(true)
        }finally {

        }
    };

    useEffect(() => {
        refreshGifts();
    }, []);

    if (error) {
        return <p>Error, please try again in a few minutes</p>
    }

    if (data === null) {
        return <Spinner/>;
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>cards count</th>
                        <th>learning</th>
                        <th>memorised</th>
                        <th>browse</th>
                        <th>study</th>
                    </tr>
                </thead>
                <tbody>
                    <DeckInfoRow deck={data.deck} cardList={data.cardList}/>
                </tbody>
            </table>
        </>
    )
}