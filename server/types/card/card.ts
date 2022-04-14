import {CardEntity} from './card.entity'

export type CreateCardReq = Omit<CardEntity, 'id' | 'memorized'>;


