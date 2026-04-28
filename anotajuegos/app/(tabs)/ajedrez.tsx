import { Modal, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { useRef, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import HelpModal, { HelpHeaderButton } from "@/components/HelpModal";
import { useNavigation } from "expo-router";
import { useGameEndAd } from "@/hooks/useGameEndAd";

const TIMER_PRESETS = [30, 60, 120, 180, 300, 600, 900, 1800];
const INCREMENTOS = [
  { label: "0", value: "0" },
  { label: "+1", value: "1" },
  { label: "+2", value: "2" },
  { label: "+3", value: "3" },
  { label: "+5", value: "5" },
  { label: "+10", value: "10" },
];

const Ajedrez = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [turno, setTurno] = useState<"white" | "black" | null>(null);
  const [tiempo, setTiempo] = useState(30);
  const [modo, setModo] = useState("0");
  const [ganador, setGanador] = useState<"white" | "black" | null>(null);
  const [helpVisible, setHelpVisible] = useState(false);
  const { showAd } = useGameEndAd();

  const { puntaje, restar, setTimer, sumar } = usePuntaje();
  const puntajeRef = useRef(puntaje);
  const startTime = useRef<number | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HelpHeaderButton onPress={() => setHelpVisible(true)} />,
    });
  }, [navigation]);

  useEffect(() => {
    puntajeRef.current = puntaje;
  }, [puntaje]);

  useEffect(() => {
    if (turno === null) return;

    startTime.current = Date.now();
    interval.current = setInterval(() => {
      const elapsed = (Date.now() - (startTime.current ?? 0)) / 1000;
      const idx = turno === "white" ? 0 : 1;

      if (puntajeRef.current.ajedrez[idx] <= 0) {
        clearInterval(interval.current!);
        setTurno(null);
        setGanador(turno === "white" ? "black" : "white");
        return;
      }
      restar("ajedrez", Math.min(elapsed, puntajeRef.current.ajedrez[idx]), idx);
      startTime.current = Date.now();
    }, 100);

    return () => { if (interval.current) clearInterval(interval.current); };
  }, [turno]);

  const presionarBlancas = () => {
    if (turno === "white") {
      sumar("ajedrez", Number(modo), 0);
      setTurno("black");
    }
  };

  const presionarNegras = () => {
    if (turno === null) {
      setTimer(0, tiempo);
      setTimer(1, tiempo);
      setTurno("white");
    } else if (turno === "black") {
      sumar("ajedrez", Number(modo), 1);
      setTurno("white");
    }
  };

  const reset = () => {
    showAd();
    if (interval.current) clearInterval(interval.current);
    setTurno(null);
    setTimer(0, tiempo);
    setTimer(1, tiempo);
    setGanador(null);
    setModo("0");
  };

  const cambiarTimer = () => {
    const idx = TIMER_PRESETS.indexOf(tiempo);
    setTiempo(TIMER_PRESETS[(idx + 1) % TIMER_PRESETS.length]);
  };

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return {
      main: `${m}:${s.toString().padStart(2, "0")}`,
      ms: m === 0 ? `.${ms.toString().padStart(2, "0")}` : "",
    };
  }

  const t0 = formatTime(puntaje.ajedrez[0]);
  const t1 = formatTime(puntaje.ajedrez[1]);

  const renderSection = (player: "white" | "black") => {
    const isWhite = player === "white";
    const t = isWhite ? t0 : t1;
    const isMyTurn = turno === player;
    // Black button is active when game not started OR black's turn
    const buttonDisabled = isWhite ? turno !== "white" : turno === "white";
    const buttonColor = isWhite
      ? turno === "white" ? theme.stop : theme.finish
      : turno !== "white" ? theme.stop : theme.finish;
    const timerDisplay = turno === null ? formatTime(tiempo) : t;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: isMyTurn ? theme.primary + "28" : "transparent",
          borderRadius: 12,
          overflow: "hidden",
          marginVertical: 4,
        }}
      >
        {/* Timer area — Pressable has NO transform, inner View rotates content */}
        <Pressable
          onPress={turno === null ? cambiarTimer : undefined}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Rotating this View (not a Pressable) is safe — touch area stays correct */}
          <View style={{ transform: [{ rotate: "-90deg" }], alignItems: "center" }}>
            <Text
              style={{
                color: isMyTurn ? theme.text : theme.inactiveText,
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 4,
              }}
              allowFontScaling={false}
            >
              {isWhite ? "♔ Blancas" : "♚ Negras"}
            </Text>
            <Text
              style={{
                color: theme.text,
                fontSize: 64,
                fontVariant: ["tabular-nums"],
                fontWeight: "600",
              }}
              allowFontScaling={false}
            >
              {timerDisplay.main}
              {timerDisplay.ms
                ? <Text style={{ fontSize: 36 }}>{timerDisplay.ms}</Text>
                : null}
            </Text>
          </View>
        </Pressable>

        {/* Parar button — Pressable has NO transform, only the text inside rotates */}
        <Pressable
          onPress={isWhite ? presionarBlancas : presionarNegras}
          onLongPress={reset}
          disabled={buttonDisabled}
          style={{
            width: 110,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: buttonColor,
            opacity: buttonDisabled ? 0.5 : 1,

          }}
          android_ripple={{ color: "rgba(255,255,255,0.3)", borderless: false }}
        >
          <View
            style={{
              transform: [{ rotate: "-90deg" }],
              width: 150,
            }}
            allowFontScaling={false}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 56,
                fontWeight: "bold",
              }}>
              Parar
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, flexDirection: "column", backgroundColor: theme.background, padding: 16 }}
      >
        {renderSection("white")}

        <View style={{ height: 110, justifyContent: "center", alignItems: "center", transform: [{ rotate: "-90deg" }] }}>
          {turno !== null ? (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: theme.text, fontSize: 46 }} allowFontScaling={false}>
                {turno === "white" ? "♔" : "♚"}
              </Text>
              <Text style={{ color: theme.inactiveText, fontSize: 24, marginTop: 4 }} allowFontScaling={false}>
                {modo === "0" ? "sin inc." : `+${modo}s`}
              </Text>
            </View>
          ) : Platform.OS === "ios" ? (
            <Picker
              selectedValue={modo}
              onValueChange={(val) => setModo(val)}
              style={{ color: theme.text, backgroundColor: theme.secondary, width: 100, borderRadius: 20 }}
              mode="dropdown"
            >
              {INCREMENTOS.map(({ label, value }) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          ) : (
            <View style={{ backgroundColor: theme.secondary, borderRadius: 20 }}>
              <WheelPickerExpo
                onChange={({ item }) => setModo(item.value)}
                backgroundColor={theme.secondary}
                selectedStyle={{ borderColor: theme.primary, borderWidth: 2 }}
                width={100}
                renderItem={({ label, textAlign }) => (
                  <Text style={{ fontSize: 20, color: theme.text, textAlign, fontWeight: "600" }}>
                    {label}
                  </Text>
                )}
                items={INCREMENTOS}
              />
            </View>
          )}
        </View>

        {renderSection("black")}

        <HelpModal
          visible={helpVisible}
          onClose={() => setHelpVisible(false)}
          items={[
            { titulo: "Elegir tiempo", descripcion: "Con la partida sin iniciar, tocá en el área del reloj para cambiar el tiempo. Cicla entre: 30s, 1', 2', 3', 5', 10', 15' y 30'." },
            { titulo: "Incremento", descripcion: "Usá el selector del centro para elegir el incremento: sin incremento (0) o los segundos que se suman al ceder el turno (+1, +2, +3, +5, +10)." },
            { titulo: "Resetear partida", descripcion: "Mantené presionado el botón Parar para resetear la partida y volver al estado inicial." },
          ]}
        />
      </SafeAreaView>

      <Modal visible={ganador !== null} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
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
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700", marginBottom: 8 }} allowFontScaling={false}>
              ¡Tiempo agotado!
            </Text>
            <Text style={{ color: theme.text, fontSize: 16, marginBottom: 24 }} allowFontScaling={false}>
              {ganador === "white" ? "Ganan las Blancas 🏆" : "Ganan las Negras 🏆"}
            </Text>
            <Pressable
              onPress={reset}
              style={{ alignSelf: "flex-end", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, backgroundColor: theme.primary }}
              android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
            >
              <Text style={{ color: theme.text, fontWeight: "600", fontSize: 15 }} allowFontScaling={false}>
                Reiniciar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Ajedrez;
