export type PalabraIntroduciada = {
    palabra: string,
};

export type RespuestaUsuario = {
    ganador: boolean,
    numerosDeIntentosRestantes: number,
} | RespuestaAdivinanza;

export type RespuestaAdivinanza = {
    letter: string,
    value: number,
};

export type EstadisticaPorJugador = {
    nombre?: string,
    intentos?: number,
    victorias?: number,
    ratio?: number,
};