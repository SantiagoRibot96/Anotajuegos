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
    },
    texto_timer: {
        fontSize: 50,
        padding: 0,
        minHeight: 100,
        minWidth: 100
    },
    picker: {
        height: "100%",
        width: 200,
        transform: "rotate(-90deg)",
        borderRadius: 30
    },
    picker_texto: {
        fontSize: 50,
        padding: 15,
        minHeight: 100,
        minWidth: 100,
        textAlign: "center",
        transform: "rotate(-90deg)",
        borderRadius: 20
    }
});