import {Router} from 'express';
import {DeckRecord} from '../records/deck.record';
import {CreateDeckReq} from "../types";
import {CardRecord} from "../records/card.record";

export const deckRouter = Router();


deckRouter
    .get('/', async (req, res) => {
        const deckList = await DeckRecord.listAll();
        res.json(deckList);
    })
    .get('/:deckId', async (req, res) => {

        const {deckId} = req.params;
        const deck = await DeckRecord.getOne(deckId);
        if (!deck) {
            throw new Error ('File not found');
        }
        const cardList = await CardRecord.listAllInDeck(deckId)

        // zastanowie się czy potrzebuje tak to pobierać czy leipiej oddzielnie

        res.json({
            deck,
            cardList,
        });
    })
    .post('/', async (req, res) => {
        const newDeck = new DeckRecord(req.body as CreateDeckReq);
        res.json(await newDeck.insert());

    })
    .patch('/:deckId', async (req, res) => {
        const {deckId} = req.params;
        const {name: newName}: {
            name: string
        } = req.body;
        const deck = await DeckRecord.getOne(deckId);
        deck.name = newName;
        await deck.update();
        res.json(deck);
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params;
        const deck = await DeckRecord.getOne(id)
        if (!deck) {
            throw new Error ('File not found');
        }
        await deck.delete();
        res.end();
    })