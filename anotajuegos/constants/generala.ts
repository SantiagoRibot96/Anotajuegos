import {StyleSheet} from 'react-native';

export const generala = StyleSheet.create({
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
        width: "33.9%",
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
        width: "11%",
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

export const titulosGenerala = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    'escalera': 'Escalera',
    'full': 'Full',
    'poker': 'Poker',
    'generala': 'Generala',
    'doble_generala': 'Doble Generala',
}

export const puntajeGenerala = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    'escalera': 20,
    'full': 30,
    'poker': 40,
    'generala': 50,
    'doble_generala': 100,
}