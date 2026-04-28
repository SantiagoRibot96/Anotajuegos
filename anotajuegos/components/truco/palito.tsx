import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Line } from "react-native-svg";

const AnimatedLine = Animated.createAnimatedComponent(Line);

const segmentos = [
    {x1:5,y1:5,x2:5,y2:55},
    {x1:5,y1:55,x2:55,y2:55},
    {x1:55,y1:55,x2:55,y2:5},
    {x1:55,y1:5,x2:5,y2:5},
    {x1:5,y1:5,x2:55,y2:55},
  ];

const ERASE_DURATION = 460;
const EMOJI_SIZE = 45; // fontSize del lápiz — la punta del ✏️ está en la esquina (EMOJI_SIZE, EMOJI_SIZE)
const ERASER_W = 25;
const ERASER_H = 40;

function generarPalitos(puntos: number, jugador: number, erasingIndex?: number) {

  const palitos = [];

  for(let i = 0; i < puntos; i++) {
    const grupo = Math.floor(i/5);
    const seg = i % 5;
    const offsetY = grupo * 70 + 30;
    const s = segmentos[seg];

    if(i === 14) {
      palitos.push(
        <Line
          key={`${jugador}-linea`}
          x1={0}
          y1={235}
          x2={200}
          y2={235}
          stroke="#f5f5f567"
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    }

    if (i === erasingIndex) {
      palitos.push(
        <PalitoErasing
          key={`${jugador}-${i}-erasing`}
          x1={s.x1}
          y1={offsetY + s.y1}
          x2={s.x2}
          y2={offsetY + s.y2}
        />
      );
    } else {
      palitos.push(
        <Palito
          key={`${jugador}-${i}`}
          x1={s.x1}
          y1={offsetY + s.y1}
          x2={s.x2}
          y2={offsetY + s.y2}
        />
      );
    }
  }

  return palitos;
}

// ── Componente de dibujo (lápiz) ──────────────────────────────────────────────
//
// La punta del emoji ✏️ en Android está en la esquina inferior-derecha
// del bounding box, es decir en (EMOJI_SIZE, EMOJI_SIZE) en coords locales,
// o (half, half) relativo al centro del elemento.
//
// React Native rota alrededor del CENTRO del elemento tras la traslación.
// Para que la punta quede exactamente en el extremo actual de la línea:
//
//   punta_global = centro + rotate((half, half), r)
//               = (tx + half + half·cos r − half·sin r,
//                  ty + half + half·sin r + half·cos r)
//
// Despejando: tx = x − half·(1 + cos r − sin r)
//             ty = y − half·(1 + sin r + cos r)
//
// Verificación: a r=180° (único caso que funcionaba antes) la corrección es 0. ✓

const Palito = ({x1, x2, y1, y2}: {x1: number, x2: number, y1: number, y2: number}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const r_rad = Math.atan2(y2 - y1, x2 - x1);
  const r = `${r_rad * 180 / Math.PI}deg`;

  const half = EMOJI_SIZE / 2;
  const corrX = -half * (1 + Math.cos(r_rad) - Math.sin(r_rad));
  const corrY = -half * (1 + Math.sin(r_rad) + Math.cos(r_rad));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, []);

  const dashOffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [length, 0],
  });

  const pencilX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x1 + corrX, x2 + corrX],
  });

  const pencilY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [y1 + corrY, y2 + corrY],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.88, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <>
      <AnimatedLine
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#f5f5f5b6"
        strokeWidth={7}
        strokeDasharray={length}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />

      <Animated.Text
        style={{
          position: "absolute",
          fontSize: EMOJI_SIZE,
          opacity,
          transform: [
            { translateX: pencilX },
            { translateY: pencilY },
            { rotate: r },
          ],
        }}
      >
        ✏️
      </Animated.Text>
    </>
  );
};

// ── Componente de borrado (goma) ──────────────────────────────────────────────
//
// Para la goma usamos posicionamiento por CENTRO: el centro visual del
// rectángulo siempre cae sobre el punto de borrado (fin de la línea visible).
//
// React Native rota alrededor del centro del elemento tras la traslación.
// El centro de un elemento width×height posicionado en (tx, ty) es
// (tx + W/2, ty + H/2), y NO cambia con la rotación.
//
// Por lo tanto: tx = ep_x − W/2  (constante, sin importar el ángulo)
//               ty = ep_y − H/2

const PalitoErasing = ({x1, x2, y1, y2}: {x1: number, x2: number, y1: number, y2: number}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // La goma se mueve desde el FIN de la línea (x2,y2) hacia el INICIO (x1,y1)
  const r_e_rad = Math.atan2(y1 - y2, x1 - x2);
  const r = `${r_e_rad * 180 / Math.PI}deg`;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: ERASE_DURATION,
      useNativeDriver: false,
    }).start();
  }, []);

  // dashoffset 0 → length: la línea desaparece de fin a inicio
  const dashOffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, length],
  });

  // Centro de la goma = punto de borrado actual
  const eraserX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x2 - ERASER_W / 2, x1 - ERASER_W / 2],
  });
  const eraserY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [y2 - ERASER_H / 2, y1 - ERASER_H / 2],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <>
      <AnimatedLine
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#f5f5f5b6"
        strokeWidth={7}
        strokeDasharray={length}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />

      <Animated.View
        style={{
          position: "absolute",
          width: ERASER_W,
          height: ERASER_H,
          backgroundColor: "#F7B8C8",
          borderRadius: 3,
          borderWidth: 1.5,
          borderColor: "#490921",
          opacity,
          transform: [
            { translateX: eraserX },
            { translateY: eraserY },
            { rotate: r },
          ],
        }}
      />
    </>
  );
};

export { ERASE_DURATION };
export default generarPalitos;
