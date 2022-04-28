import {NotFoundError} from "./error";
import {CardEntity, DeckEntity} from "../types";

export const notFoundElement = (element : CardEntity | DeckEntity) => {
    if (!element) {
        throw new NotFoundError();
    }
}