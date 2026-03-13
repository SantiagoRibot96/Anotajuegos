import {StyleSheet} from 'react-native';

export const ajedrez = StyleSheet.create({
    contenedor: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        borderBlockColor: "white",
        borderWidth: 1
    },
    filas: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-evenly",
        alignContent: "space-evenly",
        height: "35%",
    },
    contenedor_botones: {
        alignItems: "center",
        transform: "rotate(-90deg)",
    },
    botones: {
        borderRadius: 5,
        padding: 15,
    },
    botones_texto: {
        fontSize: 70,
        fontWeight: "bold",
        textAlign: "center",
    },
    contenedor_timer: {
        alignItems: "center",
        transform: "rotate(-90deg)",
    }
});

export const titulosAjedrez = {
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