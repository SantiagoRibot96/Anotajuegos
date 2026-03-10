import { useState } from "react";
import { Pressable, Text, View, Modal } from "react-native";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { milMillas, explicacionMilMillas, titulosMilMillas } from "../../constants/milMillas";

type Props = {
  titulo: keyof typeof titulosMilMillas;
  valor: number;
  tipo?: boolean;
  top?: number;
};

const BotonFilas = ({ titulo, valor, tipo = true, top = 0 }: Props) => {
  const theme = useTheme();

  const [total, setTotal] = useState([0, 0, 0]);
  const [valorAgregado, setValorAgregado] = useState([0, 0, 0]);
  const [modalVisible, setModalVisible] = useState(false);
  const { sumar, restar } = usePuntaje();

  const cambiarValor = (equipo: number) => {
    const copy = [0, 0, 0];
    const equipoConValor = total.indexOf(valor);
    copy[equipo] = valor;

    if(equipoConValor !== -1){
      restar("milMillas", valor, equipoConValor);
    }

    setTotal(copy);
    sumar("milMillas", valor, equipo);
  };

  const agregarValor = (equipo: number) => {
    const copy = [...valorAgregado];

    if (copy.reduce((total, numero) => total + numero, 0) >= top) {
      restar("milMillas", copy[equipo], equipo);
      copy[equipo] = 0;
    } else {
      copy[equipo] += valor;
      sumar("milMillas", valor, equipo);
    }

    setValorAgregado(copy);
  };

  return (
    <>
      <View
        style={{
          ...milMillas.filas,
          backgroundColor: theme.primary,
        }}
      >
        <View
          style={{
            ...milMillas.columna1,
            borderColor: theme.border,
          }}
        >
          <Pressable onPress={() => setModalVisible(true)}>
            <Text
              style={{
                ...milMillas.columna1_texto,
                color: theme.text,
              }}
            >
              {titulosMilMillas[titulo]}
            </Text>
          </Pressable>
        </View>

        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              ...milMillas.columna2,
              borderColor: theme.border,
            }}
          >
            <Pressable
              onPress={() => {
                if (tipo) cambiarValor(i);
                else agregarValor(i);
              }}
              style={{
                ...milMillas.columna2_botones,
                backgroundColor: theme.primary,
              }}
            >
              <Text
                style={{
                  ...milMillas.columna2_texto,
                  color: theme.text,
                }}
              >
                {tipo ? total[i] : valorAgregado[i]}
              </Text>
            </Pressable>
          </View>
        ))}

      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: theme.background,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: theme.text, fontSize: 18, marginBottom: 10 }}>
              {titulosMilMillas[titulo]}
            </Text>

            <Text style={{ color: theme.text }}>
              {explicacionMilMillas[titulo]}
            </Text>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 20, alignSelf: "flex-end" }}
            >
              <Text style={{ color: theme.primary }}>
                Cerrar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BotonFilas;
