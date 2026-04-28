import BotonFilas from "@/components/milMillas/botonFilas";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { milMillas, puntajeMilMillas, titulosMilMillas } from "../../constants/milMillas";
import HelpModal, { HelpHeaderButton } from "@/components/HelpModal";
import { useNavigation } from "expo-router";
import { useGameEndAd } from "@/hooks/useGameEndAd";

const MilMillas = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [recorrido, setRecorrido] = useState([0, 0, 0]);
  const { puntaje, sumar, restar, zero } = usePuntaje();
  const [resetKey, setResetKey] = useState(0);
  const [resetKey2, setResetKey2] = useState(0);
  const [ nombreJugador, setNombreJugador] = useState(["", "", ""]);
  const [ helpVisible, setHelpVisible ] = useState(false);
  const [ ganadorModal, setGanadorModal ] = useState<string | null>(null);
  const { showAd } = useGameEndAd();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HelpHeaderButton onPress={() => setHelpVisible(true)} />,
    });
  }, [navigation]);

  const anotarJugador = (equipo: number, nombre: string) => {
    const copy = [...nombreJugador];
    copy[equipo-1] = nombre;
    setNombreJugador(copy);
  }

  const anotarRecorrido = (equipo: number, recorridoRealizado: number) => {
    const copy = [...recorrido];
    if(copy[equipo] !== 0) restar("milMillas", copy[equipo], equipo);
    copy[equipo] = recorridoRealizado;
    setRecorrido(copy);
    sumar("milMillas", recorridoRealizado, equipo);
  };

  const terminarRonda = () => {
    if(puntaje.milMillas.find(num => num >= 5000) !== undefined){
      const idx = puntaje.milMillas.indexOf(Math.max(...puntaje.milMillas));
      const ganador = nombreJugador[idx] || (idx + 1).toString();
      setGanadorModal(ganador);
    } else {
      setResetKey(prev => prev + 3);
      setRecorrido([0, 0, 0]);
    }
  };

  const resetJuego = () => {
    showAd();
    setGanadorModal(null);
    setResetKey(prev => prev + 3);
    setResetKey2(prev => prev + 3);
    setRecorrido([0, 0, 0]);
    setNombreJugador(["", "", ""]);
    for(let i = 0; i < 3; i++){
      zero("milMillas", i);
    }
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
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
              allowFontScaling={false}
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
                onEndEditing={(e) => anotarJugador(jugador, e.nativeEvent.text)}
                allowFontScaling={false}
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
              allowFontScaling={false}
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
                allowFontScaling={false}
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
              allowFontScaling={false}
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
                    allowFontScaling={false}
                  >
                    {puntaje.milMillas[jugador]}
                  </Text>
                </View>
              ))
            } 
        </View>

      </View>

      <HelpModal
        visible={helpVisible}
        onClose={() => setHelpVisible(false)}
        items={[
          { titulo: "Sumar puntaje", descripcion: "Tocá la celda de cada jugador para ir sumando. En Seguridades I y TK es un contador acumulativo. En el resto, selecciona o deselecciona al equipo ganador de ese bono." },
          { titulo: "Recorrido", descripcion: "Al final de cada mano, ingresá la cantidad de millas recorridas por cada jugador en su campo de la fila Recorrido." },
          { titulo: "Terminar ronda", descripcion: "Una vez cargados todos los puntajes de la mano, tocá 'Terminar Ronda' para confirmarlos y preparar la siguiente." },
          { titulo: "Nombres de jugadores", descripcion: "Tocá en los campos de la fila 'Jugadores' para ingresar los nombres." },
        ]}
      />
      <View
        style={{
          ...milMillas.contenedor_botones,
        }}
      >
        <Pressable
          style={{
              ...milMillas.botones,
              backgroundColor: theme.finish,
              elevation: 3,
            }}
          onPress={() => terminarRonda()}
          android_ripple={{ color: "rgba(255,255,255,0.25)", borderless: false }}
        >
          <Text style={{
              ...milMillas.columna2_texto,
              color: theme.text,
            }}
            allowFontScaling={false}
          >
            Terminar Ronda
          </Text>
        </Pressable>
        <Pressable
          style={{
            ...milMillas.botones,
            backgroundColor: theme.accent,
            elevation: 3,
          }}
          onPress={() => resetJuego()}
          android_ripple={{ color: "rgba(0,0,0,0.15)", borderless: false }}
        >
          <Text style={{
              ...milMillas.columna2_texto,
              color: theme.text,
            }}
            allowFontScaling={false}
          >
            Reset
          </Text>
        </Pressable>
      </View>
      <Modal visible={ganadorModal !== null} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ width: "80%", backgroundColor: theme.background, padding: 24, borderRadius: 14, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8 }}>
            <Text style={{ color: theme.text, fontSize: 18, marginBottom: 8, fontWeight: "600" }} allowFontScaling={false}>
              ¡Partida terminada!
            </Text>
            <Text style={{ color: theme.text, fontSize: 16, marginBottom: 24 }} allowFontScaling={false}>
              Ganó {ganadorModal} 🏆
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
              <Pressable
                onPress={() => setGanadorModal(null)}
                style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 }}
                android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: false }}
              >
                <Text style={{ color: theme.inactiveText, fontWeight: "600", fontSize: 15 }} allowFontScaling={false}>Cerrar</Text>
              </Pressable>
              <Pressable
                onPress={resetJuego}
                style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: theme.primary }}
                android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
              >
                <Text style={{ color: theme.text, fontWeight: "600", fontSize: 15 }} allowFontScaling={false}>Reiniciar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MilMillas;
