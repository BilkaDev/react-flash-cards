import {Router} from 'express';
import {DeckRecord} from "../records/deck.record";
import {CardRecord} from "../records/card.record";
import {CreateDeckReq} from "../types";
import {deckRouter} from "./deck";
import {CreateCardReq} from "../types/card/card";
import {CardEntity} from "../types/card";

export const cardRouter = Router();


cardRouter
    .get('/', async (req, res) => {
        const cardList = await CardRecord.listAll();
        res.json(cardList);
    })
    .get('/:deckId', async (req, res) => {

        const {deckId} = req.params;
        const cardListInDeck = await CardRecord.listAllInDeck(deckId)

        res.json({
            cardListInDeck,
        });
    })
    .get('/one/:cardId', async (req, res) => {
        const card = await CardRecord.getOne(req.params.cardId);
        res.json(card);
    })

    .post('/', async (req, res) => {
        const newCard = new CardRecord(req.body as CreateCardReq);
        res.json(await newCard.insert());

    })
    .patch('/:cardId', async (req, res) => {
        const {cardId} = req.params;
        const {body}:{body : CardEntity} = req


        const card = await CardRecord.getOne(cardId);
        console.log(card)

        const newCard = new CardRecord({
            ...card,
            ...body,
        })
        await newCard.update()


        res.status(201);
        res.end()

    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params;
        const card = await CardRecord.getOne(id)
        if (!card) {
            throw new Error ('File not found');
        }
        await card.delete();
        res.end();
    })

