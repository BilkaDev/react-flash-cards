import {DeckEntity} from "./deck.entity";


export type CreateDeckReq = Omit<DeckEntity, 'id'>