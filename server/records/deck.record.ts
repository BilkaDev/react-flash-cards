import {v4 as uuid} from "uuid";
import {pool} from '../utils/db'
import {FieldPacket} from "mysql2";
import {DeckEntity} from "../types/deck";
import {ValidationError} from "../utils/error";

type DeckRecordResults = [DeckRecord[], FieldPacket[]];

export class DeckRecord implements DeckEntity{
    public id?: string;
    public name: string;


    constructor(obj: DeckEntity) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('The name must be between 3 and 25 characters long.')
        }

        this.id = obj.id;
        this.name = obj.name;

    }

    async insert(): Promise<string> {
        if (!this.id) this.id = uuid();
        await pool.execute("INSERT INTO `flashcards_decks`(`id`, `name`) VALUES(:id, :name)", {
            id: this.id,
            name: this.name,
        });

        return this.id
    }

    static async listAll(): Promise<DeckRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `flashcards_decks` ORDER BY `name` ASC")) as DeckRecordResults;
        return results.map(obj => new DeckRecord(obj));
    }

    static async getOne(id: string): Promise<DeckRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `flashcards_decks` WHERE `id` = :id", {
            id,
        }) as DeckRecordResults;

        return results.length === 0 ? null : new DeckRecord(results[0]);
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `flashcards_decks` SET `name` = :name WHERE `id` = :id", {
            id: this.id,
            name: this.name,
        });
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `flashcards_decks` WHERE `id` = :id", {
            id: this.id,
        });
    }


}

