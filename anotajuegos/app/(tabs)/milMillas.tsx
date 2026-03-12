import BotonFilas from "@/components/milMillas/botonFilas";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { milMillas, puntajeMilMillas, titulosMilMillas } from "../../constants/milMillas";

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
    setResetKey(prev => prev + 3);
    setRecorrido([0, 0, 0]);
    if(puntaje.milMillas.find(num => num >= 5000) !== undefined){
      Alert.alert("Partida terminada, el ganador es: " + puntaje.milMillas.indexOf(Math.max(...puntaje.milMillas)).toString());
      for(let i = 0; i < 3; i++){
        zero("milMillas", i);
      }
    }
  };

  const resetJuego = () => {
    setResetKey(prev => prev + 3);
    setResetKey2(prev => prev + 1);
    setRecorrido([0, 0, 0]);
    for(let i = 0; i < 3; i++){
      zero("milMillas", i);
    }
  };

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
          {
            [1, 2, 3].map((jugador) => (
              <TextInput
                key={jugador+resetKey2}
                style={{
                  ...milMillas.columna2,
                  color: theme.text,
                  borderColor: theme.border,
                }}
                placeholder={jugador.toString()}
                returnKeyType="done"
              />
            ))
          }
        </View>
        
        {
          (Object.keys(titulosMilMillas) as (keyof typeof titulosMilMillas)[]).map((titulo) => (
            titulo === 'Seguridades_I' ?
              <BotonFilas
                key={titulo+resetKey}
                titulo={titulo}
                valor={puntajeMilMillas[titulo]}
                tipo={false}
                top={4*puntajeMilMillas[titulo]}
              /> :
              (
                titulo === 'TK' ? 
                  <BotonFilas
                    key={titulo+resetKey}
                    titulo={titulo}
                    valor={puntajeMilMillas[titulo]}
                    tipo={false}
                    top={4*puntajeMilMillas[titulo]}
                  /> : 
                  <BotonFilas
                    key={titulo+resetKey}
                    titulo={titulo}
                    valor={puntajeMilMillas[titulo]}
                  />
              )
          ))
        }
        
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
          {
            [0, 1, 2].map((jugador) => (
              <TextInput
                key={jugador+resetKey}
                style={{
                  ...milMillas.columna2,
                  color: theme.text,
                  borderColor: theme.border,
                }}
                keyboardType="number-pad"
                returnKeyType="done"
                onEndEditing={(e) => anotarRecorrido(jugador, Number(e.nativeEvent.text))}
                placeholder='0'
              />
            ))
          }
        </View>

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

            { 
              [0, 1, 2].map((jugador) => (
                <View
                  style={{
                    ...milMillas.columna2,
                    borderColor: theme.border,
                    backgroundColor: theme.secondary,
                  }}
                  key={jugador}
                >
                  <Text
                    style={{ 
                      ...milMillas.columna2_texto,
                      color: theme.text,
                    }}
                  >
                    {puntaje.milMillas[jugador]}
                  </Text>
                </View>
              ))
            } 
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
