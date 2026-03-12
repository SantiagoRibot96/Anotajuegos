import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { generala, puntajeGenerala, titulosGenerala } from "../../constants/generala";
import BotonFilas from "../../components/generala/botonFilas"

const Generala = () => {
  const theme = useTheme();
  const [resetKey, setResetKey] = useState(0);
  const [resetKey2, setResetKey2] = useState(0);
  const { puntaje, zero } = usePuntaje();


  const terminarRonda = () => {
    setResetKey(prev => prev + 1);
    setResetKey2(prev => prev + 1);
    
    for(let i = 0; i < 6; i++){
      zero("generala", i);
    }

    Alert.alert("Partida terminada, el ganador es: " + puntaje.generala.indexOf(Math.max(...puntaje.generala)).toString());
  }

  return (
    <SafeAreaView
      style={{
        ...generala.contenedor,
        backgroundColor: theme.background,
      }}
    >
      <View
      >
        <View
          style={{
            ...generala.filas,
            backgroundColor: theme.secondary,
          }}
        >
          <View
            style={{
              ...generala.columna1,
              borderColor: theme.border,
            }}
          >
            <Text
              style={{
                ...generala.columna1_texto,
                color: theme.text,
              }}
            >
              Jugadores
            </Text>
          </View>
          {
            [1, 2, 3, 4, 5, 6].map((jugador) => (
              <TextInput
                key={jugador+resetKey2}
                style={{
                  ...generala.columna2,
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
          (Object.keys(titulosGenerala) as (keyof typeof titulosGenerala)[]).map((titulo) => (
            puntajeGenerala[titulo] < 20 ?
              <BotonFilas
                key={titulo+resetKey}
                titulo={titulo}
                valor={puntajeGenerala[titulo]}
                tipo={false}
              /> :
              <BotonFilas
                key={titulo+resetKey}
                titulo={titulo}
                valor={puntajeGenerala[titulo]}
                tipo={true}
              />
          ))
        }
        <View
          style={{
            ...generala.filas,
            backgroundColor: theme.primary,
          }}
        >
          <View
            style={{
              ...generala.columna1,
              borderColor: theme.border,
              backgroundColor: theme.secondary,
            }}
          >
            <Text
              style={{
                ...generala.columna1_texto,
                color: theme.text,
              }}
            >
              Total:
            </Text>
          </View>
          {
            [0, 1, 2, 3, 4, 5].map((jugador) => (
              <View
                style={{
                  ...generala.columna2,
                  borderColor: theme.border,
                  backgroundColor: theme.secondary,
                }}
                key={jugador}
              >
                <Text
                  style={{ 
                    ...generala.columna2_texto,
                    color: theme.text,
                  }}
                >
                  {puntaje.generala[jugador]}
                </Text>
              </View>
            ))
          }
        </View>
      </View>

      <View
        style={{
          ...generala.contenedor_botones,
        }}
      >
        <Pressable
          style={{
              ...generala.botones,
              backgroundColor: theme.finish,
            }}
          onPress={() => terminarRonda()}
        >
          <Text style={{
              ...generala.columna2_texto,
              color: theme.text,
            }}
          >
            Terminar Partida
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Generala;
