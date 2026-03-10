import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";

type Props = {
  titulo: string;
  valor: number;
  tipo?: boolean;
  top?: number;
};

const BotonFilas = ({ titulo, valor, tipo = true, top = 0 }: Props) => {
  const theme = useTheme();

  const [total, setTotal] = useState([0, 0, 0]);
  const [valorAgregado, setValorAgregado] = useState([0, 0, 0]);
  const { puntaje, sumar, restar } = usePuntaje();

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

  return tipo ? (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.primary,
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "31%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: theme.text,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {titulo}
        </Text>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => cambiarValor(0)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>{total[0]}</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => cambiarValor(1)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>{total[1]}</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => cambiarValor(2)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>{total[2]}</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.primary,
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "31%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: theme.text,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {titulo}
        </Text>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => agregarValor(0)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>
            {valorAgregado[0]}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => agregarValor(1)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>
            {valorAgregado[1]}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "23%",
          height: 45,
          borderColor: theme.border,
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => agregarValor(2)}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.text }}>
            {valorAgregado[2]}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BotonFilas;
