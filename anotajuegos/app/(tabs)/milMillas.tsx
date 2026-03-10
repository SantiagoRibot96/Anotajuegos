import BotonFilas from "@/components/milMillas/botonFilas";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { milMillas, puntajeMilMillas } from "../../constants/milMillas";

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
        ...milMillas.contenedor,
        backgroundColor: theme.background,
      }}
    >
      <View>
        <View
          style={{
            ...milMillas.filas,
            backgroundColor: theme.secondary,
          }}
        >
          <View
            style={{
              ...milMillas.columna1,
              borderColor: theme.border,
            }}
          >
            <Text
              style={{
                ...milMillas.columna1_texto,
                color: theme.text,
              }}
            >
              Jugadores
            </Text>
          </View>
          <TextInput
            key={`a1-${resetKey2}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            placeholder="Equipo 1"
            returnKeyType="done"
          />
          <TextInput
            key={`a2-${resetKey2}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            placeholder="Equipo 2"
            returnKeyType="done"
          />
          <TextInput
            key={`a3-${resetKey2}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            placeholder="Equipo 3"
            returnKeyType="done"
          />
        </View>

        <BotonFilas key={`b1-${resetKey}`} titulo="Viaje_completo" valor={puntajeMilMillas.Viaje_Completo}></BotonFilas>

        <BotonFilas key={`b2-${resetKey}`} titulo="Accion_demorada" valor={puntajeMilMillas.Accion_demorada}></BotonFilas>

        <BotonFilas key={`b3-${resetKey}`} titulo="Bloqueo" valor={puntajeMilMillas.Bloqueo}></BotonFilas>

        <BotonFilas key={`b4-${resetKey}`} titulo="Viaje_seguro" valor={puntajeMilMillas.Viaje_Seguro}></BotonFilas>

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
            <Text
              style={{
                ...milMillas.columna1_texto,
                color: theme.text,
              }}
            >
              Recorrido
            </Text>
          </View>
          <TextInput
            key={`b9-${resetKey}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(0, Number(e.nativeEvent.text))}
            placeholder="0"
          />
          <TextInput
            key={`b10-${resetKey}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(1, Number(e.nativeEvent.text))}
            placeholder="0"
          />
          <TextInput
            key={`b11-${resetKey}`}
            style={{
              ...milMillas.columna2,
              color: theme.text,
              borderColor: theme.border,
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(e) => anotarRecorrido(2, Number(e.nativeEvent.text))}
            placeholder="0"
          />
        </View>

        <BotonFilas key={`b5-${resetKey}`} titulo="Seguridades_I" valor={puntajeMilMillas.Seguridades_I} tipo={false} top={4*puntajeMilMillas.Seguridades_I}></BotonFilas>

        <BotonFilas key={`b6-${resetKey}`} titulo="Seguridades_II" valor={puntajeMilMillas.Seguridades_II}></BotonFilas>

        <BotonFilas key={`b7-${resetKey}`} titulo="TK" valor={puntajeMilMillas.TK} tipo={false} top={4*puntajeMilMillas.TK}></BotonFilas>

        <BotonFilas key={`b8-${resetKey}`} titulo="Alargue" valor={puntajeMilMillas.Alargue}></BotonFilas>

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
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{
                ...milMillas.columna1_texto,
                color: theme.text,
              }}
            >
              Total:
            </Text>
          </View>
          <View
            style={{
              ...milMillas.columna2,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ 
                ...milMillas.columna2_texto,
                color: theme.text,
              }}
            >
              {puntaje.milMillas[0]}
            </Text>
          </View>
          <View
            style={{
              ...milMillas.columna2,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ 
                ...milMillas.columna2_texto,
                color: theme.text,
              }}
            >
              {puntaje.milMillas[1]}
            </Text>
          </View>
          <View
            style={{
              ...milMillas.columna2,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{ 
                ...milMillas.columna2_texto,
                color: theme.text,
              }}
            >
              {puntaje.milMillas[2]}
            </Text>
          </View>
        </View>

      </View>

      <View
        style={{
          ...milMillas.contenedor_botones,
        }}
      >
        <Pressable
          style={{
              ...milMillas.botones,
              backgroundColor: theme.finish,
            }}
          onPress={() => terminarRonda()}
        >
          <Text style={{
              ...milMillas.columna2_texto,
              color: theme.text,
            }}
          >
            Terminar Ronda
          </Text>
        </Pressable>
        <Pressable
          style={{
            ...milMillas.botones,
            backgroundColor: theme.accent,
          }}
          onPress={() => resetJuego()}
        >
          <Text style={{
              ...milMillas.columna2_texto,
              color: theme.text,
            }}
          >
            Reset
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MilMillas;
