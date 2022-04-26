import React from 'react';

interface Props {
    setIsFront: (value : boolean) => void;
    isFront:boolean;
}

export const StudyBtnShow = (props : Props) => {
const {setIsFront, isFront} = props;

    function handleClick() {
        setIsFront(false)
    }

    return <>
        {isFront && <button onClick={handleClick}>show answer</button>}
    </>
}