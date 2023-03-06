import {NextFunction, Request, Response} from 'express';
import { z } from "zod";

const schema = z.object({
    body: z.object({
        user_word: z.string({
            required_error: 'Debe de introducir una palabra',
            invalid_type_error: 'Debe de ser tipo string'
        })
        .length(5, {
            message: 'Debe de contener 5 letras'
        })
    }),
});

export const validar  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
        });
        
        next();
    } catch (error) {
        return res.status(400).json(error);
    }
}