import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/themeHook";
import { usePuntaje } from "../../hooks/scoreHook";
import { ajedrez } from "@/constants/ajedrez";
import { useRef, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Platform } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const Ajedrez = () => {
  const theme = useTheme();
  const [jugador, setJugador] = useState(false);
  const [turno, setTurno] = useState<"white" | "black" | null>(null);
  const [tiempo, setTiempo] = useState(30);
  const [modo, setModo] = useState("0");
  
  const { puntaje, restar, setTimer, sumar } = usePuntaje();
  
  const puntajeRef = useRef(puntaje);
  const startTime = useRef<number | null>(null);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    puntajeRef.current = puntaje;
  }, [puntaje]);

  useEffect(() => {
    if(turno === null) return;

    startTime.current = Date.now();

    interval.current = setInterval(() => {
      const elapsed = Date.now() - (startTime.current ?? 0);

      if (turno === "white") {
        if(puntajeRef.current["ajedrez"][0] <= 0) {
          if (interval.current) clearInterval(interval.current);
          reset();
          return;
        }
        restar("ajedrez", Math.min(elapsed/1000, puntajeRef.current["ajedrez"][0]), 0)
      } else {
        if(puntajeRef.current["ajedrez"][1] <= 0) {
          if (interval.current) clearInterval(interval.current);
          reset();
          return;
        }
        restar("ajedrez", Math.min(elapsed/1000, puntajeRef.current["ajedrez"][0]), 1)
      }
      startTime.current = Date.now();
    }, 100);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [turno]);

  const cambiarJugador = () => {
    setJugador(!jugador);

    if(turno === null) {
      setTimer(0, tiempo);
      setTimer(1, tiempo);
      setTurno("white");
    }else if(turno === "white") {
      sumar("ajedrez", Number(modo), 0);
      setTurno("black");
    }else if(turno === "black") {
      sumar("ajedrez", Number(modo), 1);
      setTurno("white");
    }
  }

  const reset = () => {
    setTurno(null);
    setTimer(0, tiempo);
    setTimer(1, tiempo);
    setJugador(false);
  }

  const cambiarTimer = () => {
    if(tiempo === 30) {
      setTiempo(60);
    }else if(tiempo === 60) {
      setTiempo(120);
    }else if(tiempo === 120) {
      setTiempo(180);
    }else if(tiempo === 180) {
      setTiempo(300);
    }else if(tiempo === 300) {
      setTiempo(600);
    }else if(tiempo === 600) {
      setTiempo(900);
    }else if(tiempo === 900) {
      setTiempo(1800);
    }else if(tiempo === 1800) {
      setTiempo(30);
    }
  }

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);

    return {
      main: `${m}:${s.toString().padStart(2, "0")}`,
      ms: m === 0 ? `.${ms.toString().padStart(2, "0")}` : ""
    };
  }

  const t0 = formatTime(puntaje["ajedrez"][0]);
  const t1 = formatTime(puntaje["ajedrez"][1]);

  return (
    <>
      <SafeAreaView 
        style={{
          ...ajedrez.contenedor,
          backgroundColor: theme.background 
          }}
        >
          <View
            style={{
              ...ajedrez.filas,
            }}
          >
            <View
              style={{
              ...ajedrez.contenedor_timer,
              }}
            >
              {
                turno === null ?
                <Pressable onPress={() => cambiarTimer()}>
                  <Text
                    style={{
                      color: theme.text,
                      ...ajedrez.texto_timer,
                    }}
                    allowFontScaling={false}
                  >
                    {formatTime(tiempo).main}
                  </Text>
                </Pressable> :
                <Text
                  style={{
                    color: theme.text,
                    ...ajedrez.texto_timer
                  }}
                  allowFontScaling={false}
                >
                  {t0.main}
                  {t0.ms && (
                    <Text style={ajedrez.texto_ms}>
                      {t0.ms}
                    </Text>
                  )}
                </Text>
              }
            </View>
            <View
              style={{
                ...ajedrez.contenedor_botones,
              }}>
              <Pressable
                style={{
                  ...ajedrez.botones,
                  backgroundColor: jugador ? theme.stop : theme.finish
                }}
                onPress={() => cambiarJugador()}
                onLongPress={() => reset()}
                disabled={!jugador}
              >
                <Text
                  style={{
                    ...ajedrez.botones_texto,
                    color: theme.text
                  }}
                  allowFontScaling={false}
                >
                  Parar
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              ...ajedrez.filas_pequeña,
            }}
          >
            {
              turno === null ?
                (Platform.OS === "ios" ?
                <Picker
                  selectedValue={modo}
                  onValueChange={(itemValue) => setModo(itemValue)}
                  style={{
                    color: theme.text,
                    backgroundColor: theme.secondary,
                    ...ajedrez.picker,
                  }}
                  mode="dropdown"
                >
                    <Picker.Item label="0" value="0" />
                    <Picker.Item label="+1" value="1" />
                    <Picker.Item label="+2" value="2" />
                    <Picker.Item label="+3" value="3" />
                    <Picker.Item label="+5" value="5" />
                    <Picker.Item label="+10" value="10" />
                </Picker>
                :
                <View
                  style={{
                    ...ajedrez.picker,
                  }}
                >
                  <WheelPickerExpo
                    onChange={({ item }) => setModo(item .value)}
                    items={[
                      {label:"0", value:"0"},
                      {label:"+1", value:"1"},
                      {label:"+2", value:"2"},
                      {label:"+3", value:"3"},
                      {label:"+5", value:"5"},
                      {label:"+10", value:"10"}
                    ]}
                  />
                </View>)
                :
                <Text
                  style={{
                    color: theme.text,
                    ...ajedrez.picker_texto,
                    backgroundColor: theme.secondary,
                  }}
                  allowFontScaling={false}
                >
                  {modo}
                </Text>
            }
          </View>

          <View
            style={{
              ...ajedrez.filas,
            }}
          >
            <View
              style={{
              ...ajedrez.contenedor_timer,
              }}
            >
              {
                turno === null ?
                <Pressable onPress={() => cambiarTimer()}>
                  <Text
                    style={{
                      color: theme.text,
                      ...ajedrez.texto_timer,
                    }}
                    allowFontScaling={false}
                  >
                    {formatTime(tiempo).main}
                  </Text>
                </Pressable> :
                <Text
                  style={{
                    color: theme.text,
                    ...ajedrez.texto_timer
                  }}
                  allowFontScaling={false}
                >
                  {t1.main}
                  {t1.ms && (
                    <Text style={ajedrez.texto_ms}>
                      {t1.ms}
                    </Text>
                  )}
                </Text>
              }
            </View>
            <View
              style={{
                ...ajedrez.contenedor_botones,
              }}>
              <Pressable
                style={{
                  ...ajedrez.botones,
                  backgroundColor: jugador ? theme.finish :  theme.stop
                }}
                onPress={() => cambiarJugador()}
                onLongPress={() => reset()}
                disabled={jugador}
              >
                <Text
                  style={{
                    ...ajedrez.botones_texto,
                    color: theme.text
                  }}
                  allowFontScaling={false}
                >
                  Parar
                </Text>
              </Pressable>
            </View>
          </View>
      </SafeAreaView>
    </>
  );
};

export default Ajedrez;
