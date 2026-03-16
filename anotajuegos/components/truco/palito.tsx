import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Line } from "react-native-svg";

const AnimatedLine = Animated.createAnimatedComponent(Line);

const segmentos = [
    {x1:5,y1:5,x2:5,y2:55},
    {x1:5,y1:55,x2:55,y2:55},
    {x1:55,y1:55,x2:55,y2:5},
    {x1:55,y1:5,x2:5,y2:5},
    {x1:5,y1:5,x2:55,y2:55},
  ];

function generarPalitos(puntos:number, jugador:number) {

  const palitos = [];

  for(let i=0;i<puntos;i++){

    const grupo = Math.floor(i/5);
    const seg = i % 5;

    let offsetY = grupo * 70 + 30;
    const s = segmentos[seg];

    if(i === 14){
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
    };

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

  return palitos;
}

const Palito = ({x1, x2, y1, y2}: any) => {
  const progress = useRef(new Animated.Value(0)).current;

  const length = Math.sqrt(
    (x2-x1)**2 + (y2-y1)**2
  );

  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  const r = `${angle}deg`;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false
    }).start();
  }, []);

  const dashOffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [length,0]
  });

  const x = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x1, x2]
  });

  const y = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [y1, y2]
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: [1, 1, 0]
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
          fontSize: 45,
          opacity: opacity,
          transform: [
            { translateX: x },
            { translateY: y },
            { rotate: r },
          ]
        }}
      >
        ✏️
      </Animated.Text>
    </>
  );
};

export default generarPalitos;