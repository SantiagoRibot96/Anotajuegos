import { createContext, useState } from "react";

type Juegos = {
  truco: number[]
  milMillas: number[]
  generala: number[]
  ajedrez: number[]
}

type PuntajeContextType = {
  puntaje: Juegos
  sumar: (juego: keyof Juegos, valor: number, equipo: number) => void
  restar: (juego: keyof Juegos, valor: number, equipo: number) => void
  zero: (juego: keyof Juegos, equipo: number) => void
  setTimer: (equipo: number, valor: number) => void
}

export const PuntajeContext = createContext<PuntajeContextType | undefined>(undefined);

export const PuntajeProvider = ({ children }: { children: React.ReactNode }) => {
    const [puntaje, setPuntaje] = useState<Juegos>({
        truco: [0, 0],
        milMillas: [0, 0, 0],
        generala: [0, 0, 0, 0, 0, 0],
        ajedrez: [0, 0],
    });

    const sumar = (juego: keyof Juegos, valor: number, equipo: number) => {
        setPuntaje(prev => {
            const nuevo = [...prev[juego]];
            nuevo[equipo] += valor;

            return {
            ...prev,
            [juego]: nuevo
            };
        });
    };

    const restar = (juego: keyof Juegos, valor: number, equipo: number) => {
        setPuntaje(prev => {
            const nuevo = [...prev[juego]];
            nuevo[equipo] -= valor;

            return {
            ...prev,
            [juego]: nuevo
            };
        });
    };

    const zero = (juego: keyof Juegos, equipo: number) => {
        setPuntaje(prev => {
            const nuevo = [...prev[juego]];
            nuevo[equipo] = 0;

            return {
            ...prev,
            [juego]: nuevo
            };
        });
    };

    const setTimer = (equipo: number, valor: number) => {
        setPuntaje(prev => {
            const nuevo = [...prev["ajedrez"]];
            nuevo[equipo] = valor;

            return {
            ...prev,
            ["ajedrez"]: nuevo
            };
        });
    };

    return (
        <PuntajeContext.Provider value={{ puntaje, sumar, restar, zero, setTimer }}>
            {children}
        </PuntajeContext.Provider>
    );
};