import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import generarPalitos, { ERASE_DURATION } from "@/components/truco/palito";
import { usePuntaje } from "../../hooks/scoreHook";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import Svg from "react-native-svg";
import { useEffect, useState } from "react";
import HelpModal, { HelpHeaderButton } from "@/components/HelpModal";
import { useNavigation } from "expo-router";
import { useGameEndAd } from "@/hooks/useGameEndAd";

const Truco = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { puntaje, sumar, restar, zero } = usePuntaje();
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ erasingPlayer, setErasingPlayer ] = useState<number | null>(null);
  const [ helpVisible, setHelpVisible ] = useState(false);
  const [ resetKey, setResetKey ] = useState(0);
  const [nombreJugador, setNombreJugador] = useState(["Nosotros", "Ellos"]);
  const { showAd } = useGameEndAd();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HelpHeaderButton onPress={() => setHelpVisible(true)} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (puntaje.truco[0] === 30 || puntaje.truco[1] === 30) {
      setModalVisible(true);
    }
  }, [puntaje.truco[0], puntaje.truco[1]]);

  const anotarJugador = (equipo: number, nombre: string) => {
    const copy = [...nombreJugador];
    copy[equipo] = nombre;
    setNombreJugador(copy);
  }

  const handleRestar = (player: 0 | 1) => {
    if (erasingPlayer !== null) return;
    if (puntaje.truco[player] === 0) return;

    setErasingPlayer(player);
    setTimeout(() => {
      restar("truco", 1, player);
      setErasingPlayer(null);
    }, ERASE_DURATION);
  };

  const reset = () => {
    showAd();
    setModalVisible(false);
    setErasingPlayer(null);
    setResetKey(prev => prev + 1);
    setNombreJugador(["Nosotros", "Ellos"]);
    for (let i = 0; i < 2; i++) {
      zero("truco", i);
    }
  }
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, backgroundColor: theme.background, flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          borderColor: theme.border,
          borderWidth: 2,
          flexDirection: "column",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <Pressable
          onPress={() => {
            sumar("truco", 1, 0);
          }}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            paddingLeft: 20,
          }}
          disabled={puntaje.truco[0] === 30}
          android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: false }}
        >
          <Svg width="80%" height="100%" >
            {generarPalitos(puntaje.truco[0], 0, erasingPlayer === 0 ? puntaje.truco[0] - 1 : undefined)}
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => handleRestar(0)}
          style={{
            borderColor: theme.border,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 5,
            backgroundColor: theme.secondary,
          }}
          disabled={puntaje.truco[0] === 0 || erasingPlayer !== null}
          onLongPress={() => reset()}
          android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
        >
          <TextInput
            key={resetKey}
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            placeholder={nombreJugador[0]}
            onEndEditing={(e) => anotarJugador(0, e.nativeEvent.text)}
            allowFontScaling={false}
          />
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            allowFontScaling={false}
          >
            {puntaje.truco[0]}
          </Text>
        </Pressable>
      </View>


      <View
        style={{
          flex: 1,
          borderColor: theme.border,
          borderWidth: 2,
          flexDirection: "column",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <Pressable
          onPress={() => {
            sumar("truco", 1, 1);
          }}
          style={{
            flex: 1,
            backgroundColor: theme.primary,
            paddingLeft: 20,
          }}
          disabled={puntaje.truco[1] === 30}
          android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: false }}
        >
          <Svg width="80%" height="100%" >
            {generarPalitos(puntaje.truco[1], 1, erasingPlayer === 1 ? puntaje.truco[1] - 1 : undefined)}
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => handleRestar(1)}
          style={{
            borderColor: theme.border,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 5,
            backgroundColor: theme.secondary,
          }}
          disabled={puntaje.truco[1] === 0 || erasingPlayer !== null}
          android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
        >
          <TextInput
            key={resetKey}
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            placeholder={nombreJugador[1]}
            onEndEditing={(e) => anotarJugador(1, e.nativeEvent.text)}
            allowFontScaling={false}
          />
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            allowFontScaling={false}
          >
            {puntaje.truco[1]}
          </Text>
        </Pressable>
      </View>
      <HelpModal
        visible={helpVisible}
        onClose={() => setHelpVisible(false)}
        items={[
          { titulo: "Sumar punto", descripcion: "Tocá en la zona de palitos de cada columna (Nosotros / Ellos) para sumar un punto." },
          { titulo: "Restar punto", descripcion: "Tocá en el nombre del equipo (Nosotros / Ellos) para restar un punto." },
          { titulo: "Resetear partida", descripcion: "Mantené presionado el nombre de cualquier equipo para resetear toda la partida." },
        ]}
      />
      {(puntaje.truco[0] === 30 || puntaje.truco[1] === 30) && (
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
                padding: 24,
                borderRadius: 14,
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 18, marginBottom: 16, fontWeight: "600" }} allowFontScaling={false}>
                El juego ha terminado! Gano el equipo {puntaje.truco[0] > puntaje.truco[1] ? nombreJugador[0] : nombreJugador[1]} 🎉
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                  }}
                  android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: false }}
                >
                  <Text style={{ color: theme.inactiveText, fontWeight: "600", fontSize: 15 }} allowFontScaling={false}>
                    Cerrar
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => reset()}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: theme.primary,
                  }}
                  android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
                >
                  <Text style={{ color: theme.text, fontWeight: "600", fontSize: 15 }} allowFontScaling={false}>
                    Reiniciar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Truco;