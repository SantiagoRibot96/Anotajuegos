import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { generala, puntajeGenerala, titulosGenerala } from "../../constants/generala";
import BotonFilas from "../../components/generala/botonFilas";
import HelpModal, { HelpHeaderButton } from "@/components/HelpModal";
import { useNavigation } from "expo-router";
import { useGameEndAd } from "@/hooks/useGameEndAd";

const Generala = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [resetKey, setResetKey] = useState(0);
  const [resetKey2, setResetKey2] = useState(0);
  const { puntaje, zero } = usePuntaje();
  const [ nombreJugador, setNombreJugador] = useState(["", "", "", "", "", ""]);
  const [ helpVisible, setHelpVisible ] = useState(false);
  const [ ganadorModal, setGanadorModal ] = useState<string | null>(null);
  const { showAd } = useGameEndAd();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HelpHeaderButton onPress={() => setHelpVisible(true)} />,
    });
  }, [navigation]);

  const terminarPartida = () => {
    const idx = puntaje.generala.indexOf(Math.max(...puntaje.generala));
    const ganador = nombreJugador[idx] || (idx + 1).toString();
    setGanadorModal(ganador);
  };

  const reset = () => {
    showAd();
    setGanadorModal(null);
    setResetKey(prev => prev + 6);
    setResetKey2(prev => prev + 6);
    setNombreJugador(["", "", "", "", "", ""]);
    for(let i = 0; i < 6; i++){
      zero("generala", i);
    }
  };

  const anotarJugador = (equipo: number, nombre: string) => {
    const copy = [...nombreJugador];
    copy[equipo-1] = nombre;
    setNombreJugador(copy);
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        ...generala.contenedor,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
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
              allowFontScaling={false}
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
                onEndEditing={(e) => anotarJugador(jugador, e.nativeEvent.text)}
                allowFontScaling={false}
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
              allowFontScaling={false}
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
                  allowFontScaling={false}
                >
                  {puntaje.generala[jugador]}
                </Text>
              </View>
            ))
          }
        </View>
      </ScrollView>

      <HelpModal
        visible={helpVisible}
        onClose={() => setHelpVisible(false)}
        items={[
          { titulo: "Sumar puntaje", descripcion: "Tocá la celda de un jugador para ir sumando. Contador circular: valor base → valor base + 5 → vuelve a cero." },
          { titulo: "Tachar jugada", descripcion: "Mantené presionado una celda para tacharla (aparece una X). Útil para invalidar una jugada que no se pudo hacer. Para desmarcar, toca de nuevo la celda." },
          { titulo: "Nombres de jugadores", descripcion: "Tocá en los campos de la fila 'Jugadores' para ingresar el nombre de cada uno." },
        ]}
      />
      <View
        style={{
          ...generala.contenedor_botones,
          backgroundColor: theme.background + 'AA',
        }}
      >
        <Pressable
          style={{
              ...generala.botones,
              backgroundColor: theme.finish,
              elevation: 3,
            }}
          onPress={terminarPartida}
          disabled={puntaje.generala.reduce((a, b) => a + b, 0) === 0}
          android_ripple={{ color: "rgba(255,255,255,0.25)", borderless: false }}
        >
          <Text style={{
              ...generala.columna2_texto,
              color: theme.text,
            }}
            allowFontScaling={false}
          >
            Terminar Partida
          </Text>
        </Pressable>
        <Pressable
          style={{
            ...generala.botones,
            backgroundColor: theme.accent,
            elevation: 3,
          }}
          onPress={reset}
          android_ripple={{ color: "rgba(0,0,0,0.15)", borderless: false }}
        >
          <Text style={{
              ...generala.columna2_texto,
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
                onPress={reset}
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

export default Generala;
