import { useContext } from "react";
import { PuntajeContext } from "../context/scoreContext";

export const usePuntaje = () => {
    const context = useContext(PuntajeContext);
    if (!context) {
        throw new Error("usePuntaje debe usarse dentro de PuntajeProvider");
    }
    return context;
};