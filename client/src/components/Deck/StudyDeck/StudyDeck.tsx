import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ListDeckRes} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import {StudyBtnShow} from "./StudyBtnShow";
import {StudyBtnRemember} from "./StudyBtnRemember";
import {StudyCard} from "./StudyCard";

function StudyBtnRemeber() {
    return null;
}

export const StudyDeck = () => {

    const [isFront, setIsFront] = useState(true)

    const {id} = useParams();
    const [data, setData] = useState<ListDeckRes | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        refreshGifts();
    }, []);



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


    if (error) {
        return <p>Error, please try again in a few minutes</p>
    }

    if (data === null) {
        return <Spinner/>;
    }


    return (
        <>
            <h2>{data.deck.name}</h2>
            <div>
                <StudyCard setData={setData} data={data} isFront={isFront} setIsFront={setIsFront}/>
            </div>
        </>
    )
}