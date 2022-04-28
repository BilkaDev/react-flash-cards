import {CreateCardReq} from "types";

export const cardValidation = (form : CreateCardReq) : string | false => {

    if (form.question.length < 1 || form.question.length > 100) {
        return ("The front must be between 1 and 100 characters long.")
    }

    if (form.answer.length < 1 || form.answer.length > 100) {
        return ("The back must be between 1 and 100 characters long.")
    }
    return false

}