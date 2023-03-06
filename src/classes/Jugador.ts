import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const JUGADORES = new Map();

export default class Jugador {

    // ID del jugador
    private jugadorId: string = '';
    private numeroDeIntentos: number = 0;

    // Contruye un nuevo jugador
    constructor(id: string, numeroDeIntentos: number) {
        // set ID del jugador
        this.jugadorId = id;
        // set numero de intentos
        this.numeroDeIntentos = numeroDeIntentos;
        // Crear nuevo jugador
        this.nuevoJugador();
    }

    nuevoJugador(): void {
        // Comprobar si ya existe el jugador
        if(!JUGADORES.has(this.jugadorId)) {
            // Si no existe agregar nuevo jugador
            JUGADORES.set(this.jugadorId, this.numeroDeIntentos)
        }
    }

    // Regresa la cantidad de intentos de un jugador
    getNumberIntentos(): number {
        return JUGADORES.get(this.jugadorId);
    }

    // Reiniciar intentos del jugador
    reinciarIntentos() {
        JUGADORES.set(this.jugadorId, this.numeroDeIntentos);
    }

    // Suma un intento del jugador
    restarUnIntento() {
        const intentos = JUGADORES.get(this.jugadorId);
        if(intentos > 0) {
            JUGADORES.set(this.jugadorId, intentos - 1);
        }
    }

    // Reiniciar todos los intentos de todos los jugadores
    reiniciarIntentosTodosLosJugadores(): void {
        // Obtener todas las keys
        const jugadoresKeys = JUGADORES.keys();

        // Loop
        for(const key of jugadoresKeys) {
            // Reiniciar contador del jugador
            JUGADORES.set(key, this.numeroDeIntentos);
        }
    }

    // Jugador ya participo en esta palabra
    async getSiJugadorParticipo(palabraDelJugador: string) {
        return prisma.jugadoresIntentos.findFirst({
            where: {
                jugadorId: this.jugadorId,
                palabra: palabraDelJugador,
            }
        })
    }

    // Guardar el tipo de participacion del jugador en una palabra
    async guardarEstatusParticipacion(palabra: string, estatus: boolean) {
        const usuarioYaParticipo = await this.getSiJugadorParticipo(palabra);
        // Si el usuario no a participado
        if(!usuarioYaParticipo) {
            const data = {
                jugadorId: this.jugadorId,
                palabra,
                fueAdivinada: estatus,
            };
            console.log(data);
            await prisma.jugadoresIntentos.create({data});
        }
    }
};