import fs from 'fs';
import { RespuestaAdivinanza } from "../types";

export default class Wordle {
    private NUMERO_LETRAS_POR_PALABRA: number = 5;
    public fechaHoraInicio: number = 0;
    private diccionarioDePalabras: string[] = [];

    constructor(fechaHoraInicio: number){
        this.fechaHoraInicio = fechaHoraInicio;
        // Leer el diccionario de palabras
        this.leerDiccionarioDePalabras();
    }

    set cambiarFechaHoraInicio(nuevaFechaHoraInicio: number) {
        this.fechaHoraInicio = nuevaFechaHoraInicio;
    }

    get getFechaHoraInicio() {
        return this.fechaHoraInicio;
    }

    leerDiccionarioDePalabras(): void {
        // Leer el diccionario de palabras
        const data = fs.readFileSync(`${__dirname}/../data/words.txt`, 'utf8');

        this.diccionarioDePalabras = data
            // Cortar las palabras por espacios
            .split('\n')
            // Seleccionar solamente las palabras con 5 letras
            .filter((word) => word.length === this.NUMERO_LETRAS_POR_PALABRA);
    }

    generarNuevaPalabra(palabraYaUsada: string): string {
        // Filtrar la palabra ya usada anteriormente
        const palabras = this.diccionarioDePalabras
            .filter((palabra) => palabra !== palabraYaUsada);

        // Regresar una nueva palabra
        return palabras[
            Math.floor(Math.random() * palabras.length)
        ];
    }

    minutosTranscurridos(esteMomento: number): number {
        // Sacar la diferencia de entre este momento y el momento en que inicio el juego
        const diferencia: number = esteMomento - this.fechaHoraInicio;
        const diferenciaEnMinutos: number = diferencia / (1000 * 60);

        return diferenciaEnMinutos;
    }

    comprobarAciertos(palabraDelJugador: string, palabraAdivinar: string): RespuestaAdivinanza[] {
        const aciertos: RespuestaAdivinanza[] = [];

        for(let i = 0; i < palabraDelJugador.length; i++) {
            // Obtener la letra del actual index
            const letra = palabraDelJugador[i];

            // Comprobar que la letra exista dentro de la palabra
            if(!palabraAdivinar.includes(letra)) {
                aciertos.push({
                    letter: letra,
                    value: 3
                });
                continue;
            }

            // Comprobar que la letra no coicida en el mismo index (lugar)
            if(palabraAdivinar[i] !== letra) {
                aciertos.push({
                    letter: letra,
                    value: 2
                });
                continue;
            }

            // Entonces la palabra si existe y, esta el mismo index (lugar)
            aciertos.push({
                letter: letra,
                value: 1
            });
        }

        // Regresar los aciertos
        return aciertos;
    }
}