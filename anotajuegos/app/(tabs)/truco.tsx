import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import generarPalitos from "@/components/truco/palito";
import { usePuntaje } from "../../hooks/scoreHook";
import { Modal, Pressable, Text, View } from "react-native";
import Svg from "react-native-svg";
import { useEffect, useState } from "react";

const Truco = () => {
  const theme = useTheme();
  const { puntaje, sumar, restar, zero } = usePuntaje();
  const [ modalVisible, setModalVisible ] = useState(false);

  useEffect(() => {
    if (puntaje.truco[0] === 30 || puntaje.truco[1] === 30) {
      setModalVisible(true);
    }
  }, [puntaje.truco[0], puntaje.truco[1]]);

  const reset = () => {
    setModalVisible(false);
    for (let i = 0; i < 3; i++) {
      zero("truco", i);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background, flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          borderColor: theme.border,
          borderWidth: 2,
          flexDirection: "column",
          justifyContent: "space-around",
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
        >
          <Svg width="80%" height="100%" >
            {generarPalitos(puntaje.truco[0],0)}
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => {
            restar("truco", 1, 0);
          }}
          style={{
            borderColor: theme.border,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 5,
            backgroundColor: theme.secondary,
          }}
          disabled={puntaje.truco[0] === 0}
          onLongPress={() => reset()}
        >
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            allowFontScaling={false}
          >
            Nosotros
          </Text>
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
        >
          <Svg width="80%" height="100%" >
            {generarPalitos(puntaje.truco[1],1)}
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => {
            restar("truco", 1, 1);
          }}
          style={{
            borderColor: theme.border,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 5,
            backgroundColor: theme.secondary,
          }}
          disabled={puntaje.truco[1] === 0}
        >
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
            allowFontScaling={false}
          >
            Ellos
          </Text>
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
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 18, marginBottom: 10 }} allowFontScaling={false}>
                El juego ha terminado! {puntaje.truco[0] > puntaje.truco[1] ? "Ganamos Nosotros" : "Ganaron Ellos"}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Pressable
                  onPress={() => reset()}
                  style={{ marginTop: 20, alignSelf: "flex-end" }}
                >
                  <Text style={{ color: theme.primary }} allowFontScaling={false}>
                    Reiniciar el juego
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 20, alignSelf: "flex-end" }}
                >
                  <Text style={{ color: theme.primary }} allowFontScaling={false}>
                    Cerrar
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