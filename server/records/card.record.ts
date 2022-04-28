import {v4 as uuid} from "uuid";
import {pool} from '../utils/db'
import {FieldPacket} from "mysql2";
import {CardEntity} from "../types/card";
import {ValidationError} from "../utils/error";

type CardRecordResults = [CardRecord[], FieldPacket[]];

export class CardRecord implements CardEntity{
    public id?: string;
    public question: string;
    public answer: string;
    public memorized?: boolean;
    public deckId: string;

    constructor(obj: CardEntity) {
        const {question,answer,id,memorized,deckId} = obj;

        if (!question || question.length < 1 || question.length > 100) {
            throw new ValidationError('The question must be between 1 and 100 characters long.')
        }
        if (!answer || answer.length < 1 || answer.length > 100) {
            throw new ValidationError('The question must be between 1 and 250 characters long.')
        }
        if (deckId === null || deckId.length !== 36 || typeof deckId !== "string"){
            throw new ValidationError('you must choose a deck');
        }

        this.id = id;
        this.question = question;
        this.answer = answer;
        this.memorized = memorized;
        this.deckId = deckId;

    }

    async insert(): Promise<string> {
        if (!this.id) this.id = uuid();
        if (!this.memorized) {
            this.memorized = false;
        }
        await pool.execute("INSERT INTO `flashcards_cards`(`id`, `question`,`answer`,`memorized`,`deckId`) VALUES(:id, :question, :answer, :memorized, :deckId)", {
            id: this.id,
            question: this.question,
            answer: this.answer,
            memorized: this.memorized,
            deckId: this.deckId,
        });

        return this.id
    }

    static async listAll(): Promise<CardRecord[]> {
        const [results] = (await pool.execute(
            "SELECT * FROM `flashcards_cards`")) as CardRecordResults;
        return results.map(obj => new CardRecord(obj));
    }

    static async listAllInDeck(deckId: string): Promise<CardRecord[]> {
        const [results] = (await pool.execute(
            "SELECT * FROM `flashcards_cards` WHERE `flashcards_cards`.`deckId` = :deckId", {
                deckId,
            })) as CardRecordResults;
        return results.map(obj => new CardRecord(obj));
    }


    static async getOne(id: string): Promise<CardRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `flashcards_cards` WHERE `id` = :id", {
            id,
        }) as CardRecordResults;

        return results.length === 0 ? null : new CardRecord(results[0]);
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `flashcards_cards` SET `question` = :question,`answer` = :answer,`memorized` = :memorized,`deckId` = :deckId  WHERE `id` = :id", {
            id: this.id,
            question: this.question,
            answer: this.answer,
            memorized: this.memorized,
            deckId: this.deckId,
        });
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `flashcards_cards` WHERE `id` = :id", {
            id: this.id,
        });
    }


}

