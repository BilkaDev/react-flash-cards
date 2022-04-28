import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';

import { deckRouter } from "./routers/deck";
import {cardRouter} from "./routers/card";
import {handleError} from "./utils/error";



const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json()); // Content-type: application/json


app.use('/deck', deckRouter);
app.use('/card', cardRouter);

app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});