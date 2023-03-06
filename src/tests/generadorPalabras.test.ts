import {describe, expect, test} from '@jest/globals';
import Wordle from '../classes/Wordle';

const wordle = new Wordle(Date.now());

describe('Wordle', () => {
    test('Generar una nueva palabra', () => {
        expect(typeof wordle.generarNuevaPalabra('')).toBe("string")
    });
    test('Comparar las coicidencias', () => {
        expect(wordle.comprobarAciertos('canga', 'canga')).toEqual([
            {
                "letter": "c",
                "value": 1
            },
            {
                "letter": "a",
                "value": 1
            },
            {
                "letter": "n",
                "value": 1
            },
            {
                "letter": "g",
                "value": 1
            },
            {
                "letter": "a",
                "value": 1
            }
        ])
    });
    test('Diferencia en minutos', () => {
        expect(wordle.minutosTranscurridos(Date.now())).toBeGreaterThan(0)
    });
});