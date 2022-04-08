import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import {DeckRecord} from "./records/deck.record";


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json()); // Content-type: application/json


app.get('/test',async (req,res) =>{
   //  const newDeck = new DeckRecord({
   //      name: "Francuski"} as DeckRecord)
   // const id = await newDeck.insert()

    // res.json(await DeckRecord.listAll())

    // const oldDeck = await DeckRecord.getOne("ce34bf64-b712-11ec-8603-088dabb27947")
    // oldDeck.name = "Niemiecki";
    // await oldDeck.update()
    // res.json(await DeckRecord.getOne("ce34bf64-b712-11ec-8603-088dabb27947"))



    // const deleteDeck = await DeckRecord.getOne("27839aff-93b2-4fbd-af00-3ccbfcd4d52f")
    // await deleteDeck.delete();


})



app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});