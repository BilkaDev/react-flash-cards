import {Router} from 'express';
import {DeckRecord} from '../records/deck.record';
import {CreateDeckReq, ListDeckRes} from "../types";
import {CardRecord} from "../records/card.record";
import {notFoundElement} from "../utils/not-found-element";

export const deckRouter = Router();


deckRouter
    .get('/', async (req, res) => {
        const deckList = await DeckRecord.listAll();
        res.json(deckList);
    })
    .get('/:deckId', async (req, res) => {

        const {deckId} = req.params;
        const deck  = await DeckRecord.getOne(deckId);
        if (!deck) {
            throw new Error ('File not found');
        }
        const cardList = await CardRecord.listAllInDeck(deckId)


        res.json({
            deck,
            cardList,
        } as ListDeckRes);
    })
    .post('/', async (req, res) => {
        const newDeck = new DeckRecord(req.body as CreateDeckReq);
        await newDeck.insert()

        res.json(newDeck);

    })
    .patch('/:deckId', async (req, res) => {
        const {deckId} = req.params;
        const {name: newName}: {
            name: string
        } = req.body;
        const deck = await DeckRecord.getOne(deckId);
        notFoundElement(deck);
        deck.name = newName;
        await deck.update();
        res.json(deck);
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params;
        const deck = await DeckRecord.getOne(id)
        notFoundElement(deck);
        await deck.delete();
        res.end();
    })