import BotonFilas from "@/components/milMillas/botonFilas";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";

const MilMillas = () => {
  const theme = useTheme();
  const [recorrido, setRecorrido] = useState([0, 0, 0]);
  const { puntaje, sumar, restar, zero } = usePuntaje();
  const [resetKey, setResetKey] = useState(0);
  const [resetKey2, setResetKey2] = useState(0);

  const anotarRecorrido = (equipo: number, recorridoRealizado: number) => {
    const copy = [...recorrido];
    if(copy[equipo] !== 0) restar("milMillas", copy[equipo], equipo);
    copy[equipo] = recorridoRealizado;
    setRecorrido(copy);
    sumar("milMillas", recorridoRealizado, equipo);
  };

  const terminarRonda = () => {
    setResetKey(prev => prev + 1);
    setRecorrido([0, 0, 0]);
    if(puntaje.milMillas.find(num => num >= 5000) !== undefined){
      Alert.alert("Partida terminada" + "\n" + "Jugador 1: " + puntaje.milMillas[0] + "\n" + "Jugador 2: " + puntaje.milMillas[1] + "\n" + "Jugador 3: " + puntaje.milMillas[2]);
      zero("milMillas", 0);
      zero("milMillas", 1);
      zero("milMillas", 2);
    }
  };

  const resetJuego = () => {
    setResetKey(prev => prev + 1);
    setResetKey2(prev => prev + 1);
    setRecorrido([0, 0, 0]);
    zero("milMillas", 0);
    zero("milMillas", 1);
    zero("milMillas", 2);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.background,
        justifyContent: "space-evenly",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.secondary,
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
              Jugadores
            </Text>
          </View>
          <TextInput
            key={`a1-${resetKey2}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            placeholder="Equipo 1"
            returnKeyType="done"
          />
          <TextInput
            key={`a2-${resetKey2}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            placeholder="Equipo 2"
            returnKeyType="done"
          />
          <TextInput
            key={`a3-${resetKey2}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            placeholder="Equipo 3"
            returnKeyType="done"
          />
        </View>

        <BotonFilas key={`b1-${resetKey}`} titulo="Viaje Completo" valor={200}></BotonFilas>

        <BotonFilas key={`b2-${resetKey}`} titulo="Accion Retardada" valor={200}></BotonFilas>

        <BotonFilas key={`b3-${resetKey}`} titulo="Bloqueo" valor={200}></BotonFilas>

        <BotonFilas key={`b4-${resetKey}`} titulo="Viaje Seguro" valor={200}></BotonFilas>

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
              Recorrido
            </Text>
          </View>
          <TextInput
            key={`b9-${resetKey}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(0, Number(e.nativeEvent.text))}
            placeholder="0"
          />
          <TextInput
            key={`b10-${resetKey}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(1, Number(e.nativeEvent.text))}
            placeholder="0"
          />
          <TextInput
            key={`b11-${resetKey}`}
            style={{
              fontSize: 16,
              width: "23%",
              height: 45,
              color: theme.text,
              borderColor: theme.border,
              borderWidth: 1,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(2, Number(e.nativeEvent.text))}
            placeholder="0"
          />
        </View>

        <BotonFilas key={`b5-${resetKey}`}
          titulo="Seguridades I"
          valor={200}
          tipo={false}
          top={800}
        ></BotonFilas>

        <BotonFilas key={`b6-${resetKey}`} titulo="Seguridades II" valor={200}></BotonFilas>

        <BotonFilas key={`b7-${resetKey}`} titulo="TK" valor={200} tipo={false} top={800}></BotonFilas>

        <BotonFilas key={`b8-${resetKey}`} titulo="Alargue" valor={200}></BotonFilas>

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
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: theme.text,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Total: {/* {ronda} */}
            </Text>
          </View>
          <View
            style={{
              width: "23%",
              height: 45,
              borderColor: theme.border,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ fontSize: 16, color: theme.text, textAlign: "center" }}
            >
              {puntaje.milMillas[0]}
            </Text>
          </View>
          <View
            style={{
              width: "23%",
              height: 45,
              borderColor: theme.border,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ fontSize: 16, color: theme.text, textAlign: "center" }}
            >
              {puntaje.milMillas[1]}
            </Text>
          </View>
          <View
            style={{
              width: "23%",
              height: 45,
              borderColor: theme.border,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ fontSize: 16, color: theme.text, textAlign: "center" }}
            >
              {puntaje.milMillas[2]}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{
              backgroundColor: theme.finish,
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              width: 100,
              borderRadius: 5
            }}
          onPress={() => terminarRonda()}
        >
          <Text style={{ fontSize: 16, color: theme.text, textAlign: "center" }}>Terminar Ronda</Text>
        </Pressable>
        <Pressable
          style={{
              backgroundColor: theme.accent,
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              width: 100,
              borderRadius: 5
            }}
          onPress={() => resetJuego()}
        >
          <Text style={{ fontSize: 16, color: theme.text, textAlign: "center" }}>Reset</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MilMillas;
