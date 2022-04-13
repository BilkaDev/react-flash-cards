import React from 'react';
import {Route, Routes} from "react-router-dom";
import {DecksView} from "../../views/DecksView";
import {NotFoundView} from "../../views/NotFoundView";
import {AddDeck} from "../Deck/AddDeck/AddDeck";
import {EditDeck} from "../Deck/EditDeck/EditDeck";

 export const Router = () => {

     return (
             <div className="Page wrapper">
                 <Routes>
                     <Route path="/create-deck" element={<AddDeck/>}/>
                     <Route path="/Edit-deck/:id/:name" element={<EditDeck/>}/>
                     <Route path="/" element={<DecksView/>}/>
                     <Route path="*" element={<NotFoundView/>}/>
                 </Routes>
             </div>
     )
 }