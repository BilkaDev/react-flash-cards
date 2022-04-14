import React from 'react';
import {Route, Routes} from "react-router-dom";
import {DecksView} from "../../views/DecksView";
import {NotFoundView} from "../../views/NotFoundView";
import {AddDeck} from "../Deck/AddDeck/AddDeck";
import {EditDeck} from "../Deck/EditDeck/EditDeck";
import {BrowseView} from "../../views/BrowseView";
import {DeckInfo} from "../Deck/DeckInfo/DeckInfo";
import {AddCard} from "../Card/AddCard";
import {EditCard} from "../Card/EditCard";

 export const Router = () => {

     return (
             <div className="Page wrapper">
                 <Routes>
                     <Route path="/" element={<DecksView/>}/>
                     <Route path="/browse" element={<BrowseView/>}/>
                     <Route path="/create-deck" element={<AddDeck/>}/>
                     <Route path="/Edit-deck/:id/:name" element={<EditDeck/>}/>
                     <Route path="/add" element={<AddCard/>}/>
                     <Route path="/edit-card/:id" element={<EditCard/>}/>
                     <Route path="/deck-info/:id" element={<DeckInfo/>}/>
                     <Route path="*" element={<NotFoundView/>}/>
                 </Routes>
             </div>
     )
 }