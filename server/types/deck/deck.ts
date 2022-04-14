import {DeckEntity} from "./deck.entity";
import {CardEntity} from "../card";


export type CreateDeckReq = Omit<DeckEntity, 'id'>

export interface ListDeckRes{
    deck: DeckEntity;
    cardList: CardEntity[];
}