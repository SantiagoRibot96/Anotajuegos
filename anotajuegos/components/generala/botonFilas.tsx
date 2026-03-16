    import { useState } from "react";
    import { Pressable, Text, View } from "react-native";
    import { useTheme } from "../../hooks/themeHook";
    import { usePuntaje } from "../../hooks/scoreHook";
    import { generala, titulosGenerala } from "../../constants/generala";

    type Props = {
    titulo: keyof typeof titulosGenerala;
    valor: number;
    tipo?: boolean;
    top?: number;
    };

const BotonFilas = ({ titulo, valor, tipo = true, top = 0 }: Props) => {
    const theme = useTheme();

    const [total, setTotal] = useState([0, 0, 0, 0, 0, 0]);
    const [anularJugada, setAnularJugada] = useState([false, false, false, false, false, false]);
    const { sumar, restar } = usePuntaje();

    const cambiarValor = (equipo: number) => {
        if(!anularJugada[equipo])
        {
            const copy = [...total];
            if(titulo === 'generala' || titulo === 'doble_generala'){
                if(copy[equipo] === 0){
                    copy[equipo] = valor;
                    sumar("generala", valor, equipo);
                }else{
                    copy[equipo] = 0;
                    restar("generala", valor, equipo);
                }
            }else{
                if(copy[equipo] === valor){
                    copy[equipo] += 5;
                    sumar("generala", 5, equipo);
                }else if(copy[equipo] === (valor + 5)){
                    copy[equipo] = 0;
                    restar("generala", (valor + 5), equipo);
                }else{
                    copy[equipo] = valor;
                    sumar("generala", valor, equipo);
                }
            }

            setTotal(copy);
        }
    };

    const agregarValor = (equipo: number) => {
        if(!anularJugada[equipo]){
            const copy = [...total];

            if(copy[equipo] < (valor * 5)){
                copy[equipo] += valor;
                sumar("generala", valor, equipo);
            }else {
                copy[equipo] = 0;
                restar("generala", (valor * 5), equipo);
            }

            setTotal(copy);
        }
    };

    const toggleAnularJugada = (equipo: number) => {
        const copy = [...total];
        const copy2 = [...anularJugada];

        copy2[equipo] = !copy2[equipo];
        setAnularJugada(copy2);
        
        restar("generala", copy[equipo], equipo);

        copy[equipo] = 0;
        setTotal(copy);
    }

    return (
    <>
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
                }}
            >
                <Text
                    style={{
                    ...generala.columna1_texto,
                    color: theme.text,
                    }}
                    allowFontScaling={false}
                >
                    {titulosGenerala[titulo]}
                </Text>
            </View>

            {[0, 1, 2, 3, 4, 5].map((i) => (
                <View
                key={i}
                style={{
                    ...generala.columna2,
                    borderColor: theme.border,
                }}
                >
                    <Pressable
                        onPress={() => {
                            if (tipo) cambiarValor(i);
                            else agregarValor(i);
                        }}
                        style={{
                            ...generala.columna2_botones,
                            backgroundColor: theme.primary,
                        }}
                        onLongPress={() => toggleAnularJugada(i)}
                    >
                        <Text
                            style={{
                                ...generala.columna2_texto,
                                color: theme.text,
                            }}
                            allowFontScaling={false}
                        >
                            {anularJugada[i] ? "X" : total[i]}
                        </Text>
                    </Pressable>
                </View>
            ))}

        </View>
    </>
    );
};

export default BotonFilas;