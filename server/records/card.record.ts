import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {DeckRecord} from "./deck.record";

type CardRecordResults = [CardRecord[], FieldPacket[]];

export class CardRecord {
    public id?: string;
    public question?: string;
    public answer?: string;
    public memorized?: boolean;
    public deckId?: string;

    constructor(obj: CardRecord) {
        this.id = obj.id;
        this.question = obj.question;
        this.answer = obj.answer;
        this.memorized = obj.memorized;
        this.deckId = obj.deckId;

    }
    static async getOne(id: string): Promise<CardRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `flashcards_decks` JOIN `flashcards_cards` ON `flashcards_decks`.`id` = `flashcards_cards`.`deckId` WHERE flashcards_decks.id = :id", {
            id,
        }) as CardRecordResults;
        console.log(results)

        return results.length === 0 ? null : new CardRecord(results[0]);
    }

}