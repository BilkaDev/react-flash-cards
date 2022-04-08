import {v4 as uuid} from "uuid";
import {pool} from '../utils/db'
import {FieldPacket} from "mysql2";

type CardRecordResults = [CardRecord[], FieldPacket[]];

export class CardRecord {
    public id?: string;
    public question: string;
    public answer: string;
    public memorized: boolean;
    public deckId: string;
    public deckName?: string;

    constructor(obj: CardRecord) {
        if (!obj.question || obj.question.length < 1 || obj.question.length > 100) {
            throw new Error('The question must be between 1 and 100 characters long.')
        }
        if (!obj.answer || obj.answer.length < 1 || obj.answer.length > 100) {
            throw new Error('The question must be between 1 and 250 characters long.')
        }
        this.id = obj.id;
        this.question = obj.question;
        this.answer = obj.answer;
        this.memorized = obj.memorized;
        this.deckId = obj.deckId;
        this.deckName = obj.deckName;

    }

    async insert(): Promise<string> {
        if (!this.id) this.id = uuid();
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
            "SELECT `flashcards_decks`.`name` AS `deckName`, `flashcards_cards`.`deckId`, `flashcards_cards`.`id`, `flashcards_cards`.`question`, `flashcards_cards`.`answer`, `flashcards_cards`.`memorized` FROM `flashcards_decks` JOIN `flashcards_cards` ON `flashcards_decks`.`id` = `flashcards_cards`.`deckId`")) as CardRecordResults;
        return results.map(obj => new CardRecord(obj));
    }
    static async listAllInDeck(deckId:string): Promise<CardRecord[]> {
        const [results] = (await pool.execute(
            "SELECT `flashcards_decks`.`name` AS `deckName`, `flashcards_cards`.`deckId`, `flashcards_cards`.`id`, `flashcards_cards`.`question`, `flashcards_cards`.`answer`, `flashcards_cards`.`memorized` FROM `flashcards_decks` JOIN `flashcards_cards` ON `flashcards_decks`.`id` = `flashcards_cards`.`deckId` WHERE `flashcards_decks`.`id` = :deckId",{
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

