import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
}

export class NotFoundError extends Error {
}

export const handleError = (err : Error, req : Request,res : Response,next : NextFunction) => {
    console.error(err)
    if (err instanceof NotFoundError){
        res.status(404)
        res.json({
            message: "Element cannot be found",
        })
        return;
    }

    res.status(err instanceof ValidationError ? 400 : 500);
    res.json({
        message: err instanceof ValidationError ? err.message : "Sorry, please try again in a few minutes"
    })
}