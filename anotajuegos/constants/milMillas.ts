import {StyleSheet} from 'react-native';

export const milMillas = StyleSheet.create({
    contenedor: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    filas: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
    },
    columna1: {
        width: "31%",
        height: 45,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    columna1_texto: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    columna2: {
        fontSize: 16,
        width: "23%",
        height: 45,
        borderWidth: 1,
        textAlign: "center",
        justifyContent: "center",
    },
    columna2_texto: {
        fontSize: 16,
        textAlign: "center",
    },
    columna2_botones: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contenedor_botones: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
    },
    botones: {
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 5
    },
});

export const puntajeMilMillas = {
    Viaje_Completo: 400,
    TK: 300,
    Seguridades_I: 100,
    Seguridades_II: 300,
    Viaje_Seguro: 300,
    Bloqueo: 500,
    Accion_demorada: 300,
    Alargue: 200
}

export const explicacionMilMillas = {
    Viaje_completo: 'Por haber recorrido 1000 millas exactas',
    TK: 'Por cada jugada TK. Una jugada TK surge si un jugador baja un problema a otro que tiene la carta que lo soluciona. El jugador con la carta que lo soluciona tiene que declarar TK aunque no sea su turno, mover el problema y tener un turno extra.',
    Seguridades_I: 'Por cada carta de seguridad utilizada',
    Seguridades_II: 'Por haber utilizado las cuatro cartas de seguridad',
    Viaje_seguro: 'Por haber ganado la mano sin utilizar cartas de 200 millas',
    Bloqueo: 'Por haber ganado la mano sin que el otro equipo haya utilizado ninguna carta de distancia',
    Accion_demorada: 'Por haber completado el viaje una vez terminadas las cartas del mazo',
    Alargue: 'Si el jugador que llega a 700 millas decide alargar el recorrido hasta 1000. Valido solo para partidas de 2, 3 o 6 jugadores.'
}

export const titulosMilMillas = {
    Viaje_completo: 'Viaje Completo',
    TK: 'TK',
    Seguridades_I: 'Seguridades I',
    Seguridades_II: 'Seguridades II',
    Viaje_seguro: 'Viaje Seguro',
    Bloqueo: 'Bloqueo',
    Accion_demorada: 'Accion Demorada',
    Alargue: 'Alargue'
}