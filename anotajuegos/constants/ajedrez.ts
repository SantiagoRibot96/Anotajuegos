import {StyleSheet} from 'react-native';

export const ajedrez = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: "column",
    padding: 30
  },

  filas: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    height: "45%",
  },

  filas_pequeña: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  },

  contenedor_botones: {
    alignItems: "center",
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
    justifyContent: "center",
    height: "100%",
    width: 160,
  },

  texto_timer: {
    fontSize: 64,
    fontVariant: ["tabular-nums"],
    textAlign: "center",
  },

  texto_ms: {
    fontSize: 40,
  },

  picker: {
    height: 130,
    width: 180,
    borderRadius: 30,
  },

  picker_texto: {
    fontSize: 50,
    textAlign: "center",
    padding: 15,
    borderRadius: 20
  }
});
