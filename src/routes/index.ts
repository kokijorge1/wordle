import { generadorDePalabras } from "../controllers/generadorPalabrasController";
import { jugar } from "../controllers/jugarController";
import { validar } from '../policies/jugarPolicies';
import { estadisticasPorJugador, estadisticasMejorJugadores, estadisticasPorPalabras } from "../controllers/estadisticasController";

export const Router = (app: any) => {
    app.get('/', generadorDePalabras);

    app.post('/jugar', validar, jugar);

    app.get('/estadisticas/por-jugador', estadisticasPorJugador);

    app.get('/estadisticas/jugadores', estadisticasMejorJugadores);

    app.get('/estadisticas/por-palabras', estadisticasPorPalabras);
};