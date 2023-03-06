import {Request, Response} from 'express';
import Wordle from '../classes/Wordle';
import Jugador from '../classes/Jugador';
import { RespuestaAdivinanza } from "../types";

const NUMERO_DE_INTENTOS: number = 5;
const MINUTOS_MAXIMOS: number = 1;

let palabraAdivinarEnTurno: string = '';

// Iniciar Wordle
const wordle = new Wordle(Date.now());

export const jugar = async (req: Request, res: Response): Promise<Response> => {
    // Datos del cliente
    const jugadorId: string = req.headers['id-usuario'] as string;
    const palabraDelJugador: string = req.body.user_word as string;

    let esGanador: boolean = false;
    let aciertos: RespuestaAdivinanza[] = [];

    // Nuevo jugador
    const jugador = new Jugador(jugadorId, NUMERO_DE_INTENTOS);
    // restar un intento
    jugador.restarUnIntento();
    // Numero de intentos restantes del jugador
    const numeroDeIntentosDisponiblesDelJugador = jugador.getNumberIntentos();

    // Si la palabra en turno esta vacia entonces generar una nueva palabra
    if(palabraAdivinarEnTurno === '') {
        palabraAdivinarEnTurno = wordle.generarNuevaPalabra(palabraAdivinarEnTurno);
    }

    // Minutos transcurridos
    const minutosTranscurridos: number = wordle.minutosTranscurridos(Date.now());

    // Checar si ya pasaron los minutos para generar una nueva palabra
    if(minutosTranscurridos > MINUTOS_MAXIMOS && palabraAdivinarEnTurno !== '') {
        // Reiniciar el tiempo si ta pasaron los MINUTOS_MAXIMOS
        wordle.cambiarFechaHoraInicio = Date.now();

        // Generar una nueva palabra
        palabraAdivinarEnTurno = wordle.generarNuevaPalabra(palabraAdivinarEnTurno);

        // Reiniciar para todos los jugadores
        jugador.reiniciarIntentosTodosLosJugadores();

    }

    // comprobar si las palabras coiciden y que los numero de intentos restantes del jugador sea
    // mayor 0
    if(palabraDelJugador === palabraAdivinarEnTurno 
        && numeroDeIntentosDisponiblesDelJugador > 0) {
        // Si la palabra coicide entinces ganador true
        esGanador = true;
        // se resetea el numero de intentos
        jugador.reinciarIntentos();

        // Si el usuario gano, entonces se guarda que gano
        jugador.guardarEstatusParticipacion(palabraAdivinarEnTurno, true);
    }

    // Regresar los aciertos de las letras dentro de la plabra a adivinar
    aciertos = wordle.comprobarAciertos(palabraDelJugador, palabraAdivinarEnTurno);

    // Comprobar la cantidad de aciertos del jugador
    if(numeroDeIntentosDisponiblesDelJugador <= 0) {
        // Si ya no tiene intentos disponibles entonces perdio y se guarda
        jugador.guardarEstatusParticipacion(palabraAdivinarEnTurno, false);
    }


    // Enviar la respuesta
    return res.status(200).json(aciertos);
};