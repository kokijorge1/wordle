import Wordle from '../classes/Wordle';
import {Request, Response} from 'express';

const wordle = new Wordle(Date.now());

export const generadorDePalabras = (req: Request, res: Response): Response => {
    // Enviar la palabra en turno
    return res.status(200).json({
        palabra: wordle.generarNuevaPalabra(''),
    });
};