import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'
import { EstadisticaPorJugador } from '../types';
const prisma = new PrismaClient();

export const estadisticasPorJugador = async (req: Request, res: Response): Promise<Response> => {
    const jugadorId: string = req.headers['id-usuario'] as string;
    let estadisticas: EstadisticaPorJugador = {};

    const jugador = await prisma.jugadores.findUnique({
        where: {
            id: jugadorId,
        },
        include: {
            JugadoresIntentos: true,
        }
    });

    if(jugador) {
        estadisticas = {
            nombre: jugador.nombre,
            intentos: jugador.JugadoresIntentos.length,
            victorias: jugador.JugadoresIntentos
                .filter(({fueAdivinada}) => fueAdivinada === true).length,
        };
    }

    // Regresar la informacion
    return res.status(200).json(estadisticas);
};

export const estadisticasMejorJugadores = async (req: Request, res: Response): Promise<Response> => {
    const jugadores = await prisma.jugadores.findMany({
        include: {
            JugadoresIntentos: true,
        }
    });

    const estadisticas: EstadisticaPorJugador[] = jugadores.map((jugador) => ({
        nombre: jugador.nombre,
        intentos: jugador.JugadoresIntentos.length,
        victorias: jugador.JugadoresIntentos
                .filter(({fueAdivinada}) => fueAdivinada === true).length,
    }))
    .sort((a,b) => a.victorias - b.victorias)

    return res.status(200).json(estadisticas)
};

export const estadisticasPorPalabras = async (req: Request, res: Response): Promise<Response> => {
    const data = await prisma.jugadoresIntentos.findMany();
    const estadistica: any = [];

    const palabras = data.reduce((resultado: any, item) => ({
        ...resultado,
        [item['palabra']]: [...(resultado[item['palabra']] || []), item],
    }), {});

    for(let key in palabras) {
        estadistica.push({
            palabra: key as string,
            interaciones: palabras[key].length as number,
            acertada: palabras[key]
                .filter((item: any) => item.fueAdivinada === true)
                .length as number,
        });
    }

    return res.status(200).json(
        estadistica.sort((a: any,b: any) => b.acertada - a.acertada).slice(0, 10)
    );
};